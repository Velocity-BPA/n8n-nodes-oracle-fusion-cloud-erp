/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	oracleFusionApiRequest,
	oracleFusionApiRequestAllItems,
	buildQueryParams,
	formatOracleDate,
	logLicensingNotice,
} from './GenericFunctions';

import { supplierOperations, supplierFields } from './descriptions/SupplierDescription';
import { payablesInvoiceOperations, payablesInvoiceFields } from './descriptions/PayablesInvoiceDescription';
import { paymentOperations, paymentFields } from './descriptions/PaymentDescription';
import { receivablesInvoiceOperations, receivablesInvoiceFields } from './descriptions/ReceivablesInvoiceDescription';
import { receiptOperations, receiptFields } from './descriptions/ReceiptDescription';
import { journalOperations, journalFields } from './descriptions/JournalDescription';
import { customerOperations, customerFields } from './descriptions/CustomerDescription';
import { purchaseOrderOperations, purchaseOrderFields } from './descriptions/PurchaseOrderDescription';
import { requisitionOperations, requisitionFields } from './descriptions/RequisitionDescription';
import { projectOperations, projectFields } from './descriptions/ProjectDescription';
import { ledgerAccountOperations, ledgerAccountFields } from './descriptions/LedgerAccountDescription';
import { bankAccountOperations, bankAccountFields } from './descriptions/BankAccountDescription';

import type { IOracleFusionResponse } from './types/OracleFusionCloudERPTypes';

export class OracleFusionCloudERP implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Oracle Fusion Cloud ERP',
		name: 'oracleFusionCloudERP',
		icon: 'file:oracle.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Oracle Fusion Cloud ERP API',
		defaults: {
			name: 'Oracle Fusion Cloud ERP',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'oracleFusionCloudApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Bank Account',
						value: 'bankAccount',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Journal',
						value: 'journal',
					},
					{
						name: 'Ledger Account',
						value: 'ledgerAccount',
					},
					{
						name: 'Payables Invoice',
						value: 'payablesInvoice',
					},
					{
						name: 'Payment',
						value: 'payment',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Purchase Order',
						value: 'purchaseOrder',
					},
					{
						name: 'Receipt',
						value: 'receipt',
					},
					{
						name: 'Receivables Invoice',
						value: 'receivablesInvoice',
					},
					{
						name: 'Requisition',
						value: 'requisition',
					},
					{
						name: 'Supplier',
						value: 'supplier',
					},
				],
				default: 'supplier',
			},
			...supplierOperations,
			...supplierFields,
			...payablesInvoiceOperations,
			...payablesInvoiceFields,
			...paymentOperations,
			...paymentFields,
			...receivablesInvoiceOperations,
			...receivablesInvoiceFields,
			...receiptOperations,
			...receiptFields,
			...journalOperations,
			...journalFields,
			...customerOperations,
			...customerFields,
			...purchaseOrderOperations,
			...purchaseOrderFields,
			...requisitionOperations,
			...requisitionFields,
			...projectOperations,
			...projectFields,
			...ledgerAccountOperations,
			...ledgerAccountFields,
			...bankAccountOperations,
			...bankAccountFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Log licensing notice once per node load
		logLicensingNotice(this);

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// ==================== SUPPLIER ====================
				if (resource === 'supplier') {
					if (operation === 'create') {
						const body: IDataObject = {
							Supplier: this.getNodeParameter('supplierName', i) as string,
							SupplierType: this.getNodeParameter('supplierType', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'suppliers', body);
					}
					else if (operation === 'get') {
						const supplierId = this.getNodeParameter('supplierId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `suppliers/${supplierId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'suppliers', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'suppliers', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const supplierId = this.getNodeParameter('supplierId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `suppliers/${supplierId}`, updateFields);
					}
					else if (operation === 'createContact') {
						const supplierId = this.getNodeParameter('supplierId', i) as number;
						const body: IDataObject = {
							FirstName: this.getNodeParameter('firstName', i) as string,
							LastName: this.getNodeParameter('lastName', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `suppliers/${supplierId}/child/contacts`, body);
					}
					else if (operation === 'getContacts') {
						const supplierId = this.getNodeParameter('supplierId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', `suppliers/${supplierId}/child/contacts`);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', `suppliers/${supplierId}/child/contacts`, undefined, { limit }) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'createSite') {
						const supplierId = this.getNodeParameter('supplierId', i) as number;
						const body: IDataObject = {
							SupplierSite: this.getNodeParameter('supplierSite', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `suppliers/${supplierId}/child/sites`, body);
					}
					else if (operation === 'getSites') {
						const supplierId = this.getNodeParameter('supplierId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', `suppliers/${supplierId}/child/sites`);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', `suppliers/${supplierId}/child/sites`, undefined, { limit }) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'getPaymentMethods') {
						const supplierId = this.getNodeParameter('supplierId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `suppliers/${supplierId}/child/paymentMethods`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getBankAccounts') {
						const supplierId = this.getNodeParameter('supplierId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `suppliers/${supplierId}/child/bankAccounts`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== PAYABLES INVOICE ====================
				else if (resource === 'payablesInvoice') {
					if (operation === 'create') {
						const body: IDataObject = {
							InvoiceNum: this.getNodeParameter('invoiceNum', i) as string,
							VendorSiteId: this.getNodeParameter('vendorSiteId', i) as number,
							InvoiceAmount: this.getNodeParameter('invoiceAmount', i) as number,
							InvoiceDate: formatOracleDate(this.getNodeParameter('invoiceDate', i) as string),
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'payablesInvoices', body);
					}
					else if (operation === 'get') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `payablesInvoices/${invoiceId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'payablesInvoices', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'payablesInvoices', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `payablesInvoices/${invoiceId}`, updateFields);
					}
					else if (operation === 'delete') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						await oracleFusionApiRequest.call(this, 'DELETE', `payablesInvoices/${invoiceId}`);
						responseData = { success: true, invoiceId };
					}
					else if (operation === 'createLine') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						const body: IDataObject = {
							LineNumber: this.getNodeParameter('lineNumber', i) as number,
							LineAmount: this.getNodeParameter('lineAmount', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `payablesInvoices/${invoiceId}/child/invoiceLines`, body);
					}
					else if (operation === 'updateLine') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						const lineNumber = this.getNodeParameter('lineNumber', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `payablesInvoices/${invoiceId}/child/invoiceLines/${lineNumber}`, updateFields);
					}
					else if (operation === 'deleteLine') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						const lineNumber = this.getNodeParameter('lineNumber', i) as number;
						await oracleFusionApiRequest.call(this, 'DELETE', `payablesInvoices/${invoiceId}/child/invoiceLines/${lineNumber}`);
						responseData = { success: true, invoiceId, lineNumber };
					}
					else if (operation === 'validate') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `payablesInvoices/${invoiceId}/action/validate`, {});
					}
					else if (operation === 'approve') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `payablesInvoices/${invoiceId}/action/approve`, {});
					}
					else if (operation === 'hold') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						const holdReason = this.getNodeParameter('holdReason', i) as string;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `payablesInvoices/${invoiceId}/action/hold`, { HoldReason: holdReason });
					}
					else if (operation === 'releaseHold') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `payablesInvoices/${invoiceId}/action/releaseHold`, {});
					}
					else if (operation === 'getPayments') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `payablesInvoices/${invoiceId}/child/invoicePayments`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getDistributions') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `payablesInvoices/${invoiceId}/child/invoiceDistributions`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== PAYMENT ====================
				else if (resource === 'payment') {
					if (operation === 'get') {
						const paymentId = this.getNodeParameter('paymentId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `payments/${paymentId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'payments', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'payments', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'void') {
						const paymentId = this.getNodeParameter('paymentId', i) as number;
						const voidReason = this.getNodeParameter('voidReason', i) as string;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `payments/${paymentId}/action/void`, { VoidReason: voidReason });
					}
					else if (operation === 'stop') {
						const paymentId = this.getNodeParameter('paymentId', i) as number;
						const stopReason = this.getNodeParameter('stopReason', i) as string;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `payments/${paymentId}/action/stop`, { StopReason: stopReason });
					}
					else if (operation === 'getPaymentDocuments') {
						const paymentId = this.getNodeParameter('paymentId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `payments/${paymentId}/child/paymentDocuments`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getRemittances') {
						const paymentId = this.getNodeParameter('paymentId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `payments/${paymentId}/child/remittances`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== RECEIVABLES INVOICE ====================
				else if (resource === 'receivablesInvoice') {
					if (operation === 'create') {
						const body: IDataObject = {
							TrxNumber: this.getNodeParameter('trxNumber', i) as string,
							TrxDate: formatOracleDate(this.getNodeParameter('trxDate', i) as string),
							CustomerAccountId: this.getNodeParameter('customerAccountId', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'receivablesInvoices', body);
					}
					else if (operation === 'get') {
						const customerTrxId = this.getNodeParameter('customerTrxId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `receivablesInvoices/${customerTrxId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'receivablesInvoices', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'receivablesInvoices', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const customerTrxId = this.getNodeParameter('customerTrxId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `receivablesInvoices/${customerTrxId}`, updateFields);
					}
					else if (operation === 'createLine') {
						const customerTrxId = this.getNodeParameter('customerTrxId', i) as number;
						const body: IDataObject = {
							LineNumber: this.getNodeParameter('lineNumber', i) as number,
							Amount: this.getNodeParameter('amount', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `receivablesInvoices/${customerTrxId}/child/invoiceLines`, body);
					}
					else if (operation === 'updateLine') {
						const customerTrxId = this.getNodeParameter('customerTrxId', i) as number;
						const lineNumber = this.getNodeParameter('lineNumber', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `receivablesInvoices/${customerTrxId}/child/invoiceLines/${lineNumber}`, updateFields);
					}
					else if (operation === 'deleteLine') {
						const customerTrxId = this.getNodeParameter('customerTrxId', i) as number;
						const lineNumber = this.getNodeParameter('lineNumber', i) as number;
						await oracleFusionApiRequest.call(this, 'DELETE', `receivablesInvoices/${customerTrxId}/child/invoiceLines/${lineNumber}`);
						responseData = { success: true, customerTrxId, lineNumber };
					}
					else if (operation === 'complete') {
						const customerTrxId = this.getNodeParameter('customerTrxId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `receivablesInvoices/${customerTrxId}/action/complete`, {});
					}
					else if (operation === 'getReceipts') {
						const customerTrxId = this.getNodeParameter('customerTrxId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `receivablesInvoices/${customerTrxId}/child/receiptApplications`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getSchedules') {
						const customerTrxId = this.getNodeParameter('customerTrxId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `receivablesInvoices/${customerTrxId}/child/paymentSchedules`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== RECEIPT ====================
				else if (resource === 'receipt') {
					if (operation === 'create') {
						const body: IDataObject = {
							ReceiptNumber: this.getNodeParameter('receiptNumber', i) as string,
							ReceiptDate: formatOracleDate(this.getNodeParameter('receiptDate', i) as string),
							Amount: this.getNodeParameter('amount', i) as number,
							CustomerAccountId: this.getNodeParameter('customerAccountId', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'cashReceipts', body);
					}
					else if (operation === 'get') {
						const cashReceiptId = this.getNodeParameter('cashReceiptId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `cashReceipts/${cashReceiptId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'cashReceipts', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'cashReceipts', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const cashReceiptId = this.getNodeParameter('cashReceiptId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `cashReceipts/${cashReceiptId}`, updateFields);
					}
					else if (operation === 'apply') {
						const cashReceiptId = this.getNodeParameter('cashReceiptId', i) as number;
						const body: IDataObject = {
							CustomerTrxId: this.getNodeParameter('customerTrxId', i) as number,
							AmountApplied: this.getNodeParameter('amountApplied', i) as number,
						};
						responseData = await oracleFusionApiRequest.call(this, 'POST', `cashReceipts/${cashReceiptId}/action/apply`, body);
					}
					else if (operation === 'unapply') {
						const cashReceiptId = this.getNodeParameter('cashReceiptId', i) as number;
						const receivableApplicationId = this.getNodeParameter('receivableApplicationId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `cashReceipts/${cashReceiptId}/action/unapply`, { ReceivableApplicationId: receivableApplicationId });
					}
					else if (operation === 'reverse') {
						const cashReceiptId = this.getNodeParameter('cashReceiptId', i) as number;
						const reversalReason = this.getNodeParameter('reversalReason', i) as string;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `cashReceipts/${cashReceiptId}/action/reverse`, { ReversalReason: reversalReason });
					}
					else if (operation === 'getApplications') {
						const cashReceiptId = this.getNodeParameter('cashReceiptId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `cashReceipts/${cashReceiptId}/child/receiptApplications`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== JOURNAL ====================
				else if (resource === 'journal') {
					if (operation === 'create') {
						const body: IDataObject = {
							Name: this.getNodeParameter('name', i) as string,
							JournalCategory: this.getNodeParameter('journalCategory', i) as string,
							JournalSource: this.getNodeParameter('journalSource', i) as string,
							AccountingPeriod: this.getNodeParameter('accountingPeriod', i) as string,
							LedgerId: this.getNodeParameter('ledgerId', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'journals', body);
					}
					else if (operation === 'get') {
						const headerId = this.getNodeParameter('headerId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `journals/${headerId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'journals', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'journals', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const headerId = this.getNodeParameter('headerId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `journals/${headerId}`, updateFields);
					}
					else if (operation === 'createLine') {
						const headerId = this.getNodeParameter('headerId', i) as number;
						const body: IDataObject = {
							LineNumber: this.getNodeParameter('lineNumber', i) as number,
							AccountCombination: this.getNodeParameter('accountCombination', i) as string,
						};
						const debitAmount = this.getNodeParameter('debitAmount', i, 0) as number;
						const creditAmount = this.getNodeParameter('creditAmount', i, 0) as number;
						if (debitAmount > 0) body.EnteredDr = debitAmount;
						if (creditAmount > 0) body.EnteredCr = creditAmount;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `journals/${headerId}/child/journalLines`, body);
					}
					else if (operation === 'updateLine') {
						const headerId = this.getNodeParameter('headerId', i) as number;
						const lineNumber = this.getNodeParameter('lineNumber', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `journals/${headerId}/child/journalLines/${lineNumber}`, updateFields);
					}
					else if (operation === 'deleteLine') {
						const headerId = this.getNodeParameter('headerId', i) as number;
						const lineNumber = this.getNodeParameter('lineNumber', i) as number;
						await oracleFusionApiRequest.call(this, 'DELETE', `journals/${headerId}/child/journalLines/${lineNumber}`);
						responseData = { success: true, headerId, lineNumber };
					}
					else if (operation === 'post') {
						const headerId = this.getNodeParameter('headerId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `journals/${headerId}/action/post`, {});
					}
					else if (operation === 'reverse') {
						const headerId = this.getNodeParameter('headerId', i) as number;
						const reversalPeriod = this.getNodeParameter('reversalPeriod', i) as string;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `journals/${headerId}/action/reverse`, { ReversalPeriod: reversalPeriod });
					}
					else if (operation === 'getBalances') {
						const headerId = this.getNodeParameter('headerId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `journals/${headerId}/child/journalLines`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== CUSTOMER ====================
				else if (resource === 'customer') {
					if (operation === 'create') {
						const body: IDataObject = {
							PartyName: this.getNodeParameter('partyName', i) as string,
							CustomerType: this.getNodeParameter('customerType', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'customers', body);
					}
					else if (operation === 'get') {
						const partyId = this.getNodeParameter('partyId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `customers/${partyId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'customers', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'customers', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const partyId = this.getNodeParameter('partyId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `customers/${partyId}`, updateFields);
					}
					else if (operation === 'createSite') {
						const partyId = this.getNodeParameter('partyId', i) as number;
						const body: IDataObject = {
							SiteNumber: this.getNodeParameter('siteNumber', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `customers/${partyId}/child/customerSites`, body);
					}
					else if (operation === 'getSites') {
						const partyId = this.getNodeParameter('partyId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', `customers/${partyId}/child/customerSites`);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', `customers/${partyId}/child/customerSites`, undefined, { limit }) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'getContacts') {
						const partyId = this.getNodeParameter('partyId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `customers/${partyId}/child/contacts`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getAccounts') {
						const partyId = this.getNodeParameter('partyId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `customers/${partyId}/child/customerAccounts`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getBalances') {
						const partyId = this.getNodeParameter('partyId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `customers/${partyId}/child/customerBalances`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== PURCHASE ORDER ====================
				else if (resource === 'purchaseOrder') {
					if (operation === 'create') {
						const body: IDataObject = {
							OrderNumber: this.getNodeParameter('orderNumber', i) as string,
							VendorId: this.getNodeParameter('vendorId', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'purchaseOrders', body);
					}
					else if (operation === 'get') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `purchaseOrders/${poHeaderId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'purchaseOrders', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'purchaseOrders', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `purchaseOrders/${poHeaderId}`, updateFields);
					}
					else if (operation === 'createLine') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						const body: IDataObject = {
							LineNumber: this.getNodeParameter('lineNumber', i) as number,
							ItemDescription: this.getNodeParameter('itemDescription', i) as string,
							Quantity: this.getNodeParameter('quantity', i) as number,
							UnitPrice: this.getNodeParameter('unitPrice', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `purchaseOrders/${poHeaderId}/child/lines`, body);
					}
					else if (operation === 'updateLine') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						const lineNumber = this.getNodeParameter('lineNumber', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `purchaseOrders/${poHeaderId}/child/lines/${lineNumber}`, updateFields);
					}
					else if (operation === 'deleteLine') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						const lineNumber = this.getNodeParameter('lineNumber', i) as number;
						await oracleFusionApiRequest.call(this, 'DELETE', `purchaseOrders/${poHeaderId}/child/lines/${lineNumber}`);
						responseData = { success: true, poHeaderId, lineNumber };
					}
					else if (operation === 'submit') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `purchaseOrders/${poHeaderId}/action/submit`, {});
					}
					else if (operation === 'approve') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `purchaseOrders/${poHeaderId}/action/approve`, {});
					}
					else if (operation === 'cancel') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						const cancelReason = this.getNodeParameter('cancelReason', i) as string;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `purchaseOrders/${poHeaderId}/action/cancel`, { CancelReason: cancelReason });
					}
					else if (operation === 'close') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `purchaseOrders/${poHeaderId}/action/close`, {});
					}
					else if (operation === 'getReceipts') {
						const poHeaderId = this.getNodeParameter('poHeaderId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `purchaseOrders/${poHeaderId}/child/receipts`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== REQUISITION ====================
				else if (resource === 'requisition') {
					if (operation === 'create') {
						const body: IDataObject = {
							RequisitionNumber: this.getNodeParameter('requisitionNumber', i) as string,
							Description: this.getNodeParameter('description', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'requisitions', body);
					}
					else if (operation === 'get') {
						const requisitionHeaderId = this.getNodeParameter('requisitionHeaderId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `requisitions/${requisitionHeaderId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'requisitions', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'requisitions', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const requisitionHeaderId = this.getNodeParameter('requisitionHeaderId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `requisitions/${requisitionHeaderId}`, updateFields);
					}
					else if (operation === 'createLine') {
						const requisitionHeaderId = this.getNodeParameter('requisitionHeaderId', i) as number;
						const body: IDataObject = {
							LineNumber: this.getNodeParameter('lineNumber', i) as number,
							ItemDescription: this.getNodeParameter('itemDescription', i) as string,
							Quantity: this.getNodeParameter('quantity', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `requisitions/${requisitionHeaderId}/child/lines`, body);
					}
					else if (operation === 'submit') {
						const requisitionHeaderId = this.getNodeParameter('requisitionHeaderId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `requisitions/${requisitionHeaderId}/action/submit`, {});
					}
					else if (operation === 'approve') {
						const requisitionHeaderId = this.getNodeParameter('requisitionHeaderId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `requisitions/${requisitionHeaderId}/action/approve`, {});
					}
					else if (operation === 'return') {
						const requisitionHeaderId = this.getNodeParameter('requisitionHeaderId', i) as number;
						const returnReason = this.getNodeParameter('returnReason', i) as string;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `requisitions/${requisitionHeaderId}/action/return`, { ReturnReason: returnReason });
					}
					else if (operation === 'cancel') {
						const requisitionHeaderId = this.getNodeParameter('requisitionHeaderId', i) as number;
						const cancelReason = this.getNodeParameter('cancelReason', i) as string;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `requisitions/${requisitionHeaderId}/action/cancel`, { CancelReason: cancelReason });
					}
					else if (operation === 'convertToPO') {
						const requisitionHeaderId = this.getNodeParameter('requisitionHeaderId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `requisitions/${requisitionHeaderId}/action/convertToPurchaseOrder`, {});
					}
				}

				// ==================== PROJECT ====================
				else if (resource === 'project') {
					if (operation === 'create') {
						const body: IDataObject = {
							ProjectNumber: this.getNodeParameter('projectNumber', i) as string,
							Name: this.getNodeParameter('name', i) as string,
							StartDate: formatOracleDate(this.getNodeParameter('startDate', i) as string),
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', 'projects', body);
					}
					else if (operation === 'get') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `projects/${projectId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'projects', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'projects', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'update') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await oracleFusionApiRequest.call(this, 'PATCH', `projects/${projectId}`, updateFields);
					}
					else if (operation === 'createTask') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						const body: IDataObject = {
							TaskNumber: this.getNodeParameter('taskNumber', i) as string,
							TaskName: this.getNodeParameter('taskName', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `projects/${projectId}/child/tasks`, body);
					}
					else if (operation === 'getTasks') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', `projects/${projectId}/child/tasks`);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', `projects/${projectId}/child/tasks`, undefined, { limit }) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'addTeamMember') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						const body: IDataObject = {
							PersonId: this.getNodeParameter('personId', i) as number,
							ProjectRole: this.getNodeParameter('projectRole', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await oracleFusionApiRequest.call(this, 'POST', `projects/${projectId}/child/teamMembers`, body);
					}
					else if (operation === 'getTeamMembers') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `projects/${projectId}/child/teamMembers`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getBudget') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `projects/${projectId}/child/budgets`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getActuals') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `projects/${projectId}/child/actuals`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getExpenditures') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `projects/${projectId}/child/expenditures`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
				}

				// ==================== LEDGER ACCOUNT ====================
				else if (resource === 'ledgerAccount') {
					if (operation === 'get') {
						const accountId = this.getNodeParameter('accountId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `ledgerAccounts/${accountId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'ledgerAccounts', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'ledgerAccounts', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'getBalances') {
						const ledgerId = this.getNodeParameter('ledgerId', i) as number;
						const accountingPeriod = this.getNodeParameter('accountingPeriod', i) as string;
						const qs = { q: `LedgerId=${ledgerId} and AccountingPeriod='${accountingPeriod}'` };
						const response = await oracleFusionApiRequest.call(this, 'GET', 'accountBalances', undefined, qs) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getTransactions') {
						const ledgerId = this.getNodeParameter('ledgerId', i) as number;
						const accountingPeriod = this.getNodeParameter('accountingPeriod', i) as string;
						const qs = { q: `LedgerId=${ledgerId} and AccountingPeriod='${accountingPeriod}'` };
						const response = await oracleFusionApiRequest.call(this, 'GET', 'accountTransactions', undefined, qs) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getCodeCombinations') {
						const ledgerId = this.getNodeParameter('ledgerId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const qs = buildQueryParams(returnAll, limit, { LedgerId: ledgerId });

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'codeCombinations', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'codeCombinations', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
				}

				// ==================== BANK ACCOUNT ====================
				else if (resource === 'bankAccount') {
					if (operation === 'get') {
						const bankAccountId = this.getNodeParameter('bankAccountId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'GET', `bankAccounts/${bankAccountId}`);
					}
					else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs = buildQueryParams(returnAll, limit, filters);

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', 'bankAccounts', undefined, qs);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', 'bankAccounts', undefined, qs) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'getBalances') {
						const bankAccountId = this.getNodeParameter('bankAccountId', i) as number;
						const response = await oracleFusionApiRequest.call(this, 'GET', `bankAccounts/${bankAccountId}/child/balances`) as IOracleFusionResponse;
						responseData = response.items || [];
					}
					else if (operation === 'getStatements') {
						const bankAccountId = this.getNodeParameter('bankAccountId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', `bankAccounts/${bankAccountId}/child/statements`);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', `bankAccounts/${bankAccountId}/child/statements`, undefined, { limit }) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'getTransactions') {
						const bankAccountId = this.getNodeParameter('bankAccountId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;

						if (returnAll) {
							responseData = await oracleFusionApiRequestAllItems.call(this, 'GET', `bankAccounts/${bankAccountId}/child/transactions`);
						} else {
							const response = await oracleFusionApiRequest.call(this, 'GET', `bankAccounts/${bankAccountId}/child/transactions`, undefined, { limit }) as IOracleFusionResponse;
							responseData = response.items || [];
						}
					}
					else if (operation === 'reconcile') {
						const bankAccountId = this.getNodeParameter('bankAccountId', i) as number;
						const statementId = this.getNodeParameter('statementId', i) as number;
						responseData = await oracleFusionApiRequest.call(this, 'POST', `bankAccounts/${bankAccountId}/action/reconcile`, { StatementId: statementId });
					}
				}

				// Format output
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
