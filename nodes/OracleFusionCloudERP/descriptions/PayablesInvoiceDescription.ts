/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const payablesInvoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
			},
		},
		options: [
			{
				name: 'Approve',
				value: 'approve',
				description: 'Submit invoice for approval',
				action: 'Approve an invoice',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create an AP invoice',
				action: 'Create a payables invoice',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a line to an invoice',
				action: 'Create an invoice line',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Cancel/delete an invoice',
				action: 'Delete a payables invoice',
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
				description: 'Retrieve an invoice by ID',
				action: 'Get a payables invoice',
			},
			{
				name: 'Get Distributions',
				value: 'getDistributions',
				description: 'Get GL distributions for an invoice',
				action: 'Get invoice distributions',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple invoices',
				action: 'Get many payables invoices',
			},
			{
				name: 'Get Payments',
				value: 'getPayments',
				description: 'Get payment status for an invoice',
				action: 'Get invoice payments',
			},
			{
				name: 'Hold',
				value: 'hold',
				description: 'Place an invoice on hold',
				action: 'Hold an invoice',
			},
			{
				name: 'Release Hold',
				value: 'releaseHold',
				description: 'Release an invoice from hold',
				action: 'Release hold on invoice',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update invoice header',
				action: 'Update a payables invoice',
			},
			{
				name: 'Update Line',
				value: 'updateLine',
				description: 'Update an invoice line',
				action: 'Update an invoice line',
			},
			{
				name: 'Validate',
				value: 'validate',
				description: 'Validate an invoice for payment',
				action: 'Validate an invoice',
			},
		],
		default: 'getAll',
	},
];

export const payablesInvoiceFields: INodeProperties[] = [
	// ----------------------------------
	//         payablesInvoice:create
	// ----------------------------------
	{
		displayName: 'Invoice Number',
		name: 'invoiceNum',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The invoice number',
	},
	{
		displayName: 'Vendor Site ID',
		name: 'vendorSiteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The vendor site ID',
	},
	{
		displayName: 'Invoice Amount',
		name: 'invoiceAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The invoice total amount',
	},
	{
		displayName: 'Invoice Date',
		name: 'invoiceDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The invoice date',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Currency',
				name: 'Currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Invoice description',
			},
			{
				displayName: 'GL Date',
				name: 'GlDate',
				type: 'dateTime',
				default: '',
				description: 'General Ledger date',
			},
			{
				displayName: 'Invoice Type',
				name: 'InvoiceType',
				type: 'options',
				options: [
					{ name: 'Credit', value: 'Credit' },
					{ name: 'Debit', value: 'Debit' },
					{ name: 'Prepayment', value: 'Prepayment' },
					{ name: 'Standard', value: 'Standard' },
				],
				default: 'Standard',
				description: 'Type of invoice',
			},
			{
				displayName: 'Pay Group',
				name: 'PayGroup',
				type: 'string',
				default: '',
				description: 'Payment group',
			},
			{
				displayName: 'Payment Terms Name',
				name: 'PaymentTermsName',
				type: 'string',
				default: '',
				description: 'Payment terms',
			},
		],
	},

	// ----------------------------------
	//         payablesInvoice:get
	// ----------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['get', 'update', 'delete', 'validate', 'approve', 'hold', 'releaseHold', 'getPayments', 'getDistributions', 'createLine'],
			},
		},
		default: 0,
		description: 'The unique identifier of the invoice',
	},

	// ----------------------------------
	//         payablesInvoice:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
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
				resource: ['payablesInvoice'],
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
				resource: ['payablesInvoice'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Invoice Date From',
				name: 'InvoiceDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter invoices from this date',
			},
			{
				displayName: 'Invoice Date To',
				name: 'InvoiceDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter invoices to this date',
			},
			{
				displayName: 'Invoice Number',
				name: 'InvoiceNum',
				type: 'string',
				default: '',
				description: 'Filter by invoice number',
			},
			{
				displayName: 'Invoice Status',
				name: 'InvoiceStatus',
				type: 'options',
				options: [
					{ name: 'Approved', value: 'Approved' },
					{ name: 'Cancelled', value: 'Cancelled' },
					{ name: 'Never Validated', value: 'Never Validated' },
					{ name: 'Validated', value: 'Validated' },
				],
				default: '',
				description: 'Filter by invoice status',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'InvoiceDate:desc',
				description: 'Field to sort by',
			},
			{
				displayName: 'Vendor Site ID',
				name: 'VendorSiteId',
				type: 'number',
				default: 0,
				description: 'Filter by vendor site ID',
			},
		],
	},

	// ----------------------------------
	//         payablesInvoice:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Invoice description',
			},
			{
				displayName: 'Invoice Amount',
				name: 'InvoiceAmount',
				type: 'number',
				default: 0,
				description: 'Invoice total amount',
			},
			{
				displayName: 'Pay Group',
				name: 'PayGroup',
				type: 'string',
				default: '',
				description: 'Payment group',
			},
			{
				displayName: 'Payment Terms Name',
				name: 'PaymentTermsName',
				type: 'string',
				default: '',
				description: 'Payment terms',
			},
		],
	},

	// ----------------------------------
	//         payablesInvoice:createLine
	// ----------------------------------
	{
		displayName: 'Line Number',
		name: 'lineNumber',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['createLine'],
			},
		},
		default: 1,
		description: 'The line number',
	},
	{
		displayName: 'Line Amount',
		name: 'lineAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
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
				resource: ['payablesInvoice'],
				operation: ['createLine'],
			},
		},
		options: [
			{
				displayName: 'Accounting Date',
				name: 'AccountingDate',
				type: 'dateTime',
				default: '',
				description: 'Accounting date for the line',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Line description',
			},
			{
				displayName: 'Distribution Set',
				name: 'DistributionSet',
				type: 'string',
				default: '',
				description: 'Distribution set name',
			},
			{
				displayName: 'Item Description',
				name: 'ItemDescription',
				type: 'string',
				default: '',
				description: 'Item description',
			},
			{
				displayName: 'Quantity',
				name: 'Quantity',
				type: 'number',
				default: 1,
				description: 'Quantity',
			},
			{
				displayName: 'Unit Price',
				name: 'UnitPrice',
				type: 'number',
				default: 0,
				description: 'Unit price',
			},
		],
	},

	// ----------------------------------
	//         payablesInvoice:updateLine/deleteLine
	// ----------------------------------
	{
		displayName: 'Line ID',
		name: 'lineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		default: 0,
		description: 'The line ID to update or delete',
	},
	{
		displayName: 'Invoice ID (For Line)',
		name: 'invoiceIdForLine',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		default: 0,
		description: 'The invoice ID containing the line',
	},
	{
		displayName: 'Line Update Fields',
		name: 'lineUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['updateLine'],
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
				displayName: 'Line Amount',
				name: 'LineAmount',
				type: 'number',
				default: 0,
				description: 'Line amount',
			},
			{
				displayName: 'Quantity',
				name: 'Quantity',
				type: 'number',
				default: 1,
				description: 'Quantity',
			},
			{
				displayName: 'Unit Price',
				name: 'UnitPrice',
				type: 'number',
				default: 0,
				description: 'Unit price',
			},
		],
	},

	// ----------------------------------
	//         payablesInvoice:hold
	// ----------------------------------
	{
		displayName: 'Hold Reason',
		name: 'holdReason',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payablesInvoice'],
				operation: ['hold'],
			},
		},
		default: '',
		description: 'Reason for placing the invoice on hold',
	},
];
