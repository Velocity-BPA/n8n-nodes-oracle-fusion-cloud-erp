/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	formatOracleDate,
	formatOracleDateTime,
	buildODataFilter,
	handleOracleError,
	buildQueryParams,
	simplifyResponse,
} from '../../nodes/OracleFusionCloudERP/GenericFunctions';

describe('GenericFunctions', () => {
	describe('formatOracleDate', () => {
		it('should format ISO date string to Oracle date format', () => {
			const result = formatOracleDate('2024-01-15T10:30:00.000Z');
			expect(result).toBe('2024-01-15');
		});

		it('should handle date-only strings', () => {
			const result = formatOracleDate('2024-01-15');
			expect(result).toBe('2024-01-15');
		});

		it('should return empty string for empty input', () => {
			const result = formatOracleDate('');
			expect(result).toBe('');
		});
	});

	describe('formatOracleDateTime', () => {
		it('should format ISO date string to Oracle datetime format', () => {
			const result = formatOracleDateTime('2024-01-15T10:30:00.000Z');
			expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
		});

		it('should return empty string for empty input', () => {
			const result = formatOracleDateTime('');
			expect(result).toBe('');
		});
	});

	describe('buildODataFilter', () => {
		it('should build simple equality filter', () => {
			const result = buildODataFilter({ Status: 'ACTIVE' });
			expect(result).toBe("Status='ACTIVE'");
		});

		it('should handle multiple filters', () => {
			const result = buildODataFilter({ Status: 'ACTIVE', Type: 'VENDOR' });
			expect(result).toContain("Status='ACTIVE'");
			expect(result).toContain("Type='VENDOR'");
		});

		it('should handle numeric values', () => {
			const result = buildODataFilter({ SupplierId: 12345 });
			expect(result).toBe('SupplierId=12345');
		});

		it('should return empty string for empty filters', () => {
			const result = buildODataFilter({});
			expect(result).toBe('');
		});

		it('should skip empty string values', () => {
			const result = buildODataFilter({ Status: 'ACTIVE', Empty: '' });
			expect(result).toBe("Status='ACTIVE'");
		});
	});

	describe('handleOracleError', () => {
		it('should extract error details from Oracle error response with o:errorDetails', () => {
			const error = {
				'o:errorCode': 'APXIIMPT-470108',
				detail: 'The supplier site is not valid.',
				'o:errorDetails': [
					{
						'o:errorCode': 'APXIIMPT-470108',
						detail: 'Validation failed.',
					},
				],
			};

			const result = handleOracleError(error);
			expect(result).toContain('APXIIMPT-470108');
			expect(result).toContain('Validation failed.');
		});

		it('should extract error from detail field', () => {
			const error = {
				'o:errorCode': 'ERR-001',
				detail: 'The supplier site is not valid.',
			};

			const result = handleOracleError(error);
			expect(result).toBe('[ERR-001] The supplier site is not valid.');
		});

		it('should extract error from title field', () => {
			const error = {
				title: 'Bad Request',
			};

			const result = handleOracleError(error);
			expect(result).toBe('Bad Request');
		});

		it('should return default message for unknown error format', () => {
			const error = {
				message: 'Network error',
			};

			const result = handleOracleError(error);
			expect(result).toBe('Unknown Oracle Fusion API error');
		});
	});

	describe('buildQueryParams', () => {
		it('should build query params with orderBy', () => {
			const result = buildQueryParams(false, 50, { orderBy: 'CreationDate:desc' });
			expect(result.orderBy).toBe('CreationDate:desc');
			expect(result.limit).toBe(50);
		});

		it('should build query params with filter', () => {
			const result = buildQueryParams(false, 100, { Status: 'ACTIVE' });
			expect(result.q).toContain("Status='ACTIVE'");
		});

		it('should not include limit when returnAll is true', () => {
			const result = buildQueryParams(true, 50, { Status: 'ACTIVE' });
			expect(result.limit).toBeUndefined();
		});

		it('should include totalResults flag', () => {
			const result = buildQueryParams(false, 50, {});
			expect(result.totalResults).toBe(true);
		});
	});

	describe('simplifyResponse', () => {
		it('should extract items from paginated response', () => {
			const response = {
				items: [{ id: 1 }, { id: 2 }],
				totalResults: 2,
				hasMore: false,
			};

			const result = simplifyResponse(response);
			expect(result).toEqual([{ id: 1 }, { id: 2 }]);
		});

		it('should wrap single object in array', () => {
			const response = { id: 1, name: 'Test' };
			const result = simplifyResponse(response);
			expect(result).toEqual([{ id: 1, name: 'Test' }]);
		});

		it('should handle empty items array', () => {
			const response = { items: [], totalResults: 0 };
			const result = simplifyResponse(response);
			expect(result).toEqual([]);
		});
	});
});
