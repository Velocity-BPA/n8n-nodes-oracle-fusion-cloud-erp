/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['project'],
			},
		},
		options: [
			{
				name: 'Add Team Member',
				value: 'addTeamMember',
				description: 'Add a team member to a project',
				action: 'Add team member',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a project',
				action: 'Create a project',
			},
			{
				name: 'Create Task',
				value: 'createTask',
				description: 'Add a task to a project',
				action: 'Create a project task',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a project by ID',
				action: 'Get a project',
			},
			{
				name: 'Get Actuals',
				value: 'getActuals',
				description: 'Get project actuals',
				action: 'Get project actuals',
			},
			{
				name: 'Get Budget',
				value: 'getBudget',
				description: 'Get project budget',
				action: 'Get project budget',
			},
			{
				name: 'Get Expenditures',
				value: 'getExpenditures',
				description: 'Get project expenditures',
				action: 'Get project expenditures',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple projects',
				action: 'Get many projects',
			},
			{
				name: 'Get Tasks',
				value: 'getTasks',
				description: 'Get project tasks',
				action: 'Get project tasks',
			},
			{
				name: 'Get Team Members',
				value: 'getTeamMembers',
				description: 'Get project team members',
				action: 'Get team members',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a project',
				action: 'Update a project',
			},
		],
		default: 'getAll',
	},
];

export const projectFields: INodeProperties[] = [
	// ----------------------------------
	//         project:create
	// ----------------------------------
	{
		displayName: 'Project Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The project name',
	},
	{
		displayName: 'Project Number',
		name: 'projectNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The project number',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Project start date',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Completion Date',
				name: 'CompletionDate',
				type: 'dateTime',
				default: '',
				description: 'Planned completion date',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Project description',
			},
			{
				displayName: 'Organization',
				name: 'Organization',
				type: 'string',
				default: '',
				description: 'Project organization',
			},
			{
				displayName: 'Project Manager',
				name: 'ProjectManager',
				type: 'number',
				default: 0,
				description: 'Project manager person ID',
			},
			{
				displayName: 'Project Status Code',
				name: 'ProjectStatusCode',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Approved', value: 'APPROVED' },
					{ name: 'Closed', value: 'CLOSED' },
					{ name: 'Submitted', value: 'SUBMITTED' },
				],
				default: 'SUBMITTED',
				description: 'Project status',
			},
		],
	},

	// ----------------------------------
	//         project:get
	// ----------------------------------
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['get', 'update', 'getTasks', 'createTask', 'getTeamMembers', 'addTeamMember', 'getBudget', 'getActuals', 'getExpenditures'],
			},
		},
		default: 0,
		description: 'The unique identifier of the project',
	},

	// ----------------------------------
	//         project:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['project'],
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
				resource: ['project'],
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
				resource: ['project'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				placeholder: 'Name:asc',
				description: 'Field to sort by',
			},
			{
				displayName: 'Organization',
				name: 'Organization',
				type: 'string',
				default: '',
				description: 'Filter by organization',
			},
			{
				displayName: 'Project Manager',
				name: 'ProjectManager',
				type: 'number',
				default: 0,
				description: 'Filter by project manager ID',
			},
			{
				displayName: 'Project Name',
				name: 'Name',
				type: 'string',
				default: '',
				description: 'Filter by project name',
			},
			{
				displayName: 'Project Number',
				name: 'ProjectNumber',
				type: 'string',
				default: '',
				description: 'Filter by project number',
			},
			{
				displayName: 'Project Status Code',
				name: 'ProjectStatusCode',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Approved', value: 'APPROVED' },
					{ name: 'Closed', value: 'CLOSED' },
					{ name: 'Submitted', value: 'SUBMITTED' },
				],
				default: '',
				description: 'Filter by project status',
			},
		],
	},

	// ----------------------------------
	//         project:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Completion Date',
				name: 'CompletionDate',
				type: 'dateTime',
				default: '',
				description: 'Planned completion date',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: 'Project description',
			},
			{
				displayName: 'Project Manager',
				name: 'ProjectManager',
				type: 'number',
				default: 0,
				description: 'Project manager person ID',
			},
			{
				displayName: 'Project Name',
				name: 'Name',
				type: 'string',
				default: '',
				description: 'Project name',
			},
			{
				displayName: 'Project Status Code',
				name: 'ProjectStatusCode',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Approved', value: 'APPROVED' },
					{ name: 'Closed', value: 'CLOSED' },
					{ name: 'Submitted', value: 'SUBMITTED' },
				],
				default: 'ACTIVE',
				description: 'Project status',
			},
		],
	},

	// ----------------------------------
	//         project:createTask
	// ----------------------------------
	{
		displayName: 'Task Number',
		name: 'taskNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['createTask'],
			},
		},
		default: '',
		description: 'The task number',
	},
	{
		displayName: 'Task Name',
		name: 'taskName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['createTask'],
			},
		},
		default: '',
		description: 'The task name',
	},
	{
		displayName: 'Task Additional Fields',
		name: 'taskAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['createTask'],
			},
		},
		options: [
			{
				displayName: 'Completion Date',
				name: 'CompletionDate',
				type: 'dateTime',
				default: '',
				description: 'Task completion date',
			},
			{
				displayName: 'Start Date',
				name: 'StartDate',
				type: 'dateTime',
				default: '',
				description: 'Task start date',
			},
		],
	},

	// ----------------------------------
	//         project:addTeamMember
	// ----------------------------------
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['addTeamMember'],
			},
		},
		default: 0,
		description: 'The person ID to add as team member',
	},
	{
		displayName: 'Project Role',
		name: 'projectRole',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['addTeamMember'],
			},
		},
		default: '',
		description: 'The role on the project',
	},
	{
		displayName: 'Team Member Additional Fields',
		name: 'teamMemberAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['addTeamMember'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'EndDate',
				type: 'dateTime',
				default: '',
				description: 'Team member end date',
			},
			{
				displayName: 'Start Date',
				name: 'StartDate',
				type: 'dateTime',
				default: '',
				description: 'Team member start date',
			},
		],
	},
];
