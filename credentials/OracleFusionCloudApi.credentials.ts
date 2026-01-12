/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OracleFusionCloudApi implements ICredentialType {
	name = 'oracleFusionCloudApi';
	displayName = 'Oracle Fusion Cloud ERP API';
	documentationUrl = 'https://docs.oracle.com/en/cloud/saas/financials/24a/farfa/';
	properties: INodeProperties[] = [
		{
			displayName: 'Instance URL',
			name: 'instanceUrl',
			type: 'string',
			default: '',
			placeholder: 'https://efxw.fa.us2.oraclecloud.com',
			description: 'The Oracle Fusion Cloud instance URL (e.g., https://efxw.fa.us2.oraclecloud.com)',
			required: true,
		},
		{
			displayName: 'Authentication Type',
			name: 'authType',
			type: 'options',
			options: [
				{
					name: 'Basic Authentication',
					value: 'basic',
				},
				{
					name: 'OAuth 2.0',
					value: 'oauth2',
				},
			],
			default: 'basic',
			description: 'The authentication method to use',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			description: 'Username for Basic Authentication',
			displayOptions: {
				show: {
					authType: ['basic'],
				},
			},
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Password for Basic Authentication',
			displayOptions: {
				show: {
					authType: ['basic'],
				},
			},
		},
		{
			displayName: 'IDCS URL',
			name: 'idcsUrl',
			type: 'string',
			default: '',
			placeholder: 'https://idcs-abc123.identity.oraclecloud.com',
			description: 'Oracle Identity Cloud Service (IDCS) URL for OAuth2',
			displayOptions: {
				show: {
					authType: ['oauth2'],
				},
			},
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			description: 'OAuth2 Client ID from Oracle IDCS',
			displayOptions: {
				show: {
					authType: ['oauth2'],
				},
			},
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'OAuth2 Client Secret from Oracle IDCS',
			displayOptions: {
				show: {
					authType: ['oauth2'],
				},
			},
		},
		{
			displayName: 'API Version',
			name: 'apiVersion',
			type: 'string',
			default: '11.13.18.05',
			description: 'Oracle Fusion REST API version (e.g., 11.13.18.05 or 11.14.25.01)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.instanceUrl}}/fscmRestApi/resources/{{$credentials.apiVersion}}',
			url: '/ledgers',
			qs: {
				limit: 1,
			},
		},
	};
}
