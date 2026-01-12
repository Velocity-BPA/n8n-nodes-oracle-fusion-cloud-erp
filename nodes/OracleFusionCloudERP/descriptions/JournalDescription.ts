/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const journalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['journal'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a journal batch',
				action: 'Create a journal',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a journal line',
				action: 'Create a journal line',
			},
			{
				name: 'Delete Line',
				value: 'deleteLine',
				description: 'Remove a journal line',
				action: 'Delete a journal line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a journal by ID',
				action: 'Get a journal',
			},
			{
				name: 'Get Balances',
				value: 'getBalances',
				description: 'Get account balances',
				action: 'Get account balances',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple journals',
				action: 'Get many journals',
			},
			{
				name: 'Post',
				value: 'post',
				description: 'Post a journal to GL',
				action: 'Post a journal',
			},
			{
				name: 'Reverse',
				value: 'reverse',
				description: 'Reverse a posted journal',
				action: 'Reverse a journal',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a journal',
				action: 'Update a journal',
			},
			{
				name: 'Update Line',
				value: 'updateLine',
				description: 'Update a journal line',
				action: 'Update a journal line',
			},
		],
		default: 'getAll',
	},
];

export const journalFields: INodeProperties[] = [
	// ----------------------------------
	//         journal:create
	// ----------------------------------
	{
		displayName: 'Journal Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The journal batch name',
	},
	{
		displayName: 'Journal Category',
		name: 'journalCategory',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The journal category',
	},
	{
		displayName: 'Journal Source',
		name: 'journalSource',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The journal source',
	},
	{
		displayName: 'Accounting Period',
		name: 'accountingPeriod',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'Jan-24',
		description: 'The accounting period',
	},
	{
		displayName: 'Ledger ID',
		name: 'ledgerId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The ledger ID',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Journal description',
			},
			{
				displayName: 'Total Credit',
				name: 'TotalCredit',
				type: 'number',
				default: 0,
				description: 'Total credit amount',
			},
			{
				displayName: 'Total Debit',
				name: 'TotalDebit',
				type: 'number',
				default: 0,
				description: 'Total debit amount',
			},
		],
	},

	// ----------------------------------
	//         journal:get
	// ----------------------------------
	{
		displayName: 'Header ID',
		name: 'headerId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['get', 'update', 'post', 'reverse', 'createLine'],
			},
		},
		default: 0,
		description: 'The unique identifier of the journal',
	},

	// ----------------------------------
	//         journal:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 100,
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
				resource: ['journal'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Accounting Period',
				name: 'AccountingPeriod',
				type: 'string',
				default: '',
				placeholder: 'Jan-24',
				description: 'Filter by accounting period',
			},
			{
				displayName: 'Journal Category',
				name: 'JournalCategory',
				type: 'string',
				default: '',
				description: 'Filter by journal category',
			},
			{
				displayName: 'Journal Source',
				name: 'JournalSource',
				type: 'string',
				default: '',
				description: 'Filter by journal source',
			},
			{
				displayName: 'Ledger ID',
				name: 'LedgerId',
				type: 'number',
				default: 0,
				description: 'Filter by ledger ID',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'CreationDate:desc',
				description: 'Field to sort by',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Error', value: 'Error' },
					{ name: 'Posted', value: 'Posted' },
					{ name: 'Unposted', value: 'Unposted' },
				],
				default: '',
				description: 'Filter by journal status',
			},
		],
	},

	// ----------------------------------
	//         journal:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Journal description',
			},
			{
				displayName: 'Journal Name',
				name: 'Name',
				type: 'string',
				default: '',
				description: 'Journal batch name',
			},
		],
	},

	// ----------------------------------
	//         journal:createLine
	// ----------------------------------
	{
		displayName: 'Line Number',
		name: 'lineNumber',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['createLine'],
			},
		},
		default: 1,
		description: 'The line number',
	},
	{
		displayName: 'Code Combination ID',
		name: 'codeCombinationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['createLine'],
			},
		},
		default: 0,
		description: 'The GL code combination ID',
	},
	{
		displayName: 'Line Additional Fields',
		name: 'lineAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['createLine'],
			},
		},
		options: [
			{
				displayName: 'Accounted Credit',
				name: 'AccountedCr',
				type: 'number',
				default: 0,
				description: 'Credit amount',
			},
			{
				displayName: 'Accounted Debit',
				name: 'AccountedDr',
				type: 'number',
				default: 0,
				description: 'Debit amount',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Line description',
			},
		],
	},

	// ----------------------------------
	//         journal:updateLine/deleteLine
	// ----------------------------------
	{
		displayName: 'Line ID',
		name: 'lineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		default: 0,
		description: 'The line ID',
	},
	{
		displayName: 'Header ID (For Line)',
		name: 'headerIdForLine',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		default: 0,
		description: 'The journal header ID containing the line',
	},
	{
		displayName: 'Line Update Fields',
		name: 'lineUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['updateLine'],
			},
		},
		options: [
			{
				displayName: 'Accounted Credit',
				name: 'AccountedCr',
				type: 'number',
				default: 0,
				description: 'Credit amount',
			},
			{
				displayName: 'Accounted Debit',
				name: 'AccountedDr',
				type: 'number',
				default: 0,
				description: 'Debit amount',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Line description',
			},
		],
	},

	// ----------------------------------
	//         journal:getBalances
	// ----------------------------------
	{
		displayName: 'Ledger ID (For Balances)',
		name: 'ledgerIdForBalances',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['getBalances'],
			},
		},
		default: 0,
		description: 'The ledger ID to get balances for',
	},
	{
		displayName: 'Period',
		name: 'period',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['getBalances'],
			},
		},
		default: '',
		placeholder: 'Jan-24',
		description: 'The accounting period',
	},
	{
		displayName: 'Balance Filters',
		name: 'balanceFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['getBalances'],
			},
		},
		options: [
			{
				displayName: 'Account Segment',
				name: 'AccountSegment',
				type: 'string',
				default: '',
				description: 'Filter by account segment',
			},
			{
				displayName: 'Currency',
				name: 'Currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code',
			},
		],
	},

	// ----------------------------------
	//         journal:reverse
	// ----------------------------------
	{
		displayName: 'Reversal Period',
		name: 'reversalPeriod',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['reverse'],
			},
		},
		default: '',
		placeholder: 'Feb-24',
		description: 'The period to post the reversal',
	},
];
