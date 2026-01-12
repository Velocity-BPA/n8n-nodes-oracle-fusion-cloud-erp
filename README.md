# n8n-nodes-oracle-fusion-cloud-erp

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Oracle Fusion Cloud ERP that enables workflow automation for financials, accounts payable, accounts receivable, general ledger, procurement, and project management through Oracle Fusion REST APIs with OAuth 2.0 and Basic authentication.

![n8n](https://img.shields.io/badge/n8n-community--node-ff6d5a)
![Oracle Cloud](https://img.shields.io/badge/Oracle-Fusion%20Cloud%20ERP-f80000)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **12 Resource Categories** - Complete coverage of Oracle Fusion Cloud ERP modules
- **96+ Operations** - Comprehensive CRUD and business operations
- **OAuth 2.0 & Basic Auth** - Flexible authentication options
- **Polling Trigger** - Event-based automation with 12 event types
- **Pagination Support** - Automatic handling of large datasets
- **OData Query Support** - Advanced filtering, sorting, and field selection
- **Enterprise-Ready** - Production-tested error handling and logging

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter: `n8n-nodes-oracle-fusion-cloud-erp`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-oracle-fusion-cloud-erp
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-oracle-fusion-cloud-erp.git
cd n8n-nodes-oracle-fusion-cloud-erp

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-oracle-fusion-cloud-erp

# Restart n8n
n8n start
```

## Credentials Setup

### Oracle Fusion Cloud ERP API Credentials

| Field | Description | Required |
|-------|-------------|----------|
| **Instance URL** | Oracle Fusion instance URL (e.g., `https://efxw.fa.us2.oraclecloud.com`) | Yes |
| **Authentication Type** | `OAuth2` or `Basic` | Yes |
| **IDCS URL** | Identity Cloud Service URL (OAuth2 only) | Conditional |
| **Client ID** | OAuth2 Client ID | Conditional |
| **Client Secret** | OAuth2 Client Secret | Conditional |
| **Username** | Basic Auth username | Conditional |
| **Password** | Basic Auth password | Conditional |
| **API Version** | API version (default: `11.13.18.05`) | No |

### OAuth 2.0 Setup (Recommended)

1. Log in to Oracle Identity Cloud Service (IDCS)
2. Create a new **Confidential Application**
3. Configure client credentials grant
4. Note the Client ID and Client Secret
5. Add required scopes: `urn:opc:resource:consumer::all`
6. Enter credentials in n8n

### Basic Authentication Setup

1. Create an API-enabled user in Oracle Fusion
2. Grant appropriate roles and privileges
3. Enter username and password in n8n

## Resources & Operations

### Suppliers (Vendors)
Manage supplier master data and relationships.

| Operation | Description |
|-----------|-------------|
| `create` | Create a new supplier |
| `get` | Retrieve supplier by ID |
| `getAll` | List suppliers with filtering |
| `update` | Update supplier information |
| `getContacts` | Get supplier contacts |
| `createContact` | Add supplier contact |
| `getSites` | Get supplier sites/addresses |
| `createSite` | Add supplier site |
| `getPaymentMethods` | Get payment methods |
| `getBankAccounts` | Get bank accounts |

### Payables Invoices
Process accounts payable invoices end-to-end.

| Operation | Description |
|-----------|-------------|
| `create` | Create AP invoice |
| `get` | Retrieve invoice by ID |
| `getAll` | List invoices with filtering |
| `update` | Update invoice header |
| `delete` | Cancel/delete invoice |
| `createLine` | Add invoice line |
| `updateLine` | Update invoice line |
| `deleteLine` | Remove invoice line |
| `validate` | Validate invoice for payment |
| `approve` | Submit for approval |
| `hold` | Place invoice on hold |
| `releaseHold` | Release from hold |
| `getPayments` | Get payment status |
| `getDistributions` | Get GL distributions |

### Payments
Manage payment processing and disbursements.

| Operation | Description |
|-----------|-------------|
| `get` | Retrieve payment by ID |
| `getAll` | List payments with filtering |
| `getPaymentDocuments` | Get payment documents |
| `void` | Void a payment |
| `stop` | Stop payment |
| `getRemittances` | Get remittance details |

### Receivables Invoices
Handle accounts receivable billing.

| Operation | Description |
|-----------|-------------|
| `create` | Create AR invoice |
| `get` | Retrieve invoice by ID |
| `getAll` | List AR invoices |
| `update` | Update invoice |
| `createLine` | Add invoice line |
| `updateLine` | Update invoice line |
| `deleteLine` | Remove invoice line |
| `complete` | Complete the invoice |
| `getReceipts` | Get applied receipts |
| `getSchedules` | Get payment schedules |

### Receipts (Cash Receipts)
Process cash receipt applications.

| Operation | Description |
|-----------|-------------|
| `create` | Create AR receipt |
| `get` | Retrieve receipt by ID |
| `getAll` | List receipts |
| `update` | Update receipt |
| `apply` | Apply to invoices |
| `unapply` | Unapply from invoices |
| `reverse` | Reverse receipt |
| `getApplications` | Get receipt applications |

### General Ledger Journals
Manage journal entries and GL postings.

| Operation | Description |
|-----------|-------------|
| `create` | Create journal batch |
| `get` | Retrieve journal by ID |
| `getAll` | List journals |
| `update` | Update journal |
| `createLine` | Add journal line |
| `updateLine` | Update journal line |
| `deleteLine` | Remove journal line |
| `post` | Post journal to GL |
| `reverse` | Reverse posted journal |
| `getBalances` | Get account balances |

### Customers
Manage customer master data.

| Operation | Description |
|-----------|-------------|
| `create` | Create customer account |
| `get` | Retrieve customer by ID |
| `getAll` | List customers |
| `update` | Update customer |
| `getSites` | Get customer sites |
| `createSite` | Add customer site |
| `getContacts` | Get contacts |
| `getAccounts` | Get customer accounts |
| `getBalances` | Get customer balances |

### Purchase Orders
Process procurement orders.

| Operation | Description |
|-----------|-------------|
| `create` | Create purchase order |
| `get` | Retrieve PO by ID |
| `getAll` | List purchase orders |
| `update` | Update PO header |
| `createLine` | Add PO line |
| `updateLine` | Update PO line |
| `deleteLine` | Remove PO line |
| `submit` | Submit for approval |
| `approve` | Approve PO |
| `cancel` | Cancel PO |
| `close` | Close PO |
| `getReceipts` | Get related receipts |

### Purchase Requisitions
Manage purchase request workflows.

| Operation | Description |
|-----------|-------------|
| `create` | Create requisition |
| `get` | Retrieve by ID |
| `getAll` | List requisitions |
| `update` | Update requisition |
| `createLine` | Add requisition line |
| `submit` | Submit for approval |
| `approve` | Approve requisition |
| `return` | Return for resubmission |
| `cancel` | Cancel requisition |
| `convertToPO` | Convert to purchase order |

### Projects
Manage project portfolio data.

| Operation | Description |
|-----------|-------------|
| `create` | Create project |
| `get` | Retrieve project by ID |
| `getAll` | List projects |
| `update` | Update project |
| `getTasks` | Get project tasks |
| `createTask` | Add project task |
| `getTeamMembers` | Get team members |
| `addTeamMember` | Add team member |
| `getBudget` | Get project budget |
| `getActuals` | Get project actuals |
| `getExpenditures` | Get expenditures |

### Ledger Accounts
Access chart of accounts and balances.

| Operation | Description |
|-----------|-------------|
| `get` | Retrieve account by ID |
| `getAll` | List GL accounts |
| `getBalances` | Get account balances by period |
| `getTransactions` | Get account transactions |
| `getCodeCombinations` | Get code combinations |

### Bank Accounts
Manage bank account information.

| Operation | Description |
|-----------|-------------|
| `get` | Retrieve by ID |
| `getAll` | List bank accounts |
| `getBalances` | Get bank balances |
| `getStatements` | Get bank statements |
| `getTransactions` | Get bank transactions |
| `reconcile` | Reconcile transactions |

## Trigger Node

The **Oracle Fusion Cloud ERP Trigger** node enables event-based workflow automation using polling.

### Supported Events

| Event | Description |
|-------|-------------|
| `supplier.created` | New supplier created |
| `supplier.updated` | Supplier modified |
| `invoice.created` | AP Invoice created |
| `invoice.validated` | AP Invoice validated |
| `invoice.paid` | AP Invoice paid |
| `payment.created` | Payment created |
| `receipt.applied` | AR Receipt applied |
| `journal.posted` | GL Journal posted |
| `customer.created` | Customer created |
| `purchaseOrder.approved` | PO approved |
| `requisition.approved` | Requisition approved |
| `project.created` | Project created |

### Configuration

| Field | Description |
|-------|-------------|
| **Event** | Select the event type to monitor |
| **Poll Interval** | How frequently to check for new events |
| **Filters** | Optional OData filters to limit results |

## Usage Examples

### Create an AP Invoice

```javascript
// Oracle Fusion Cloud ERP Node Configuration
{
  "resource": "payablesInvoice",
  "operation": "create",
  "invoiceNum": "INV-2024-001",
  "vendorId": 300100123456789,
  "vendorSiteId": 300100123456790,
  "invoiceAmount": 1500.00,
  "invoiceDate": "2024-01-15",
  "invoiceType": "Standard",
  "description": "Office Supplies - January"
}
```

### Query Suppliers with Filters

```javascript
// Get all active suppliers
{
  "resource": "supplier",
  "operation": "getAll",
  "returnAll": true,
  "filters": {
    "Status": "ACTIVE",
    "SupplierType": "VENDOR"
  }
}
```

### Post a Journal Entry

```javascript
// Create and post a GL journal
{
  "resource": "journal",
  "operation": "create",
  "name": "Month-End Adjustments",
  "journalCategory": "Adjustment",
  "accountingPeriod": "Jan-24",
  "lines": [
    {
      "accountNumber": "01-000-1200-0000-000",
      "debitAmount": 5000.00
    },
    {
      "accountNumber": "01-000-4100-0000-000",
      "creditAmount": 5000.00
    }
  ]
}
```

## Oracle Fusion Cloud ERP Concepts

### Instance URL Structure
Oracle Fusion Cloud uses a specific URL pattern:
- Format: `https://{pod}.fa.{datacenter}.oraclecloud.com`
- Example: `https://efxw.fa.us2.oraclecloud.com`

### API Versioning
- Default version: `11.13.18.05`
- Latest version: `11.14.25.01`
- Version is part of the API path: `/fscmRestApi/resources/{version}/`

### OData Query Support
Oracle Fusion REST APIs support OData-style querying:
- `$filter`: Filter results (e.g., `Status eq 'ACTIVE'`)
- `$select`: Choose fields to return
- `$orderby`: Sort results
- `$expand`: Include related resources
- `$top` / `$skip`: Pagination

### Pagination
- Offset-based pagination with `offset` and `limit` parameters
- Maximum 500 records per request
- Response includes `hasMore` flag and `totalResults` count

## Data Centers

| Region | Data Center Code | Example URL |
|--------|------------------|-------------|
| US West | us2 | `*.fa.us2.oraclecloud.com` |
| US East | us6 | `*.fa.us6.oraclecloud.com` |
| EMEA | em2 | `*.fa.em2.oraclecloud.com` |
| APAC | ap1 | `*.fa.ap1.oraclecloud.com` |

## Error Handling

The node handles Oracle Fusion error responses automatically:

```json
{
  "type": "http://xmlns.oracle.com/adf/svc/errors/",
  "title": "Bad Request",
  "status": 400,
  "o:errorCode": "APXIIMPT-470108",
  "detail": "The supplier site is not valid for the supplier."
}
```

### Common Error Codes

| Code | Meaning |
|------|---------|
| 400 | Validation error or malformed request |
| 401 | Invalid credentials or expired token |
| 403 | Insufficient privileges |
| 404 | Resource not found |
| 409 | Concurrent update conflict |
| 429 | Rate limit exceeded |
| 500 | Server-side error |

## Security Best Practices

1. **Use OAuth 2.0** - Preferred over Basic Authentication for production
2. **Limit Scopes** - Request only necessary API scopes
3. **Rotate Credentials** - Regularly rotate OAuth client secrets
4. **Use Service Accounts** - Create dedicated API users with minimal privileges
5. **Enable Audit Logging** - Monitor API access in Oracle Fusion
6. **Secure Storage** - Store credentials in n8n's encrypted credential store

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run dev
```

## Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm test -- --testPathPattern=unit

# Run integration tests (requires credentials)
npm test -- --testPathPattern=integration

# Generate coverage report
npm run test:coverage
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)
- Email: [licensing@velobpa.com](mailto:licensing@velobpa.com)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1 (BSL 1.1)**.

### Free Use
Permitted for:
- Personal use
- Educational use
- Research use
- Internal business use

### Commercial Use
Commercial or production use by for-profit organizations requires a commercial license from Velocity BPA.

Commercial Use includes:
- Use within any SaaS, PaaS, or hosted application
- Offering as part of a managed services engagement
- Bundling or redistributing with a paid product
- Embedding into any commercial automation platform

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for complete details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure all contributions comply with the BSL 1.1 license terms.

## Support

- **Documentation**: [GitHub Wiki](https://github.com/Velocity-BPA/n8n-nodes-oracle-fusion-cloud-erp/wiki)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-oracle-fusion-cloud-erp/issues)
- **Oracle Docs**: [Oracle Fusion Cloud REST API](https://docs.oracle.com/en/cloud/saas/financials/24b/farfa/)

## Acknowledgments

- [n8n](https://n8n.io) - Workflow automation platform
- [Oracle](https://www.oracle.com) - Oracle Fusion Cloud ERP platform
- The n8n community for feedback and contributions
