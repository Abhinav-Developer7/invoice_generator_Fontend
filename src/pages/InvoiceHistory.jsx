
import { useState } from "react";
import {
    Search,
    Eye,
    Download,
    Printer,
    FileText,
    CalendarDays,
} from "lucide-react";
import "./InvoiceHistory.css";

const sampleInvoices = [
    {
        id: 1,
        invoiceNumber: "INV-2026-0001",
        projectName: "Website Development",
        companyName: "Acme Technologies",
        issueDate: "2026-10-10",
        dueDate: "2026-10-25",
        amount: 25000,
        status: "Paid",
    },
    {
        id: 2,
        invoiceNumber: "INV-2026-0002",
        projectName: "Mobile App Design",
        companyName: "Nova Solutions",
        issueDate: "2026-10-15",
        dueDate: "2026-10-30",
        amount: 18000,
        status: "Pending",
    },
    {
        id: 3,
        invoiceNumber: "INV-2026-0003",
        projectName: "E-commerce Platform",
        companyName: "Bright Retail",
        issueDate: "2026-10-01",
        dueDate: "2026-10-15",
        amount: 42000,
        status: "Overdue",
    },
    {
        id: 4,
        invoiceNumber: "INV-2026-0004",
        projectName: "Portfolio Website",
        companyName: "Pixel Studio",
        issueDate: "2026-10-20",
        dueDate: "2026-11-04",
        amount: 12000,
        status: "Draft",
    },
];

export default function InvoiceHistory() {
    const [invoices] = useState(sampleInvoices);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(amount);

    const formatDate = (date) =>
        new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesSearch = [
            invoice.invoiceNumber,
            invoice.projectName,
            invoice.companyName,
        ].some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesStatus =
            statusFilter === "All" || invoice.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusClass = (status) =>
        `invoice-status invoice-status-${status.toLowerCase()}`;

    return (
        <div className="invoice-history-page">
            <header className="history-page-header">
                <div>
                    <h1>Invoice History</h1>
                    <p>View and manage all your invoices in one place.</p>
                </div>
            </header>

            <section className="history-summary-grid">
                <article className="history-summary-card">
                    <div className="history-summary-icon">
                        <FileText size={20} />
                    </div>
                    <span>Total Invoices</span>
                    <strong>{invoices.length}</strong>
                </article>

                <article className="history-summary-card">
                    <div className="history-summary-icon">
                        <CalendarDays size={20} />
                    </div>
                    <span>Paid Invoices</span>
                    <strong>
                        {invoices.filter((invoice) => invoice.status === "Paid").length}
                    </strong>
                </article>

                <article className="history-summary-card">
                    <div className="history-summary-icon">
                        <FileText size={20} />
                    </div>
                    <span>Pending Invoices</span>
                    <strong>
                        {invoices.filter((invoice) => invoice.status === "Pending").length}
                    </strong>
                </article>

                <article className="history-summary-card">
                    <div className="history-summary-icon">
                        <CalendarDays size={20} />
                    </div>
                    <span>Overdue Invoices</span>
                    <strong>
                        {invoices.filter((invoice) => invoice.status === "Overdue").length}
                    </strong>
                </article>
            </section>

            <section className="history-table-section">
                <div className="history-table-header">
                    <div>
                        <h2>All Invoices</h2>
                        <p>{filteredInvoices.length} invoices found</p>
                    </div>

                    <div className="history-filters">
                        <div className="history-search">
                            <Search size={17} />
                            <input
                                type="search"
                                placeholder="Search invoices..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                aria-label="Search invoices"
                            />
                        </div>

                        <select
                            className="history-status-filter"
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            aria-label="Filter by invoice status"
                        >
                            <option value="All">All statuses</option>
                            <option value="Draft">Draft</option>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>
                </div>

                <div className="history-table-wrapper">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Project / Company</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredInvoices.length > 0 ? (
                                filteredInvoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td>
                                            <span className="history-invoice-number">
                                                {invoice.invoiceNumber}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="history-project-info">
                                                <strong>{invoice.projectName}</strong>
                                                <span>{invoice.companyName}</span>
                                            </div>
                                        </td>

                                        <td>{formatDate(invoice.issueDate)}</td>
                                        <td>{formatDate(invoice.dueDate)}</td>

                                        <td className="history-amount">
                                            {formatCurrency(invoice.amount)}
                                        </td>

                                        <td>
                                            <span className={getStatusClass(invoice.status)}>
                                                {invoice.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="history-actions">
                                                <button
                                                    type="button"
                                                    aria-label={`View ${invoice.invoiceNumber}`}
                                                    title="View invoice"
                                                    onClick={() =>
                                                        alert(`Viewing ${invoice.invoiceNumber} will be implemented later.`)
                                                    }
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    aria-label={`Download ${invoice.invoiceNumber}`}
                                                    title="Download invoice"
                                                    onClick={() =>
                                                        alert("Invoice download will be implemented later.")
                                                    }
                                                >
                                                    <Download size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    aria-label={`Print ${invoice.invoiceNumber}`}
                                                    title="Print invoice"
                                                    onClick={() =>
                                                        alert("Invoice printing will be implemented later.")
                                                    }
                                                >
                                                    <Printer size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="history-empty-state">
                                        <FileText size={28} />
                                        <strong>No invoices found</strong>
                                        <span>Try changing your search or status filter.</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
