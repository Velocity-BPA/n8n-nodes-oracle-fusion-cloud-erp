/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const purchaseOrderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
			},
		},
		options: [
			{
				name: 'Approve',
				value: 'approve',
				description: 'Approve a purchase order',
				action: 'Approve a purchase order',
			},
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a purchase order',
				action: 'Cancel a purchase order',
			},
			{
				name: 'Close',
				value: 'close',
				description: 'Close a purchase order',
				action: 'Close a purchase order',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a purchase order',
				action: 'Create a purchase order',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a line to a PO',
				action: 'Create a PO line',
			},
			{
				name: 'Delete Line',
				value: 'deleteLine',
				description: 'Remove a PO line',
				action: 'Delete a PO line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a PO by ID',
				action: 'Get a purchase order',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple purchase orders',
				action: 'Get many purchase orders',
			},
			{
				name: 'Get Receipts',
				value: 'getReceipts',
				description: 'Get related receipts',
				action: 'Get PO receipts',
			},
			{
				name: 'Submit',
				value: 'submit',
				description: 'Submit PO for approval',
				action: 'Submit a purchase order',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a PO header',
				action: 'Update a purchase order',
			},
			{
				name: 'Update Line',
				value: 'updateLine',
				description: 'Update a PO line',
				action: 'Update a PO line',
			},
		],
		default: 'getAll',
	},
];

export const purchaseOrderFields: INodeProperties[] = [
	// ----------------------------------
	//         purchaseOrder:create
	// ----------------------------------
	{
		displayName: 'Order Number',
		name: 'orderNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The purchase order number',
	},
	{
		displayName: 'Vendor ID',
		name: 'vendorId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The vendor ID',
	},
	{
		displayName: 'Vendor Site ID',
		name: 'vendorSiteId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The vendor site ID',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Buyer ID',
				name: 'BuyerId',
				type: 'number',
				default: 0,
				description: 'The buyer ID',
			},
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
				description: 'PO description',
			},
			{
				displayName: 'Total Amount',
				name: 'TotalAmount',
				type: 'number',
				default: 0,
				description: 'PO total amount',
			},
		],
	},

	// ----------------------------------
	//         purchaseOrder:get
	// ----------------------------------
	{
		displayName: 'PO Header ID',
		name: 'poHeaderId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['get', 'update', 'submit', 'approve', 'cancel', 'close', 'getReceipts', 'createLine'],
			},
		},
		default: 0,
		description: 'The unique identifier of the purchase order',
	},

	// ----------------------------------
	//         purchaseOrder:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
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
				resource: ['purchaseOrder'],
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
				resource: ['purchaseOrder'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Creation Date From',
				name: 'CreationDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter POs created from this date',
			},
			{
				displayName: 'Creation Date To',
				name: 'CreationDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter POs created to this date',
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
				displayName: 'Order Number',
				name: 'OrderNumber',
				type: 'string',
				default: '',
				description: 'Filter by PO number',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Approved', value: 'APPROVED' },
					{ name: 'Cancelled', value: 'CANCELLED' },
					{ name: 'Closed', value: 'CLOSED' },
					{ name: 'Incomplete', value: 'INCOMPLETE' },
				],
				default: '',
				description: 'Filter by PO status',
			},
			{
				displayName: 'Vendor ID',
				name: 'VendorId',
				type: 'number',
				default: 0,
				description: 'Filter by vendor ID',
			},
		],
	},

	// ----------------------------------
	//         purchaseOrder:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Buyer ID',
				name: 'BuyerId',
				type: 'number',
				default: 0,
				description: 'The buyer ID',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'PO description',
			},
		],
	},

	// ----------------------------------
	//         purchaseOrder:createLine
	// ----------------------------------
	{
		displayName: 'Line Number',
		name: 'lineNumber',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['createLine'],
			},
		},
		default: 1,
		description: 'The line number',
	},
	{
		displayName: 'Item Description',
		name: 'itemDescription',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['createLine'],
			},
		},
		default: '',
		description: 'Description of the item',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['createLine'],
			},
		},
		default: 1,
		description: 'Quantity ordered',
	},
	{
		displayName: 'Unit Price',
		name: 'unitPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['createLine'],
			},
		},
		default: 0,
		description: 'Unit price',
	},
	{
		displayName: 'Line Additional Fields',
		name: 'lineAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['createLine'],
			},
		},
		options: [
			{
				displayName: 'Need By Date',
				name: 'NeedByDate',
				type: 'dateTime',
				default: '',
				description: 'Need by date',
			},
			{
				displayName: 'Unit Of Measure',
				name: 'UnitOfMeasure',
				type: 'string',
				default: 'Each',
				description: 'Unit of measure',
			},
		],
	},

	// ----------------------------------
	//         purchaseOrder:updateLine/deleteLine
	// ----------------------------------
	{
		displayName: 'Line ID',
		name: 'lineId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		default: 0,
		description: 'The PO line ID',
	},
	{
		displayName: 'PO Header ID (For Line)',
		name: 'poHeaderIdForLine',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		default: 0,
		description: 'The PO header ID containing the line',
	},
	{
		displayName: 'Line Update Fields',
		name: 'lineUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['updateLine'],
			},
		},
		options: [
			{
				displayName: 'Item Description',
				name: 'ItemDescription',
				type: 'string',
				default: '',
				description: 'Item description',
			},
			{
				displayName: 'Need By Date',
				name: 'NeedByDate',
				type: 'dateTime',
				default: '',
				description: 'Need by date',
			},
			{
				displayName: 'Quantity',
				name: 'Quantity',
				type: 'number',
				default: 0,
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
	//         purchaseOrder:cancel
	// ----------------------------------
	{
		displayName: 'Cancel Reason',
		name: 'cancelReason',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['cancel'],
			},
		},
		default: '',
		description: 'Reason for cancelling the PO',
	},
];
