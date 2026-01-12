/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const receivablesInvoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
			},
		},
		options: [
			{
				name: 'Complete',
				value: 'complete',
				description: 'Complete an AR invoice',
				action: 'Complete an invoice',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create an AR invoice',
				action: 'Create a receivables invoice',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a line to an AR invoice',
				action: 'Create an invoice line',
			},
			{
				name: 'Delete Line',
				value: 'deleteLine',
				description: 'Remove an invoice line',
				action: 'Delete an invoice line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an AR invoice by ID',
				action: 'Get a receivables invoice',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple AR invoices',
				action: 'Get many receivables invoices',
			},
			{
				name: 'Get Receipts',
				value: 'getReceipts',
				description: 'Get applied receipts',
				action: 'Get invoice receipts',
			},
			{
				name: 'Get Schedules',
				value: 'getSchedules',
				description: 'Get payment schedules',
				action: 'Get payment schedules',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an AR invoice',
				action: 'Update a receivables invoice',
			},
			{
				name: 'Update Line',
				value: 'updateLine',
				description: 'Update an invoice line',
				action: 'Update an invoice line',
			},
		],
		default: 'getAll',
	},
];

export const receivablesInvoiceFields: INodeProperties[] = [
	// ----------------------------------
	//         receivablesInvoice:create
	// ----------------------------------
	{
		displayName: 'Transaction Number',
		name: 'trxNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The transaction/invoice number',
	},
	{
		displayName: 'Customer Account ID',
		name: 'customerAccountId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The customer account ID',
	},
	{
		displayName: 'Transaction Date',
		name: 'trxDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The transaction date',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Amount',
				name: 'Amount',
				type: 'number',
				default: 0,
				description: 'Invoice amount',
			},
			{
				displayName: 'Bill To Customer Number',
				name: 'BillToCustomerNumber',
				type: 'string',
				default: '',
				description: 'Bill-to customer number',
			},
			{
				displayName: 'Bill To Site',
				name: 'BillToSite',
				type: 'string',
				default: '',
				description: 'Bill-to site name',
			},
			{
				displayName: 'Currency',
				name: 'Currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code',
			},
			{
				displayName: 'Transaction Class',
				name: 'TrxClass',
				type: 'options',
				options: [
					{ name: 'Credit Memo', value: 'CM' },
					{ name: 'Debit Memo', value: 'DM' },
					{ name: 'Invoice', value: 'INV' },
				],
				default: 'INV',
				description: 'Transaction class',
			},
		],
	},

	// ----------------------------------
	//         receivablesInvoice:get
	// ----------------------------------
	{
		displayName: 'Customer Transaction ID',
		name: 'customerTrxId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['get', 'update', 'complete', 'getReceipts', 'getSchedules', 'createLine'],
			},
		},
		default: 0,
		description: 'The unique identifier of the transaction',
	},

	// ----------------------------------
	//         receivablesInvoice:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
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
				resource: ['receivablesInvoice'],
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
				resource: ['receivablesInvoice'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Customer Account ID',
				name: 'CustomerAccountId',
				type: 'number',
				default: 0,
				description: 'Filter by customer account ID',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'TrxDate:desc',
				description: 'Field to sort by',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Complete', value: 'Complete' },
					{ name: 'Incomplete', value: 'Incomplete' },
				],
				default: '',
				description: 'Filter by status',
			},
			{
				displayName: 'Transaction Class',
				name: 'TrxClass',
				type: 'options',
				options: [
					{ name: 'Credit Memo', value: 'CM' },
					{ name: 'Debit Memo', value: 'DM' },
					{ name: 'Invoice', value: 'INV' },
				],
				default: '',
				description: 'Filter by transaction class',
			},
			{
				displayName: 'Transaction Date From',
				name: 'TrxDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions from this date',
			},
			{
				displayName: 'Transaction Date To',
				name: 'TrxDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions to this date',
			},
			{
				displayName: 'Transaction Number',
				name: 'TrxNumber',
				type: 'string',
				default: '',
				description: 'Filter by transaction number',
			},
		],
	},

	// ----------------------------------
	//         receivablesInvoice:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Amount',
				name: 'Amount',
				type: 'number',
				default: 0,
				description: 'Invoice amount',
			},
			{
				displayName: 'Bill To Site',
				name: 'BillToSite',
				type: 'string',
				default: '',
				description: 'Bill-to site name',
			},
		],
	},

	// ----------------------------------
	//         receivablesInvoice:createLine
	// ----------------------------------
	{
		displayName: 'Line Number',
		name: 'lineNumber',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['createLine'],
			},
		},
		default: 1,
		description: 'The line number',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['createLine'],
			},
		},
		default: 0,
		description: 'The line amount',
	},
	{
		displayName: 'Line Additional Fields',
		name: 'lineAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['createLine'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Line description',
			},
			{
				displayName: 'Quantity',
				name: 'Quantity',
				type: 'number',
				default: 1,
				description: 'Quantity',
			},
			{
				displayName: 'Unit Selling Price',
				name: 'UnitSellingPrice',
				type: 'number',
				default: 0,
				description: 'Unit selling price',
			},
		],
	},

	// ----------------------------------
	//         receivablesInvoice:updateLine/deleteLine
	// ----------------------------------
	{
		displayName: 'Line ID',
		name: 'lineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		default: 0,
		description: 'The line ID',
	},
	{
		displayName: 'Transaction ID (For Line)',
		name: 'trxIdForLine',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		default: 0,
		description: 'The transaction ID containing the line',
	},
	{
		displayName: 'Line Update Fields',
		name: 'lineUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['receivablesInvoice'],
				operation: ['updateLine'],
			},
		},
		options: [
			{
				displayName: 'Amount',
				name: 'Amount',
				type: 'number',
				default: 0,
				description: 'Line amount',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Line description',
			},
			{
				displayName: 'Quantity',
				name: 'Quantity',
				type: 'number',
				default: 1,
				description: 'Quantity',
			},
			{
				displayName: 'Unit Selling Price',
				name: 'UnitSellingPrice',
				type: 'number',
				default: 0,
				description: 'Unit selling price',
			},
		],
	},
];
