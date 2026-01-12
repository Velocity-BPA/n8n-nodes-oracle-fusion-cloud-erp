/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	ICredentialDataDecryptedObject,
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHookFunctions,
	IPollFunctions,
	IHttpRequestMethods,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import type {
	IOracleFusionResponse,
	IOracleFusionQueryParams,
	IOAuthTokenResponse,
} from './types/OracleFusionCloudERPTypes';

// Token cache for OAuth2
const tokenCache: Map<string, { token: string; expiresAt: number }> = new Map();

/**
 * Get OAuth2 access token from Oracle IDCS
 */
export async function getOracleOAuthToken(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IPollFunctions,
	credentials: ICredentialDataDecryptedObject,
): Promise<string> {
	const cacheKey = `${credentials.idcsUrl}:${credentials.clientId}`;
	const cached = tokenCache.get(cacheKey);

	// Return cached token if still valid (with 60 second buffer)
	if (cached && cached.expiresAt > Date.now() + 60000) {
		return cached.token;
	}

	const tokenUrl = `${credentials.idcsUrl}/oauth2/v1/token`;

	const authHeader = Buffer.from(
		`${credentials.clientId}:${credentials.clientSecret}`,
	).toString('base64');

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		uri: tokenUrl,
		headers: {
			Authorization: `Basic ${authHeader}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		form: {
			grant_type: 'client_credentials',
			scope: 'urn:opc:resource:consumer::all',
		},
		json: true,
	};

	try {
		const response = (await this.helpers.request(options)) as IOAuthTokenResponse;

		// Cache the token
		tokenCache.set(cacheKey, {
			token: response.access_token,
			expiresAt: Date.now() + response.expires_in * 1000,
		});

		return response.access_token;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: 'Failed to obtain OAuth2 token from Oracle IDCS',
		});
	}
}

/**
 * Make an authenticated API request to Oracle Fusion Cloud
 */
export async function oracleFusionApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body?: IDataObject,
	query?: IOracleFusionQueryParams,
	uri?: string,
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('oracleFusionCloudApi');

	let authHeader: string;
	if (credentials.authType === 'oauth2') {
		const token = await getOracleOAuthToken.call(this, credentials);
		authHeader = `Bearer ${token}`;
	} else {
		const basicAuth = Buffer.from(
			`${credentials.username}:${credentials.password}`,
		).toString('base64');
		authHeader = `Basic ${basicAuth}`;
	}

	const apiVersion = (credentials.apiVersion as string) || '11.13.18.05';
	const baseUrl = `${credentials.instanceUrl}/fscmRestApi/resources/${apiVersion}`;

	const options: IRequestOptions = {
		method,
		uri: uri || `${baseUrl}/${resource}`,
		headers: {
			Authorization: authHeader,
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'REST-Framework-Version': '4',
		},
		json: true,
	};

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	if (query && Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.request(options);
		return response as IDataObject | IDataObject[];
	} catch (error) {
		const errorData = (error as JsonObject).error as JsonObject | undefined;
		const errorMessage =
			(errorData?.detail as string) ||
			(errorData?.title as string) ||
			'Unknown error occurred';
		const errorCode = errorData?.['o:errorCode'] as string | undefined;

		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: errorCode ? `[${errorCode}] ${errorMessage}` : errorMessage,
		});
	}
}

/**
 * Make an API request and return all items using pagination
 */
export async function oracleFusionApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body?: IDataObject,
	query?: IOracleFusionQueryParams,
): Promise<IDataObject[]> {
	query = query || {};
	const results: IDataObject[] = [];
	let offset = 0;
	const limit = query.limit || 500;
	let hasMore = true;

	while (hasMore) {
		query.offset = offset;
		query.limit = limit;

		const response = (await oracleFusionApiRequest.call(
			this,
			method,
			resource,
			body,
			query,
		)) as IOracleFusionResponse;

		if (response.items && Array.isArray(response.items)) {
			results.push(...response.items);
			hasMore = response.hasMore === true;
			offset += limit;
		} else if (Array.isArray(response)) {
			results.push(...response);
			hasMore = false;
		} else {
			hasMore = false;
		}

		// Safety limit to prevent infinite loops
		if (results.length >= 10000) {
			break;
		}
	}

	return results;
}

/**
 * Build OData query filter string from parameters
 */
export function buildODataFilter(filters: IDataObject): string {
	const filterParts: string[] = [];

	for (const [key, value] of Object.entries(filters)) {
		if (value === undefined || value === null || value === '') {
			continue;
		}

		if (typeof value === 'string') {
			filterParts.push(`${key}='${value}'`);
		} else if (typeof value === 'number') {
			filterParts.push(`${key}=${value}`);
		} else if (typeof value === 'boolean') {
			filterParts.push(`${key}=${value}`);
		} else if (value instanceof Date) {
			filterParts.push(`${key}=${value.toISOString()}`);
		}
	}

	return filterParts.join(' and ');
}

/**
 * Parse date string for Oracle Fusion API
 */
export function formatOracleDate(date: string | Date): string {
	if (date instanceof Date) {
		return date.toISOString().split('T')[0];
	}
	// If already in YYYY-MM-DD format, return as is
	if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		return date;
	}
	// Try to parse and format
	const parsed = new Date(date);
	if (!isNaN(parsed.getTime())) {
		return parsed.toISOString().split('T')[0];
	}
	return date;
}

/**
 * Format datetime for Oracle Fusion API
 */
export function formatOracleDateTime(date: string | Date): string {
	if (date instanceof Date) {
		return date.toISOString();
	}
	// Try to parse and format
	const parsed = new Date(date);
	if (!isNaN(parsed.getTime())) {
		return parsed.toISOString();
	}
	return date;
}

/**
 * Handle Oracle Fusion API errors with detailed messages
 */
export function handleOracleError(error: JsonObject): string {
	if (error['o:errorDetails'] && Array.isArray(error['o:errorDetails'])) {
		const details = error['o:errorDetails'] as JsonObject[];
		return details
			.map((d) => `[${d['o:errorCode']}] ${d.detail || d.title}`)
			.join('; ');
	}

	if (error.detail) {
		return `[${error['o:errorCode'] || 'ERROR'}] ${error.detail}`;
	}

	if (error.title) {
		return error.title as string;
	}

	return 'Unknown Oracle Fusion API error';
}

/**
 * Build query parameters for getAll operations
 */
export function buildQueryParams(
	returnAll: boolean,
	limit: number,
	additionalFields: IDataObject,
): IOracleFusionQueryParams {
	const query: IOracleFusionQueryParams = {
		totalResults: true,
	};

	if (!returnAll) {
		query.limit = limit;
	}

	// Handle filters
	const filters: IDataObject = {};
	for (const [key, value] of Object.entries(additionalFields)) {
		if (key === 'orderBy' && value) {
			query.orderBy = value as string;
		} else if (key === 'fields' && value) {
			query.fields = value as string;
		} else if (key === 'expand' && value) {
			query.expand = value as string;
		} else if (value !== undefined && value !== null && value !== '') {
			filters[key] = value;
		}
	}

	// Build filter string if there are filters
	const filterString = buildODataFilter(filters);
	if (filterString) {
		query.q = filterString;
	}

	return query;
}

/**
 * Simplify response by extracting items array
 */
export function simplifyResponse(response: IDataObject | IDataObject[]): IDataObject[] {
	if (Array.isArray(response)) {
		return response;
	}

	if (response.items && Array.isArray(response.items)) {
		return response.items as IDataObject[];
	}

	return [response];
}

/**
 * Log licensing notice (once per node load)
 */
let licensingNoticeLogged = false;

export function logLicensingNotice(context: IExecuteFunctions | IPollFunctions): void {
	if (!licensingNoticeLogged) {
		const message = '[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.';
		
		if ('logger' in context && context.logger) {
			context.logger.warn(message);
		}
		licensingNoticeLogged = true;
	}
}
