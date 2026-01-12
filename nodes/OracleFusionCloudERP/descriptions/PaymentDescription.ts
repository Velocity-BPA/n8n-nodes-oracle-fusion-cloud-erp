/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const paymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payment'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a payment by ID',
				action: 'Get a payment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple payments',
				action: 'Get many payments',
			},
			{
				name: 'Get Payment Documents',
				value: 'getPaymentDocuments',
				description: 'Get payment documents',
				action: 'Get payment documents',
			},
			{
				name: 'Get Remittances',
				value: 'getRemittances',
				description: 'Get remittance details',
				action: 'Get remittance details',
			},
			{
				name: 'Stop',
				value: 'stop',
				description: 'Stop a payment',
				action: 'Stop a payment',
			},
			{
				name: 'Void',
				value: 'void',
				description: 'Void a payment',
				action: 'Void a payment',
			},
		],
		default: 'getAll',
	},
];

export const paymentFields: INodeProperties[] = [
	// ----------------------------------
	//         payment:get
	// ----------------------------------
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['get', 'void', 'stop', 'getPaymentDocuments', 'getRemittances'],
			},
		},
		default: 0,
		description: 'The unique identifier of the payment',
	},

	// ----------------------------------
	//         payment:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['payment'],
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
				resource: ['payment'],
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
				resource: ['payment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Bank Account Name',
				name: 'BankAccountName',
				type: 'string',
				default: '',
				description: 'Filter by bank account name',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'PaymentDate:desc',
				description: 'Field to sort by',
			},
			{
				displayName: 'Payee Name',
				name: 'PayeeName',
				type: 'string',
				default: '',
				description: 'Filter by payee name',
			},
			{
				displayName: 'Payment Date From',
				name: 'PaymentDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter payments from this date',
			},
			{
				displayName: 'Payment Date To',
				name: 'PaymentDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter payments to this date',
			},
			{
				displayName: 'Payment Method Code',
				name: 'PaymentMethodCode',
				type: 'options',
				options: [
					{ name: 'Check', value: 'Check' },
					{ name: 'EFT', value: 'EFT' },
					{ name: 'Wire', value: 'Wire' },
				],
				default: '',
				description: 'Filter by payment method',
			},
			{
				displayName: 'Payment Number',
				name: 'PaymentNumber',
				type: 'string',
				default: '',
				description: 'Filter by payment number',
			},
			{
				displayName: 'Payment Status',
				name: 'PaymentStatus',
				type: 'options',
				options: [
					{ name: 'Formatted', value: 'Formatted' },
					{ name: 'Transmitted', value: 'Transmitted' },
					{ name: 'Voided', value: 'Voided' },
				],
				default: '',
				description: 'Filter by payment status',
			},
		],
	},

	// ----------------------------------
	//         payment:void
	// ----------------------------------
	{
		displayName: 'Void Reason',
		name: 'voidReason',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['void'],
			},
		},
		default: '',
		description: 'Reason for voiding the payment',
	},

	// ----------------------------------
	//         payment:stop
	// ----------------------------------
	{
		displayName: 'Stop Reason',
		name: 'stopReason',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['stop'],
			},
		},
		default: '',
		description: 'Reason for stopping the payment',
	},
];
