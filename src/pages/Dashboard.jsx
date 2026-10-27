import { useState, useMemo } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  Plus,
  Briefcase,
  ReceiptText,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  SearchX,
} from 'lucide-react'
import { INITIAL_INVOICES, SUMMARY_STATS } from '../data/mockData.js'
import './Dashboard.css'

// Currency formatter for Indian Rupee (INR)
const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function Dashboard() {
  const navigate = useNavigate()
  // Retrieve search query and updater from layout context
  const { searchQuery = '', setSearchQuery } = useOutletContext() || {}
  const [statusFilter, setStatusFilter] = useState('all')
  const [invoices] = useState(INITIAL_INVOICES)

  // Filter invoices based on searchQuery and statusFilter
  const filteredInvoices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return invoices.filter((inv) => {
      const matchesQuery =
        !query ||
        inv.id.toLowerCase().includes(query) ||
        inv.clientName.toLowerCase().includes(query) ||
        inv.project.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'all' ||
        inv.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesQuery && matchesStatus
    })
  }, [invoices, searchQuery, statusFilter])

  return (
    <div className="dashboard-content-area">
      {/* Dashboard Heading Section */}
      <section className="dashboard-header" aria-labelledby="dashboard-title">
        <div className="dashboard-heading-group">
          <h1 id="dashboard-title" className="dashboard-title">
            Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        <div className="dashboard-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/create-invoice')}
          >
            <Plus size={16} aria-hidden="true" />
            <span>Create Invoice</span>
          </button>
        </div>
      </section>

      {/* Summary Cards Grid */}
      <section
        className="summary-cards-grid"
        aria-label="Business Metrics Overview"
      >
        {/* Card 1: Total Projects */}
        <div className="summary-card">
          <div className="card-top">
            <span className="card-title">{SUMMARY_STATS.totalProjects.title}</span>
            <div className="card-icon-wrap" aria-hidden="true">
              <Briefcase className="card-icon" />
            </div>
          </div>
          <div className="card-main">
            <span className="card-metric-value">
              {SUMMARY_STATS.totalProjects.formattedValue}
            </span>
          </div>
          <div className="card-bottom">
            <span className="card-change-badge">
              {SUMMARY_STATS.totalProjects.change}
            </span>
            <span className="card-subtext">
              {SUMMARY_STATS.totalProjects.note}
            </span>
          </div>
        </div>

        {/* Card 2: Total Invoices */}
        <div className="summary-card">
          <div className="card-top">
            <span className="card-title">{SUMMARY_STATS.totalInvoices.title}</span>
            <div className="card-icon-wrap" aria-hidden="true">
              <ReceiptText className="card-icon" />
            </div>
          </div>
          <div className="card-main">
            <span className="card-metric-value">
              {SUMMARY_STATS.totalInvoices.formattedValue}
            </span>
          </div>
          <div className="card-bottom">
            <span className="card-change-badge">
              {SUMMARY_STATS.totalInvoices.change}
            </span>
            <span className="card-subtext">
              {SUMMARY_STATS.totalInvoices.note}
            </span>
          </div>
        </div>

        {/* Card 3: Revenue Collected */}
        <div className="summary-card">
          <div className="card-top">
            <span className="card-title">
              {SUMMARY_STATS.revenueCollected.title}
            </span>
            <div className="card-icon-wrap" aria-hidden="true">
              <ArrowUpRight className="card-icon" />
            </div>
          </div>
          <div className="card-main">
            <span className="card-metric-value">
              {formatINR(SUMMARY_STATS.revenueCollected.value)}
            </span>
          </div>
          <div className="card-bottom">
            <span className="card-change-badge">
              {SUMMARY_STATS.revenueCollected.change}
            </span>
            <span className="card-subtext">
              {SUMMARY_STATS.revenueCollected.note}
            </span>
          </div>
        </div>

        {/* Card 4: Outstanding Payments */}
        <div className="summary-card">
          <div className="card-top">
            <span className="card-title">
              {SUMMARY_STATS.outstandingPayments.title}
            </span>
            <div className="card-icon-wrap" aria-hidden="true">
              <Clock className="card-icon" />
            </div>
          </div>
          <div className="card-main">
            <span className="card-metric-value">
              {formatINR(SUMMARY_STATS.outstandingPayments.value)}
            </span>
          </div>
          <div className="card-bottom">
            <span className="card-change-badge">
              {SUMMARY_STATS.outstandingPayments.change}
            </span>
            <span className="card-subtext">
              {SUMMARY_STATS.outstandingPayments.note}
            </span>
          </div>
        </div>
      </section>

      {/* Recent Invoices Table Section */}
      <section
        className="invoices-section-card"
        aria-labelledby="recent-invoices-heading"
      >
        <div className="table-toolbar">
          <div className="toolbar-title-group">
            <h2 id="recent-invoices-heading" className="section-title">
              Recent Invoices
            </h2>
            <span className="record-count-badge">
              {filteredInvoices.length} of {invoices.length}
            </span>
          </div>

          <div className="toolbar-controls">
            {/* Status Filter Tabs */}
            <div
              className="status-filter-group"
              role="tablist"
              aria-label="Filter invoices by status"
            >
              {['all', 'paid', 'pending', 'overdue'].map((status) => (
                <button
                  key={status}
                  type="button"
                  role="tab"
                  aria-selected={statusFilter === status}
                  className={`filter-pill-btn ${
                    statusFilter === status ? 'active' : ''
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* View All Invoices Action */}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/invoice-history')}
            >
              <span>View All Invoices</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Table or Empty State */}
        <div className="table-responsive-wrapper">
          {filteredInvoices.length > 0 ? (
            <table className="invoices-data-table">
              <thead>
                <tr>
                  <th scope="col">Invoice Number</th>
                  <th scope="col">Client &amp; Project</th>
                  <th scope="col">Issue Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col" style={{ textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <span className="invoice-code">{invoice.id}</span>
                    </td>
                    <td>
                      <div className="client-cell">
                        <span className="client-name">
                          {invoice.clientName}
                        </span>
                        <span className="project-name">
                          {invoice.project}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="date-text">{invoice.issueDate}</span>
                    </td>
                    <td>
                      <span className="amount-text">
                        {formatINR(invoice.amount)}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="row-action-btn"
                        aria-label={`View options for invoice ${invoice.id}`}
                        title={`View invoice ${invoice.id}`}
                        onClick={() =>
                          alert(
                            `Invoice ${invoice.id} for ${invoice.clientName} (${formatINR(
                              invoice.amount
                            )}). Detailed invoice view is scheduled for the next development phase.`
                          )
                        }
                      >
                        <MoreVertical size={16} aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="table-empty-state" role="status">
              <div className="empty-icon-wrap" aria-hidden="true">
                <SearchX size={24} />
              </div>
              <h3 className="empty-title">No matching invoices found</h3>
              <p className="empty-description">
                {searchQuery
                  ? `No invoices match "${searchQuery}". Please verify the invoice number, client name, or project title.`
                  : `No invoices currently match the selected "${statusFilter}" filter status.`}
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  if (setSearchQuery) setSearchQuery('')
                  setStatusFilter('all')
                }}
              >
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// Payment Status Badge Component (Strictly Black & White visual identity)
function StatusBadge({ status }) {
  if (status === 'Paid') {
    return (
      <span className="status-badge status-paid">
        <CheckCircle2 className="status-badge-icon" aria-hidden="true" />
        <span>Paid</span>
      </span>
    )
  }

  if (status === 'Pending') {
    return (
      <span className="status-badge status-pending">
        <Clock className="status-badge-icon" aria-hidden="true" />
        <span>Pending</span>
      </span>
    )
  }

  return (
    <span className="status-badge status-overdue">
      <AlertCircle className="status-badge-icon" aria-hidden="true" />
      <span>Overdue</span>
    </span>
  )
}
