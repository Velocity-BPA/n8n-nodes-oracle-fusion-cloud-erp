/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IPollFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	oracleFusionApiRequest,
	logLicensingNotice,
} from './GenericFunctions';

import type { IOracleFusionResponse } from './types/OracleFusionCloudERPTypes';

export class OracleFusionCloudERPTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Oracle Fusion Cloud ERP Trigger',
		name: 'oracleFusionCloudERPTrigger',
		icon: 'file:oracle.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts workflow when Oracle Fusion Cloud ERP events occur',
		defaults: {
			name: 'Oracle Fusion Cloud ERP Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'oracleFusionCloudApi',
				required: true,
			},
		],
		polling: true,
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'invoiceCreated',
				options: [
					{
						name: 'Customer Created',
						value: 'customerCreated',
						description: 'Trigger when a new customer is created',
					},
					{
						name: 'Invoice Created (AP)',
						value: 'invoiceCreated',
						description: 'Trigger when a new AP invoice is created',
					},
					{
						name: 'Invoice Paid',
						value: 'invoicePaid',
						description: 'Trigger when an AP invoice is paid',
					},
					{
						name: 'Invoice Validated',
						value: 'invoiceValidated',
						description: 'Trigger when an AP invoice is validated',
					},
					{
						name: 'Journal Posted',
						value: 'journalPosted',
						description: 'Trigger when a journal is posted',
					},
					{
						name: 'Payment Created',
						value: 'paymentCreated',
						description: 'Trigger when a payment is created',
					},
					{
						name: 'Project Created',
						value: 'projectCreated',
						description: 'Trigger when a new project is created',
					},
					{
						name: 'Purchase Order Approved',
						value: 'purchaseOrderApproved',
						description: 'Trigger when a purchase order is approved',
					},
					{
						name: 'Receipt Applied',
						value: 'receiptApplied',
						description: 'Trigger when a receipt is applied',
					},
					{
						name: 'Requisition Approved',
						value: 'requisitionApproved',
						description: 'Trigger when a requisition is approved',
					},
					{
						name: 'Supplier Created',
						value: 'supplierCreated',
						description: 'Trigger when a new supplier is created',
					},
					{
						name: 'Supplier Updated',
						value: 'supplierUpdated',
						description: 'Trigger when a supplier is updated',
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Business Unit',
						name: 'businessUnit',
						type: 'string',
						default: '',
						description: 'Filter by business unit name',
					},
					{
						displayName: 'Include Full Details',
						name: 'includeFullDetails',
						type: 'boolean',
						default: false,
						description: 'Whether to fetch full record details for each item',
					},
					{
						displayName: 'Ledger ID',
						name: 'ledgerId',
						type: 'number',
						default: 0,
						description: 'Filter by ledger ID (for journal events)',
					},
					{
						displayName: 'Limit Per Poll',
						name: 'limitPerPoll',
						type: 'number',
						default: 100,
						typeOptions: {
							minValue: 1,
							maxValue: 500,
						},
						description: 'Maximum number of records to return per poll',
					},
				],
			},
		],
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		// Log licensing notice once per node load
		logLicensingNotice(this);

		const event = this.getNodeParameter('event') as string;
		const options = this.getNodeParameter('options') as IDataObject;
		const webhookData = this.getWorkflowStaticData('node');

		// Get the last poll time or use a default
		const lastPollTime = webhookData.lastPollTime as string || new Date(Date.now() - 60000).toISOString();
		const currentTime = new Date().toISOString();

		let endpoint = '';
		let filterField = 'LastUpdateDate';
		let statusFilter = '';
		let additionalFilters = '';

		// Configure endpoint and filters based on event type
		switch (event) {
			case 'supplierCreated':
				endpoint = 'suppliers';
				filterField = 'CreationDate';
				break;
			case 'supplierUpdated':
				endpoint = 'suppliers';
				filterField = 'LastUpdateDate';
				break;
			case 'invoiceCreated':
				endpoint = 'payablesInvoices';
				filterField = 'CreationDate';
				break;
			case 'invoiceValidated':
				endpoint = 'payablesInvoices';
				filterField = 'LastUpdateDate';
				statusFilter = "InvoiceStatus='VALIDATED'";
				break;
			case 'invoicePaid':
				endpoint = 'payablesInvoices';
				filterField = 'LastUpdateDate';
				statusFilter = "InvoiceStatus='PAID'";
				break;
			case 'paymentCreated':
				endpoint = 'payments';
				filterField = 'CreationDate';
				break;
			case 'receiptApplied':
				endpoint = 'cashReceipts';
				filterField = 'LastUpdateDate';
				statusFilter = "Status='APPLIED'";
				break;
			case 'journalPosted':
				endpoint = 'journals';
				filterField = 'LastUpdateDate';
				statusFilter = "Status='POSTED'";
				if (options.ledgerId) {
					additionalFilters = `;LedgerId=${options.ledgerId}`;
				}
				break;
			case 'customerCreated':
				endpoint = 'customers';
				filterField = 'CreationDate';
				break;
			case 'purchaseOrderApproved':
				endpoint = 'purchaseOrders';
				filterField = 'LastUpdateDate';
				statusFilter = "Status='APPROVED'";
				break;
			case 'requisitionApproved':
				endpoint = 'requisitions';
				filterField = 'LastUpdateDate';
				statusFilter = "Status='APPROVED'";
				break;
			case 'projectCreated':
				endpoint = 'projects';
				filterField = 'CreationDate';
				break;
			default:
				throw new Error(`Unknown event type: ${event}`);
		}

		// Build the query
		let query = `${filterField}>='${lastPollTime}'`;
		if (statusFilter) {
			query += `;${statusFilter}`;
		}
		if (additionalFilters) {
			query += additionalFilters;
		}
		if (options.businessUnit) {
			query += `;BusinessUnitName='${options.businessUnit}'`;
		}

		const qs: IDataObject = {
			q: query,
			orderBy: `${filterField}:asc`,
			limit: options.limitPerPoll || 100,
		};

		const response = await oracleFusionApiRequest.call(this, 'GET', endpoint, undefined, qs) as IOracleFusionResponse;
		const items = response.items || [];

		if (items.length === 0) {
			// Update the poll time even if no items found
			webhookData.lastPollTime = currentTime;
			return null;
		}

		// If includeFullDetails is enabled, fetch full details for each item
		let results = items;
		if (options.includeFullDetails) {
			const idField = getIdFieldForEndpoint(endpoint);
			results = await Promise.all(
				items.map(async (item: IDataObject) => {
					const id = item[idField];
					if (id) {
						try {
							return await oracleFusionApiRequest.call(this, 'GET', `${endpoint}/${id}`) as IDataObject;
						} catch {
							return item;
						}
					}
					return item;
				})
			);
		}

		// Update the last poll time to the current time
		webhookData.lastPollTime = currentTime;

		// Add event metadata to each result
		const enrichedResults = results.map((item: IDataObject) => ({
			...item,
			_eventType: event,
			_polledAt: currentTime,
		}));

		return [this.helpers.returnJsonArray(enrichedResults)];
	}
}

function getIdFieldForEndpoint(endpoint: string): string {
	const idFieldMap: { [key: string]: string } = {
		suppliers: 'SupplierId',
		payablesInvoices: 'InvoiceId',
		payments: 'PaymentId',
		cashReceipts: 'CashReceiptId',
		journals: 'HeaderId',
		customers: 'PartyId',
		purchaseOrders: 'POHeaderId',
		requisitions: 'RequisitionHeaderId',
		projects: 'ProjectId',
	};
	return idFieldMap[endpoint] || 'Id';
}
