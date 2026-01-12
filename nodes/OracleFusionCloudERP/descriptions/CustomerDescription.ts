/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a customer account',
				action: 'Create a customer',
			},
			{
				name: 'Create Site',
				value: 'createSite',
				description: 'Add a site to a customer',
				action: 'Create a customer site',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a customer by ID',
				action: 'Get a customer',
			},
			{
				name: 'Get Accounts',
				value: 'getAccounts',
				description: 'Get customer accounts',
				action: 'Get customer accounts',
			},
			{
				name: 'Get Balances',
				value: 'getBalances',
				description: 'Get customer balances',
				action: 'Get customer balances',
			},
			{
				name: 'Get Contacts',
				value: 'getContacts',
				description: 'Get customer contacts',
				action: 'Get customer contacts',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple customers',
				action: 'Get many customers',
			},
			{
				name: 'Get Sites',
				value: 'getSites',
				description: 'Get customer sites',
				action: 'Get customer sites',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a customer',
				action: 'Update a customer',
			},
		],
		default: 'getAll',
	},
];

export const customerFields: INodeProperties[] = [
	// ----------------------------------
	//         customer:create
	// ----------------------------------
	{
		displayName: 'Party Name',
		name: 'partyName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The customer name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account Number',
				name: 'AccountNumber',
				type: 'string',
				default: '',
				description: 'Customer account number',
			},
			{
				displayName: 'Customer Type',
				name: 'CustomerType',
				type: 'options',
				options: [
					{ name: 'Organization', value: 'Organization' },
					{ name: 'Person', value: 'Person' },
				],
				default: 'Organization',
				description: 'Type of customer',
			},
			{
				displayName: 'Party Number',
				name: 'PartyNumber',
				type: 'string',
				default: '',
				description: 'Party number',
			},
			{
				displayName: 'Tax Registration Number',
				name: 'TaxRegistrationNumber',
				type: 'string',
				default: '',
				description: 'Tax ID number',
			},
		],
	},

	// ----------------------------------
	//         customer:get
	// ----------------------------------
	{
		displayName: 'Party ID',
		name: 'partyId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get', 'update', 'getSites', 'createSite', 'getContacts', 'getAccounts', 'getBalances'],
			},
		},
		default: 0,
		description: 'The unique identifier of the customer party',
	},

	// ----------------------------------
	//         customer:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
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
				resource: ['customer'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Account Number',
				name: 'AccountNumber',
				type: 'string',
				default: '',
				description: 'Filter by account number',
			},
			{
				displayName: 'Customer Type',
				name: 'CustomerType',
				type: 'options',
				options: [
					{ name: 'Organization', value: 'Organization' },
					{ name: 'Person', value: 'Person' },
				],
				default: '',
				description: 'Filter by customer type',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'PartyName:asc',
				description: 'Field to sort by',
			},
			{
				displayName: 'Party Name',
				name: 'PartyName',
				type: 'string',
				default: '',
				description: 'Filter by party name',
			},
			{
				displayName: 'Party Number',
				name: 'PartyNumber',
				type: 'string',
				default: '',
				description: 'Filter by party number',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'Active' },
					{ name: 'Inactive', value: 'Inactive' },
				],
				default: '',
				description: 'Filter by status',
			},
		],
	},

	// ----------------------------------
	//         customer:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Party Name',
				name: 'PartyName',
				type: 'string',
				default: '',
				description: 'Customer name',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'Active' },
					{ name: 'Inactive', value: 'Inactive' },
				],
				default: 'Active',
				description: 'Customer status',
			},
			{
				displayName: 'Tax Registration Number',
				name: 'TaxRegistrationNumber',
				type: 'string',
				default: '',
				description: 'Tax ID number',
			},
		],
	},

	// ----------------------------------
	//         customer:createSite
	// ----------------------------------
	{
		displayName: 'Site Name',
		name: 'siteName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createSite'],
			},
		},
		default: '',
		description: 'Name of the customer site',
	},
	{
		displayName: 'Site Additional Fields',
		name: 'siteAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createSite'],
			},
		},
		options: [
			{
				displayName: 'Address Line 1',
				name: 'AddressLine1',
				type: 'string',
				default: '',
				description: 'Address line 1',
			},
			{
				displayName: 'Address Line 2',
				name: 'AddressLine2',
				type: 'string',
				default: '',
				description: 'Address line 2',
			},
			{
				displayName: 'City',
				name: 'City',
				type: 'string',
				default: '',
				description: 'City',
			},
			{
				displayName: 'Country',
				name: 'Country',
				type: 'string',
				default: '',
				description: 'Country code',
			},
			{
				displayName: 'Postal Code',
				name: 'PostalCode',
				type: 'string',
				default: '',
				description: 'Postal/ZIP code',
			},
			{
				displayName: 'State',
				name: 'State',
				type: 'string',
				default: '',
				description: 'State/Province',
			},
		],
	},
];
