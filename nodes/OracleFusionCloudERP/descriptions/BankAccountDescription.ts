/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { INodeProperties } from 'n8n-workflow';

export const bankAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a bank account by ID',
				action: 'Get a bank account',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'List bank accounts with filtering',
				action: 'Get all bank accounts',
			},
			{
				name: 'Get Balances',
				value: 'getBalances',
				description: 'Get bank account balances',
				action: 'Get bank account balances',
			},
			{
				name: 'Get Statements',
				value: 'getStatements',
				description: 'Get bank statements',
				action: 'Get bank statements',
			},
			{
				name: 'Get Transactions',
				value: 'getTransactions',
				description: 'Get bank transactions',
				action: 'Get bank transactions',
			},
			{
				name: 'Reconcile',
				value: 'reconcile',
				description: 'Reconcile bank transactions',
				action: 'Reconcile bank transactions',
			},
		],
		default: 'getAll',
	},
];

export const bankAccountFields: INodeProperties[] = [
	// ----------------------------------
	//         bankAccount: get
	// ----------------------------------
	{
		displayName: 'Bank Account ID',
		name: 'bankAccountId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['get'],
			},
		},
		description: 'The unique identifier of the bank account',
	},

	// ----------------------------------
	//         bankAccount: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
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
				resource: ['bankAccount'],
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
				resource: ['bankAccount'],
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
					{ name: 'Internal', value: 'INTERNAL' },
					{ name: 'Supplier', value: 'SUPPLIER' },
					{ name: 'Customer', value: 'CUSTOMER' },
				],
				description: 'Filter by bank account type',
			},
			{
				displayName: 'Bank Account Name',
				name: 'bankAccountName',
				type: 'string',
				default: '',
				description: 'Filter by bank account name',
			},
			{
				displayName: 'Bank Name',
				name: 'bankName',
				type: 'string',
				default: '',
				description: 'Filter by bank name',
			},
			{
				displayName: 'Branch Name',
				name: 'branchName',
				type: 'string',
				default: '',
				description: 'Filter by branch name',
			},
			{
				displayName: 'Currency',
				name: 'currencyCode',
				type: 'string',
				default: '',
				placeholder: 'e.g., USD',
				description: 'Filter by currency code',
			},
			{
				displayName: 'Legal Entity ID',
				name: 'legalEntityId',
				type: 'number',
				default: 0,
				description: 'Filter by legal entity ID',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'e.g., BankAccountName:asc',
				description: 'Sort order for results',
			},
			{
				displayName: 'Status',
				name: 'activeFlag',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active', value: 'Y' },
					{ name: 'Inactive', value: 'N' },
				],
				description: 'Filter by active status',
			},
		],
	},

	// ----------------------------------
	//         bankAccount: getBalances
	// ----------------------------------
	{
		displayName: 'Bank Account ID',
		name: 'bankAccountId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['getBalances'],
			},
		},
		description: 'The bank account ID to get balances for',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['getBalances'],
			},
		},
		options: [
			{
				displayName: 'As of Date',
				name: 'asOfDate',
				type: 'dateTime',
				default: '',
				description: 'Get balance as of this date',
			},
			{
				displayName: 'Balance Type',
				name: 'balanceType',
				type: 'options',
				default: 'LEDGER',
				options: [
					{ name: 'Available', value: 'AVAILABLE' },
					{ name: 'Ledger', value: 'LEDGER' },
					{ name: 'Float', value: 'FLOAT' },
				],
				description: 'Type of balance to retrieve',
			},
		],
	},

	// ----------------------------------
	//         bankAccount: getStatements
	// ----------------------------------
	{
		displayName: 'Bank Account ID',
		name: 'bankAccountId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['getStatements'],
			},
		},
		description: 'The bank account ID to get statements for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['getStatements'],
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
				resource: ['bankAccount'],
				operation: ['getStatements'],
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
				resource: ['bankAccount'],
				operation: ['getStatements'],
			},
		},
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter statements from this date',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter statements to this date',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: 'StatementDate:desc',
				description: 'Sort order for results',
			},
			{
				displayName: 'Statement Number',
				name: 'statementNumber',
				type: 'string',
				default: '',
				description: 'Filter by statement number',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Imported', value: 'IMPORTED' },
					{ name: 'Reconciled', value: 'RECONCILED' },
					{ name: 'Closed', value: 'CLOSED' },
				],
				description: 'Filter by statement status',
			},
		],
	},

	// ----------------------------------
	//         bankAccount: getTransactions
	// ----------------------------------
	{
		displayName: 'Bank Account ID',
		name: 'bankAccountId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['getTransactions'],
			},
		},
		description: 'The bank account ID to get transactions for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
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
				resource: ['bankAccount'],
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
				resource: ['bankAccount'],
				operation: ['getTransactions'],
			},
		},
		options: [
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
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: 'TransactionDate:desc',
				description: 'Sort order for results',
			},
			{
				displayName: 'Reconciliation Status',
				name: 'reconciliationStatus',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Unreconciled', value: 'UNRECONCILED' },
					{ name: 'Reconciled', value: 'RECONCILED' },
					{ name: 'External', value: 'EXTERNAL' },
				],
				description: 'Filter by reconciliation status',
			},
			{
				displayName: 'Statement ID',
				name: 'statementId',
				type: 'number',
				default: 0,
				description: 'Filter by statement ID',
			},
			{
				displayName: 'Transaction Type',
				name: 'transactionType',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Payment', value: 'PAYMENT' },
					{ name: 'Receipt', value: 'RECEIPT' },
					{ name: 'Miscellaneous', value: 'MISC' },
				],
				description: 'Filter by transaction type',
			},
		],
	},

	// ----------------------------------
	//         bankAccount: reconcile
	// ----------------------------------
	{
		displayName: 'Bank Account ID',
		name: 'bankAccountId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['reconcile'],
			},
		},
		description: 'The bank account ID',
	},
	{
		displayName: 'Statement ID',
		name: 'statementId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['reconcile'],
			},
		},
		description: 'The bank statement ID to reconcile',
	},
	{
		displayName: 'Transaction IDs',
		name: 'transactionIds',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g., 123456,123457,123458',
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['reconcile'],
			},
		},
		description: 'Comma-separated list of bank transaction IDs to reconcile',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['bankAccount'],
				operation: ['reconcile'],
			},
		},
		options: [
			{
				displayName: 'Auto Match',
				name: 'autoMatch',
				type: 'boolean',
				default: true,
				description: 'Whether to use auto-matching rules',
			},
			{
				displayName: 'Clear Tolerance Amount',
				name: 'clearToleranceAmount',
				type: 'number',
				default: 0,
				description: 'Amount tolerance for clearing differences',
			},
			{
				displayName: 'Reconciliation Date',
				name: 'reconciliationDate',
				type: 'dateTime',
				default: '',
				description: 'Date to use for reconciliation',
			},
		],
	},
];
