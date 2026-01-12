/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const ledgerAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a GL account by ID',
				action: 'Get a ledger account',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'List GL accounts with filtering',
				action: 'Get all ledger accounts',
			},
			{
				name: 'Get Balances',
				value: 'getBalances',
				description: 'Get account balances by period',
				action: 'Get account balances',
			},
			{
				name: 'Get Code Combinations',
				value: 'getCodeCombinations',
				description: 'Get code combinations for the ledger',
				action: 'Get code combinations',
			},
			{
				name: 'Get Transactions',
				value: 'getTransactions',
				description: 'Get account transactions',
				action: 'Get account transactions',
			},
		],
		default: 'getAll',
	},
];

export const ledgerAccountFields: INodeProperties[] = [
	// ----------------------------------
	//         ledgerAccount: get
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['get'],
			},
		},
		description: 'The unique identifier of the GL account',
	},

	// ----------------------------------
	//         ledgerAccount: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Asset', value: 'A' },
					{ name: 'Liability', value: 'L' },
					{ name: 'Owner\'s Equity', value: 'O' },
					{ name: 'Revenue', value: 'R' },
					{ name: 'Expense', value: 'E' },
				],
				description: 'Filter by account type',
			},
			{
				displayName: 'Allow Posting',
				name: 'allowPostingFlag',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Yes', value: 'Y' },
					{ name: 'No', value: 'N' },
				],
				description: 'Filter by posting allowed flag',
			},
			{
				displayName: 'Chart of Accounts ID',
				name: 'chartOfAccountsId',
				type: 'number',
				default: 0,
				description: 'Filter by chart of accounts ID',
			},
			{
				displayName: 'Enabled Flag',
				name: 'enabledFlag',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Enabled', value: 'Y' },
					{ name: 'Disabled', value: 'N' },
				],
				description: 'Filter by enabled status',
			},
			{
				displayName: 'Ledger ID',
				name: 'ledgerId',
				type: 'number',
				default: 0,
				description: 'Filter by ledger ID',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'e.g., AccountCombination:asc',
				description: 'Sort order for results',
			},
			{
				displayName: 'Segment 1',
				name: 'segment1',
				type: 'string',
				default: '',
				description: 'Filter by segment 1 value (company)',
			},
			{
				displayName: 'Segment 2',
				name: 'segment2',
				type: 'string',
				default: '',
				description: 'Filter by segment 2 value (cost center)',
			},
			{
				displayName: 'Segment 3',
				name: 'segment3',
				type: 'string',
				default: '',
				description: 'Filter by segment 3 value (account)',
			},
			{
				displayName: 'Summary Flag',
				name: 'summaryFlag',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Summary', value: 'Y' },
					{ name: 'Detail', value: 'N' },
				],
				description: 'Filter by summary account flag',
			},
		],
	},

	// ----------------------------------
	//         ledgerAccount: getBalances
	// ----------------------------------
	{
		displayName: 'Ledger ID',
		name: 'ledgerId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getBalances'],
			},
		},
		description: 'The ledger ID to get balances from',
	},
	{
		displayName: 'Accounting Period',
		name: 'accountingPeriod',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g., Jan-24',
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getBalances'],
			},
		},
		description: 'The accounting period to get balances for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getBalances'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getBalances'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getBalances'],
			},
		},
		options: [
			{
				displayName: 'Account Segment',
				name: 'accountSegment',
				type: 'string',
				default: '',
				description: 'Filter by specific account segment value',
			},
			{
				displayName: 'Balance Type',
				name: 'balanceType',
				type: 'options',
				default: 'A',
				options: [
					{ name: 'Actual', value: 'A' },
					{ name: 'Budget', value: 'B' },
					{ name: 'Encumbrance', value: 'E' },
				],
				description: 'Type of balance to retrieve',
			},
			{
				displayName: 'Code Combination ID',
				name: 'codeCombinationId',
				type: 'number',
				default: 0,
				description: 'Filter by specific code combination ID',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				placeholder: 'e.g., USD',
				description: 'Filter by currency code',
			},
			{
				displayName: 'Include Zero Balances',
				name: 'includeZeroBalances',
				type: 'boolean',
				default: false,
				description: 'Whether to include accounts with zero balance',
			},
		],
	},

	// ----------------------------------
	//         ledgerAccount: getTransactions
	// ----------------------------------
	{
		displayName: 'Ledger ID',
		name: 'ledgerId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getTransactions'],
			},
		},
		description: 'The ledger ID to get transactions from',
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getTransactions'],
			},
		},
		description: 'The GL account ID to get transactions for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getTransactions'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getTransactions'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getTransactions'],
			},
		},
		options: [
			{
				displayName: 'Accounting Period',
				name: 'accountingPeriod',
				type: 'string',
				default: '',
				placeholder: 'e.g., Jan-24',
				description: 'Filter by accounting period',
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions from this date',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions to this date',
			},
			{
				displayName: 'Journal Source',
				name: 'journalSource',
				type: 'string',
				default: '',
				description: 'Filter by journal source',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: 'AccountingDate:desc',
				description: 'Sort order for results',
			},
		],
	},

	// ----------------------------------
	//         ledgerAccount: getCodeCombinations
	// ----------------------------------
	{
		displayName: 'Chart of Accounts ID',
		name: 'chartOfAccountsId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getCodeCombinations'],
			},
		},
		description: 'The chart of accounts ID',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getCodeCombinations'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getCodeCombinations'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['ledgerAccount'],
				operation: ['getCodeCombinations'],
			},
		},
		options: [
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Asset', value: 'A' },
					{ name: 'Liability', value: 'L' },
					{ name: 'Owner\'s Equity', value: 'O' },
					{ name: 'Revenue', value: 'R' },
					{ name: 'Expense', value: 'E' },
				],
				description: 'Filter by account type',
			},
			{
				displayName: 'Enabled Flag',
				name: 'enabledFlag',
				type: 'options',
				default: 'Y',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Enabled', value: 'Y' },
					{ name: 'Disabled', value: 'N' },
				],
				description: 'Filter by enabled status',
			},
			{
				displayName: 'Segment 1',
				name: 'segment1',
				type: 'string',
				default: '',
				description: 'Filter by segment 1 value',
			},
			{
				displayName: 'Segment 2',
				name: 'segment2',
				type: 'string',
				default: '',
				description: 'Filter by segment 2 value',
			},
			{
				displayName: 'Segment 3',
				name: 'segment3',
				type: 'string',
				default: '',
				description: 'Filter by segment 3 value',
			},
			{
				displayName: 'Segment 4',
				name: 'segment4',
				type: 'string',
				default: '',
				description: 'Filter by segment 4 value',
			},
			{
				displayName: 'Segment 5',
				name: 'segment5',
				type: 'string',
				default: '',
				description: 'Filter by segment 5 value',
			},
		],
	},
];
