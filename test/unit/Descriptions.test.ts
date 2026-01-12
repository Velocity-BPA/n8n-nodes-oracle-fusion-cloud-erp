/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { supplierOperations, supplierFields } from '../../nodes/OracleFusionCloudERP/descriptions/SupplierDescription';
import { payablesInvoiceOperations, payablesInvoiceFields } from '../../nodes/OracleFusionCloudERP/descriptions/PayablesInvoiceDescription';
import { paymentOperations, paymentFields } from '../../nodes/OracleFusionCloudERP/descriptions/PaymentDescription';
import { receivablesInvoiceOperations, receivablesInvoiceFields } from '../../nodes/OracleFusionCloudERP/descriptions/ReceivablesInvoiceDescription';
import { receiptOperations, receiptFields } from '../../nodes/OracleFusionCloudERP/descriptions/ReceiptDescription';
import { journalOperations, journalFields } from '../../nodes/OracleFusionCloudERP/descriptions/JournalDescription';
import { customerOperations, customerFields } from '../../nodes/OracleFusionCloudERP/descriptions/CustomerDescription';
import { purchaseOrderOperations, purchaseOrderFields } from '../../nodes/OracleFusionCloudERP/descriptions/PurchaseOrderDescription';
import { requisitionOperations, requisitionFields } from '../../nodes/OracleFusionCloudERP/descriptions/RequisitionDescription';
import { projectOperations, projectFields } from '../../nodes/OracleFusionCloudERP/descriptions/ProjectDescription';
import { ledgerAccountOperations, ledgerAccountFields } from '../../nodes/OracleFusionCloudERP/descriptions/LedgerAccountDescription';
import { bankAccountOperations, bankAccountFields } from '../../nodes/OracleFusionCloudERP/descriptions/BankAccountDescription';

describe('Node Descriptions', () => {
	describe('Supplier Description', () => {
		it('should have operations defined', () => {
			expect(supplierOperations).toBeDefined();
			expect(supplierOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(supplierFields).toBeDefined();
			expect(supplierFields.length).toBeGreaterThan(0);
		});

		it('should have correct resource display option', () => {
			const operation = supplierOperations[0];
			expect(operation.displayOptions?.show?.resource).toContain('supplier');
		});
	});

	describe('Payables Invoice Description', () => {
		it('should have operations defined', () => {
			expect(payablesInvoiceOperations).toBeDefined();
			expect(payablesInvoiceOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(payablesInvoiceFields).toBeDefined();
			expect(payablesInvoiceFields.length).toBeGreaterThan(0);
		});

		it('should have correct resource display option', () => {
			const operation = payablesInvoiceOperations[0];
			expect(operation.displayOptions?.show?.resource).toContain('payablesInvoice');
		});
	});

	describe('Payment Description', () => {
		it('should have operations defined', () => {
			expect(paymentOperations).toBeDefined();
			expect(paymentOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(paymentFields).toBeDefined();
			expect(paymentFields.length).toBeGreaterThan(0);
		});
	});

	describe('Receivables Invoice Description', () => {
		it('should have operations defined', () => {
			expect(receivablesInvoiceOperations).toBeDefined();
			expect(receivablesInvoiceOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(receivablesInvoiceFields).toBeDefined();
			expect(receivablesInvoiceFields.length).toBeGreaterThan(0);
		});
	});

	describe('Receipt Description', () => {
		it('should have operations defined', () => {
			expect(receiptOperations).toBeDefined();
			expect(receiptOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(receiptFields).toBeDefined();
			expect(receiptFields.length).toBeGreaterThan(0);
		});
	});

	describe('Journal Description', () => {
		it('should have operations defined', () => {
			expect(journalOperations).toBeDefined();
			expect(journalOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(journalFields).toBeDefined();
			expect(journalFields.length).toBeGreaterThan(0);
		});
	});

	describe('Customer Description', () => {
		it('should have operations defined', () => {
			expect(customerOperations).toBeDefined();
			expect(customerOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(customerFields).toBeDefined();
			expect(customerFields.length).toBeGreaterThan(0);
		});
	});

	describe('Purchase Order Description', () => {
		it('should have operations defined', () => {
			expect(purchaseOrderOperations).toBeDefined();
			expect(purchaseOrderOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(purchaseOrderFields).toBeDefined();
			expect(purchaseOrderFields.length).toBeGreaterThan(0);
		});
	});

	describe('Requisition Description', () => {
		it('should have operations defined', () => {
			expect(requisitionOperations).toBeDefined();
			expect(requisitionOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(requisitionFields).toBeDefined();
			expect(requisitionFields.length).toBeGreaterThan(0);
		});
	});

	describe('Project Description', () => {
		it('should have operations defined', () => {
			expect(projectOperations).toBeDefined();
			expect(projectOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(projectFields).toBeDefined();
			expect(projectFields.length).toBeGreaterThan(0);
		});
	});

	describe('Ledger Account Description', () => {
		it('should have operations defined', () => {
			expect(ledgerAccountOperations).toBeDefined();
			expect(ledgerAccountOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(ledgerAccountFields).toBeDefined();
			expect(ledgerAccountFields.length).toBeGreaterThan(0);
		});
	});

	describe('Bank Account Description', () => {
		it('should have operations defined', () => {
			expect(bankAccountOperations).toBeDefined();
			expect(bankAccountOperations.length).toBeGreaterThan(0);
		});

		it('should have fields defined', () => {
			expect(bankAccountFields).toBeDefined();
			expect(bankAccountFields.length).toBeGreaterThan(0);
		});
	});
});
