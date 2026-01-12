/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const receiptOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
			},
		},
		options: [
			{
				name: 'Apply',
				value: 'apply',
				description: 'Apply receipt to invoices',
				action: 'Apply a receipt',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create an AR receipt',
				action: 'Create a receipt',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a receipt by ID',
				action: 'Get a receipt',
			},
			{
				name: 'Get Applications',
				value: 'getApplications',
				description: 'Get receipt applications',
				action: 'Get receipt applications',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple receipts',
				action: 'Get many receipts',
			},
			{
				name: 'Reverse',
				value: 'reverse',
				description: 'Reverse a receipt',
				action: 'Reverse a receipt',
			},
			{
				name: 'Unapply',
				value: 'unapply',
				description: 'Unapply receipt from invoices',
				action: 'Unapply a receipt',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a receipt',
				action: 'Update a receipt',
			},
		],
		default: 'getAll',
	},
];

export const receiptFields: INodeProperties[] = [
	// ----------------------------------
	//         receipt:create
	// ----------------------------------
	{
		displayName: 'Receipt Number',
		name: 'receiptNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The receipt number',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The receipt amount',
	},
	{
		displayName: 'Receipt Date',
		name: 'receiptDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The receipt date',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Comments',
				name: 'Comments',
				type: 'string',
				default: '',
				description: 'Receipt comments',
			},
			{
				displayName: 'Currency',
				name: 'Currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code',
			},
			{
				displayName: 'Customer Account ID',
				name: 'CustomerAccountId',
				type: 'number',
				default: 0,
				description: 'Customer account ID',
			},
			{
				displayName: 'Receipt Method ID',
				name: 'ReceiptMethodId',
				type: 'number',
				default: 0,
				description: 'Receipt method ID',
			},
		],
	},

	// ----------------------------------
	//         receipt:get
	// ----------------------------------
	{
		displayName: 'Cash Receipt ID',
		name: 'cashReceiptId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['get', 'update', 'apply', 'unapply', 'reverse', 'getApplications'],
			},
		},
		default: 0,
		description: 'The unique identifier of the receipt',
	},

	// ----------------------------------
	//         receipt:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['receipt'],
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
				resource: ['receipt'],
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
				resource: ['receipt'],
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
				placeholder: 'ReceiptDate:desc',
				description: 'Field to sort by',
			},
			{
				displayName: 'Receipt Date From',
				name: 'ReceiptDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter receipts from this date',
			},
			{
				displayName: 'Receipt Date To',
				name: 'ReceiptDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter receipts to this date',
			},
			{
				displayName: 'Receipt Number',
				name: 'ReceiptNumber',
				type: 'string',
				default: '',
				description: 'Filter by receipt number',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Applied', value: 'Applied' },
					{ name: 'Reversed', value: 'Reversed' },
					{ name: 'Unidentified', value: 'Unidentified' },
					{ name: 'Unmatched', value: 'Unmatched' },
				],
				default: '',
				description: 'Filter by receipt status',
			},
		],
	},

	// ----------------------------------
	//         receipt:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Amount',
				name: 'Amount',
				type: 'number',
				default: 0,
				description: 'Receipt amount',
			},
			{
				displayName: 'Comments',
				name: 'Comments',
				type: 'string',
				default: '',
				description: 'Receipt comments',
			},
			{
				displayName: 'Receipt Date',
				name: 'ReceiptDate',
				type: 'dateTime',
				default: '',
				description: 'Receipt date',
			},
		],
	},

	// ----------------------------------
	//         receipt:apply
	// ----------------------------------
	{
		displayName: 'Customer Transaction ID',
		name: 'customerTrxId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['apply'],
			},
		},
		default: 0,
		description: 'The transaction ID to apply the receipt to',
	},
	{
		displayName: 'Amount Applied',
		name: 'amountApplied',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['apply'],
			},
		},
		default: 0,
		description: 'Amount to apply',
	},

	// ----------------------------------
	//         receipt:unapply
	// ----------------------------------
	{
		displayName: 'Receivable Application ID',
		name: 'receivableApplicationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['unapply'],
			},
		},
		default: 0,
		description: 'The application ID to unapply',
	},

	// ----------------------------------
	//         receipt:reverse
	// ----------------------------------
	{
		displayName: 'Reversal Reason',
		name: 'reversalReason',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['reverse'],
			},
		},
		default: '',
		description: 'Reason for reversing the receipt',
	},
	{
		displayName: 'Reversal Date',
		name: 'reversalDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['receipt'],
				operation: ['reverse'],
			},
		},
		default: '',
		description: 'Date of reversal',
	},
];
