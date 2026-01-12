/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

// Oracle Fusion API Response Types
export interface IOracleFusionResponse {
	items?: IDataObject[];
	count?: number;
	hasMore?: boolean;
	limit?: number;
	offset?: number;
	totalResults?: number;
	links?: IOracleFusionLink[];
}

export interface IOracleFusionLink {
	rel: string;
	href: string;
	name?: string;
	kind?: string;
}

export interface IOracleFusionError {
	type?: string;
	title?: string;
	status?: number;
	detail?: string;
	'o:errorCode'?: string;
	'o:errorDetails'?: IOracleFusionErrorDetail[];
}

export interface IOracleFusionErrorDetail {
	'o:errorCode'?: string;
	title?: string;
	detail?: string;
}

// Supplier Types
export interface ISupplier extends IDataObject {
	SupplierId?: number;
	Supplier?: string;
	SupplierNumber?: string;
	Status?: string;
	SupplierType?: string;
	TaxOrganizationType?: string;
	TaxRegistrationNumber?: string;
	PaymentTerms?: string;
	PaymentMethod?: string;
	CreationDate?: string;
	LastUpdateDate?: string;
}

export interface ISupplierContact extends IDataObject {
	ContactId?: number;
	FirstName?: string;
	LastName?: string;
	EmailAddress?: string;
	PhoneNumber?: string;
	SupplierId?: number;
}

export interface ISupplierSite extends IDataObject {
	SupplierSiteId?: number;
	SupplierSite?: string;
	AddressLine1?: string;
	AddressLine2?: string;
	City?: string;
	State?: string;
	PostalCode?: string;
	Country?: string;
	SupplierId?: number;
}

// Invoice Types (Payables)
export interface IPayablesInvoice extends IDataObject {
	InvoiceId?: number;
	InvoiceNum?: string;
	VendorSiteId?: number;
	InvoiceAmount?: number;
	InvoiceDate?: string;
	Description?: string;
	InvoiceType?: string;
	PaymentTermsName?: string;
	PayGroup?: string;
	InvoiceStatus?: string;
	Currency?: string;
	GlDate?: string;
	CreationDate?: string;
	LastUpdateDate?: string;
}

export interface IPayablesInvoiceLine extends IDataObject {
	LineNumber?: number;
	LineAmount?: number;
	Description?: string;
	AccountingDate?: string;
	DistributionSet?: string;
	ItemDescription?: string;
	Quantity?: number;
	UnitPrice?: number;
}

// Payment Types
export interface IPayment extends IDataObject {
	PaymentId?: number;
	PaymentNumber?: string;
	PaymentDate?: string;
	PaymentAmount?: number;
	PaymentMethodCode?: string;
	BankAccountName?: string;
	PaymentStatus?: string;
	PayeeName?: string;
	PayeePartyId?: number;
	Currency?: string;
	CheckNumber?: string;
}

// Receivables Invoice Types
export interface IReceivablesInvoice extends IDataObject {
	CustomerTrxId?: number;
	TrxNumber?: string;
	TrxDate?: string;
	CustomerAccountId?: number;
	BillToCustomerNumber?: string;
	TrxClass?: string;
	Status?: string;
	Amount?: number;
	BalanceDue?: number;
	Currency?: string;
	BillToSite?: string;
	CreationDate?: string;
	LastUpdateDate?: string;
}

export interface IReceivablesInvoiceLine extends IDataObject {
	CustomerTrxLineId?: number;
	LineNumber?: number;
	Amount?: number;
	Description?: string;
	Quantity?: number;
	UnitSellingPrice?: number;
}

// Receipt Types
export interface IReceipt extends IDataObject {
	CashReceiptId?: number;
	ReceiptNumber?: string;
	ReceiptDate?: string;
	Amount?: number;
	CustomerAccountId?: number;
	ReceiptMethodId?: number;
	Status?: string;
	Currency?: string;
	Comments?: string;
	CreationDate?: string;
	LastUpdateDate?: string;
}

export interface IReceiptApplication extends IDataObject {
	ReceivableApplicationId?: number;
	CashReceiptId?: number;
	CustomerTrxId?: number;
	AmountApplied?: number;
	ApplicationDate?: string;
	Status?: string;
}

// Journal Types
export interface IJournal extends IDataObject {
	HeaderId?: number;
	Name?: string;
	JournalCategory?: string;
	JournalSource?: string;
	AccountingPeriod?: string;
	Status?: string;
	TotalDebit?: number;
	TotalCredit?: number;
	LedgerId?: number;
	Description?: string;
	CreationDate?: string;
	LastUpdateDate?: string;
}

export interface IJournalLine extends IDataObject {
	LineNumber?: number;
	AccountedDr?: number;
	AccountedCr?: number;
	Description?: string;
	CodeCombinationId?: number;
	AccountSegment?: string;
}

// Customer Types
export interface ICustomer extends IDataObject {
	PartyId?: number;
	PartyNumber?: string;
	PartyName?: string;
	CustomerAccountId?: number;
	AccountNumber?: string;
	Status?: string;
	CustomerType?: string;
	TaxRegistrationNumber?: string;
	CreationDate?: string;
	LastUpdateDate?: string;
}

export interface ICustomerSite extends IDataObject {
	PartySiteId?: number;
	LocationId?: number;
	AddressLine1?: string;
	AddressLine2?: string;
	City?: string;
	State?: string;
	PostalCode?: string;
	Country?: string;
	PartyId?: number;
}

// Purchase Order Types
export interface IPurchaseOrder extends IDataObject {
	POHeaderId?: number;
	OrderNumber?: string;
	VendorId?: number;
	VendorSiteId?: number;
	CreationDate?: string;
	Status?: string;
	TotalAmount?: number;
	Currency?: string;
	Description?: string;
	BuyerId?: number;
	LastUpdateDate?: string;
}

export interface IPurchaseOrderLine extends IDataObject {
	POLineId?: number;
	LineNumber?: number;
	ItemDescription?: string;
	Quantity?: number;
	UnitPrice?: number;
	Amount?: number;
	UnitOfMeasure?: string;
	NeedByDate?: string;
}

// Requisition Types
export interface IRequisition extends IDataObject {
	RequisitionHeaderId?: number;
	RequisitionNumber?: string;
	PreparedBy?: number;
	Status?: string;
	Description?: string;
	TotalAmount?: number;
	RequestedDeliveryDate?: string;
	CreationDate?: string;
	LastUpdateDate?: string;
}

export interface IRequisitionLine extends IDataObject {
	RequisitionLineId?: number;
	LineNumber?: number;
	ItemDescription?: string;
	Quantity?: number;
	UnitPrice?: number;
	Amount?: number;
	UnitOfMeasure?: string;
	NeedByDate?: string;
}

// Project Types
export interface IProject extends IDataObject {
	ProjectId?: number;
	ProjectNumber?: string;
	Name?: string;
	ProjectStatusCode?: string;
	StartDate?: string;
	CompletionDate?: string;
	ProjectManager?: number;
	Organization?: string;
	Description?: string;
	CreationDate?: string;
	LastUpdateDate?: string;
}

export interface IProjectTask extends IDataObject {
	TaskId?: number;
	TaskNumber?: string;
	TaskName?: string;
	StartDate?: string;
	CompletionDate?: string;
	Status?: string;
	ProjectId?: number;
}

export interface IProjectTeamMember extends IDataObject {
	TeamMemberId?: number;
	PersonId?: number;
	PersonName?: string;
	ProjectRole?: string;
	StartDate?: string;
	EndDate?: string;
	ProjectId?: number;
}

// Ledger Account Types
export interface ILedgerAccount extends IDataObject {
	AccountId?: number;
	AccountNumber?: string;
	AccountDescription?: string;
	AccountType?: string;
	AllowPostingFlag?: string;
	SummaryFlag?: string;
	EnabledFlag?: string;
}

export interface IAccountBalance extends IDataObject {
	AccountId?: number;
	Period?: string;
	BeginningBalance?: number;
	EndingBalance?: number;
	PeriodActivity?: number;
	Currency?: string;
}

// Bank Account Types
export interface IBankAccount extends IDataObject {
	BankAccountId?: number;
	BankAccountNumber?: string;
	BankAccountName?: string;
	BankName?: string;
	BranchName?: string;
	Currency?: string;
	CurrentBalance?: number;
	Status?: string;
}

export interface IBankStatement extends IDataObject {
	StatementId?: number;
	StatementNumber?: string;
	StatementDate?: string;
	BankAccountId?: number;
	OpeningBalance?: number;
	ClosingBalance?: number;
	Status?: string;
}

// OAuth Token Response
export interface IOAuthTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string;
}

// Query Parameters
export interface IOracleFusionQueryParams extends IDataObject {
	offset?: number;
	limit?: number;
	q?: string;
	orderBy?: string;
	fields?: string;
	expand?: string;
	onlyData?: boolean;
	totalResults?: boolean;
}

// Resource Types for Node
export type OracleFusionResource =
	| 'supplier'
	| 'payablesInvoice'
	| 'payment'
	| 'receivablesInvoice'
	| 'receipt'
	| 'journal'
	| 'customer'
	| 'purchaseOrder'
	| 'requisition'
	| 'project'
	| 'ledgerAccount'
	| 'bankAccount';

// Trigger Event Types
export type OracleFusionTriggerEvent =
	| 'supplier.created'
	| 'supplier.updated'
	| 'invoice.created'
	| 'invoice.validated'
	| 'invoice.paid'
	| 'payment.created'
	| 'receipt.applied'
	| 'journal.posted'
	| 'customer.created'
	| 'purchaseOrder.approved'
	| 'requisition.approved'
	| 'project.created';
