/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const requisitionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['requisition'],
			},
		},
		options: [
			{
				name: 'Approve',
				value: 'approve',
				description: 'Approve a requisition',
				action: 'Approve a requisition',
			},
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a requisition',
				action: 'Cancel a requisition',
			},
			{
				name: 'Convert to PO',
				value: 'convertToPO',
				description: 'Convert requisition to purchase order',
				action: 'Convert requisition to PO',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a requisition',
				action: 'Create a requisition',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a line to a requisition',
				action: 'Create a requisition line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a requisition by ID',
				action: 'Get a requisition',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple requisitions',
				action: 'Get many requisitions',
			},
			{
				name: 'Return',
				value: 'return',
				description: 'Return requisition for resubmission',
				action: 'Return a requisition',
			},
			{
				name: 'Submit',
				value: 'submit',
				description: 'Submit requisition for approval',
				action: 'Submit a requisition',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a requisition',
				action: 'Update a requisition',
			},
		],
		default: 'getAll',
	},
];

export const requisitionFields: INodeProperties[] = [
	// ----------------------------------
	//         requisition:create
	// ----------------------------------
	{
		displayName: 'Requisition Number',
		name: 'requisitionNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requisition'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The requisition number',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requisition'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Requisition description',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['requisition'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Prepared By',
				name: 'PreparedBy',
				type: 'number',
				default: 0,
				description: 'Preparer person ID',
			},
			{
				displayName: 'Requested Delivery Date',
				name: 'RequestedDeliveryDate',
				type: 'dateTime',
				default: '',
				description: 'Requested delivery date',
			},
			{
				displayName: 'Total Amount',
				name: 'TotalAmount',
				type: 'number',
				default: 0,
				description: 'Total amount',
			},
		],
	},

	// ----------------------------------
	//         requisition:get
	// ----------------------------------
	{
		displayName: 'Requisition Header ID',
		name: 'requisitionHeaderId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['requisition'],
				operation: ['get', 'update', 'submit', 'approve', 'return', 'cancel', 'convertToPO', 'createLine'],
			},
		},
		default: 0,
		description: 'The unique identifier of the requisition',
	},

	// ----------------------------------
	//         requisition:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['requisition'],
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
				resource: ['requisition'],
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
				resource: ['requisition'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Creation Date From',
				name: 'CreationDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter requisitions created from this date',
			},
			{
				displayName: 'Creation Date To',
				name: 'CreationDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter requisitions created to this date',
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
				displayName: 'Prepared By',
				name: 'PreparedBy',
				type: 'number',
				default: 0,
				description: 'Filter by preparer ID',
			},
			{
				displayName: 'Requisition Number',
				name: 'RequisitionNumber',
				type: 'string',
				default: '',
				description: 'Filter by requisition number',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Approved', value: 'APPROVED' },
					{ name: 'Incomplete', value: 'INCOMPLETE' },
					{ name: 'Pending Approval', value: 'PENDING_APPROVAL' },
				],
				default: '',
				description: 'Filter by status',
			},
		],
	},

	// ----------------------------------
	//         requisition:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['requisition'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Requisition description',
			},
			{
				displayName: 'Requested Delivery Date',
				name: 'RequestedDeliveryDate',
				type: 'dateTime',
				default: '',
				description: 'Requested delivery date',
			},
		],
	},

	// ----------------------------------
	//         requisition:createLine
	// ----------------------------------
	{
		displayName: 'Line Number',
		name: 'lineNumber',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['requisition'],
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
				resource: ['requisition'],
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
				resource: ['requisition'],
				operation: ['createLine'],
			},
		},
		default: 1,
		description: 'Quantity requested',
	},
	{
		displayName: 'Unit Price',
		name: 'unitPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['requisition'],
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
				resource: ['requisition'],
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
	//         requisition:return
	// ----------------------------------
	{
		displayName: 'Return Reason',
		name: 'returnReason',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requisition'],
				operation: ['return'],
			},
		},
		default: '',
		description: 'Reason for returning the requisition',
	},

	// ----------------------------------
	//         requisition:cancel
	// ----------------------------------
	{
		displayName: 'Cancel Reason',
		name: 'cancelReason',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requisition'],
				operation: ['cancel'],
			},
		},
		default: '',
		description: 'Reason for cancelling the requisition',
	},
];
