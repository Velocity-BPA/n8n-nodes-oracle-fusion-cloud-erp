/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const supplierOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['supplier'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new supplier',
				action: 'Create a supplier',
			},
			{
				name: 'Create Contact',
				value: 'createContact',
				description: 'Add a contact to a supplier',
				action: 'Create a supplier contact',
			},
			{
				name: 'Create Site',
				value: 'createSite',
				description: 'Add a site to a supplier',
				action: 'Create a supplier site',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a supplier by ID',
				action: 'Get a supplier',
			},
			{
				name: 'Get Bank Accounts',
				value: 'getBankAccounts',
				description: 'Get supplier bank accounts',
				action: 'Get supplier bank accounts',
			},
			{
				name: 'Get Contacts',
				value: 'getContacts',
				description: 'Get supplier contacts',
				action: 'Get supplier contacts',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple suppliers',
				action: 'Get many suppliers',
			},
			{
				name: 'Get Payment Methods',
				value: 'getPaymentMethods',
				description: 'Get supplier payment methods',
				action: 'Get supplier payment methods',
			},
			{
				name: 'Get Sites',
				value: 'getSites',
				description: 'Get supplier sites/addresses',
				action: 'Get supplier sites',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update supplier information',
				action: 'Update a supplier',
			},
		],
		default: 'getAll',
	},
];

export const supplierFields: INodeProperties[] = [
	// ----------------------------------
	//         supplier:create
	// ----------------------------------
	{
		displayName: 'Supplier Name',
		name: 'supplier',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['supplier'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the supplier',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['supplier'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Payment Method',
				name: 'PaymentMethod',
				type: 'string',
				default: '',
				description: 'Payment method code',
			},
			{
				displayName: 'Payment Terms',
				name: 'PaymentTerms',
				type: 'string',
				default: '',
				description: 'Payment terms name',
			},
			{
				displayName: 'Supplier Number',
				name: 'SupplierNumber',
				type: 'string',
				default: '',
				description: 'Supplier number (alternate key)',
			},
			{
				displayName: 'Supplier Type',
				name: 'SupplierType',
				type: 'options',
				options: [
					{ name: 'Vendor', value: 'VENDOR' },
					{ name: 'Employee', value: 'EMPLOYEE' },
				],
				default: 'VENDOR',
				description: 'Type of supplier',
			},
			{
				displayName: 'Tax Organization Type',
				name: 'TaxOrganizationType',
				type: 'options',
				options: [
					{ name: 'Corporation', value: 'Corporation' },
					{ name: 'Partnership', value: 'Partnership' },
					{ name: 'Individual', value: 'Individual' },
				],
				default: 'Corporation',
				description: 'Tax organization type',
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
	//         supplier:get
	// ----------------------------------
	{
		displayName: 'Supplier ID',
		name: 'supplierId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['supplier'],
				operation: ['get', 'update', 'getContacts', 'createContact', 'getSites', 'createSite', 'getPaymentMethods', 'getBankAccounts'],
			},
		},
		default: 0,
		description: 'The unique identifier of the supplier',
	},

	// ----------------------------------
	//         supplier:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['supplier'],
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
				resource: ['supplier'],
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
				resource: ['supplier'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'Supplier:desc',
				description: 'Field to sort by (field:asc or field:desc)',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				default: '',
				description: 'Filter by supplier status',
			},
			{
				displayName: 'Supplier Name',
				name: 'Supplier',
				type: 'string',
				default: '',
				description: 'Filter by supplier name',
			},
			{
				displayName: 'Supplier Number',
				name: 'SupplierNumber',
				type: 'string',
				default: '',
				description: 'Filter by supplier number',
			},
			{
				displayName: 'Supplier Type',
				name: 'SupplierType',
				type: 'options',
				options: [
					{ name: 'Vendor', value: 'VENDOR' },
					{ name: 'Employee', value: 'EMPLOYEE' },
				],
				default: '',
				description: 'Filter by supplier type',
			},
		],
	},

	// ----------------------------------
	//         supplier:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['supplier'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Payment Method',
				name: 'PaymentMethod',
				type: 'string',
				default: '',
				description: 'Payment method code',
			},
			{
				displayName: 'Payment Terms',
				name: 'PaymentTerms',
				type: 'string',
				default: '',
				description: 'Payment terms name',
			},
			{
				displayName: 'Status',
				name: 'Status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				default: 'ACTIVE',
				description: 'Supplier status',
			},
			{
				displayName: 'Supplier Name',
				name: 'Supplier',
				type: 'string',
				default: '',
				description: 'The name of the supplier',
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
	//         supplier:createContact
	// ----------------------------------
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['supplier'],
				operation: ['createContact'],
			},
		},
		default: '',
		description: 'Contact first name',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['supplier'],
				operation: ['createContact'],
			},
		},
		default: '',
		description: 'Contact last name',
	},
	{
		displayName: 'Contact Additional Fields',
		name: 'contactAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['supplier'],
				operation: ['createContact'],
			},
		},
		options: [
			{
				displayName: 'Email Address',
				name: 'EmailAddress',
				type: 'string',
				default: '',
				description: 'Contact email address',
			},
			{
				displayName: 'Phone Number',
				name: 'PhoneNumber',
				type: 'string',
				default: '',
				description: 'Contact phone number',
			},
		],
	},

	// ----------------------------------
	//         supplier:createSite
	// ----------------------------------
	{
		displayName: 'Site Name',
		name: 'siteName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['supplier'],
				operation: ['createSite'],
			},
		},
		default: '',
		description: 'Name of the supplier site',
	},
	{
		displayName: 'Site Additional Fields',
		name: 'siteAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['supplier'],
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
