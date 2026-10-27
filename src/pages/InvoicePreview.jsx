
import { ArrowLeft, Printer, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./InvoicePreview.css";

export default function InvoicePreview() {
    const navigate = useNavigate();

    // Temporary sample invoice data.
    // We will connect this to saved invoices later.
    const invoice = {
        invoiceNumber: "INV-2026-0001",
        issueDate: "27 Oct 2026",
        dueDate: "11 Nov 2026",
        company: {
            name: "Your Company Name",
            email: "hello@yourcompany.com",
            phone: "+91 98765 43210",
            address: "Thrissur, Kerala, India",
            gstNumber: "GSTIN (if applicable)",
        },
        customer: {
            name: "Acme Technologies",
            contact: "Project Contact",
            email: "accounts@acme.com",
            address: "Bengaluru, Karnataka, India",
        },
        projectName: "Website Development",
        items: [
            {
                id: 1,
                description: "Website UI/UX Design",
                quantity: 1,
                rate: 10000,
            },
            {
                id: 2,
                description: "Frontend Development",
                quantity: 1,
                rate: 15000,
            },
        ],
        taxRate: 18,
        discount: 1000,
        notes: "Thank you for your business.",
        paymentTerms: "Payment due within 15 days.",
        bankName: "Your Bank Name",
        accountHolder: "Your Company Name",
        accountNumber: "XXXX XXXX XXXX",
        ifscCode: "YOUR0001234",
    };

    const subtotal = invoice.items.reduce(
        (total, item) => total + item.quantity * item.rate,
        0
    );

    const discountAmount = invoice.discount;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = (taxableAmount * invoice.taxRate) / 100;
    const grandTotal = taxableAmount + taxAmount;

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(amount);

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="invoice-preview-page">
            <header className="preview-toolbar">
                <button
                    type="button"
                    className="preview-back-button"
                    onClick={() => navigate("/invoice-history")}
                >
                    <ArrowLeft size={17} />
                    Back to Invoice History
                </button>

                <div className="preview-toolbar-actions">
                    <button
                        type="button"
                        className="preview-print-button"
                        onClick={() => window.print()}
                    >
                        <Printer size={16} />
                        Print
                    </button>

                    <button
                        type="button"
                        className="preview-download-button"
                        onClick={handleDownload}
                    >
                        <Download size={16} />
                        Download PDF
                    </button>
                </div>
            </header>

            <main className="invoice-paper">
                <div className="invoice-paper-header">
                    <div className="preview-company">

                        <div className="preview-company-mark">
                            <img src="/company-logo.png" alt="Company logo" />
                        </div>


                        <div>
                            <h1>{invoice.company.name}</h1>
                            <p>{invoice.company.address}</p>
                            <p>{invoice.company.email}</p>
                            <p>{invoice.company.phone}</p>
                            <p>{invoice.company.gstNumber}</p>
                        </div>
                    </div>

                    <div className="preview-invoice-title">
                        <span>INVOICE</span>
                        <h2>{invoice.invoiceNumber}</h2>
                        <span className="preview-status">Draft Preview</span>
                    </div>
                </div>

                <div className="preview-divider" />

                <section className="preview-parties">
                    <div className="preview-bill-to">
                        <span className="preview-label">BILL TO</span>
                        <h3>{invoice.customer.name}</h3>
                        <p>{invoice.customer.contact}</p>
                        <p>{invoice.customer.email}</p>
                        <p>{invoice.customer.address}</p>
                    </div>

                    <div className="preview-invoice-details">
                        <div>
                            <span>Issue Date</span>
                            <strong>{invoice.issueDate}</strong>
                        </div>

                        <div>
                            <span>Due Date</span>
                            <strong>{invoice.dueDate}</strong>
                        </div>

                        <div>
                            <span>Project</span>
                            <strong>{invoice.projectName}</strong>
                        </div>
                    </div>
                </section>

                <section className="preview-items-section">
                    <table className="preview-items-table">
                        <thead>
                            <tr>
                                <th className="preview-item-number">#</th>
                                <th>Description</th>
                                {/* <th className="preview-number-cell">Qty</th> */}
                                <th className="preview-number-cell">Rate</th>
                                <th className="preview-number-cell">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoice.items.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="preview-item-number">{index + 1}</td>
                                    <td className="preview-item-description">
                                        {item.description}
                                    </td>
                                    {/* <td className="preview-number-cell">{item.quantity}</td> */}
                                    <td className="preview-number-cell">
                                        {formatCurrency(item.rate)}
                                    </td>
                                    <td className="preview-number-cell preview-item-amount">
                                        {formatCurrency(item.quantity * item.rate)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="preview-summary">
                    <div className="preview-notes">
                        <h3>Notes</h3>
                        <p>{invoice.notes}</p>
                        <p>{invoice.paymentTerms}</p>
                    </div>

                    <div className="preview-totals">
                        <div>
                            <span>Subtotal</span>
                            <strong>{formatCurrency(subtotal)}</strong>
                        </div>

                        <div>
                            <span>Discount</span>
                            <strong>- {formatCurrency(discountAmount)}</strong>
                        </div>

                        <div>
                            <span>Tax ({invoice.taxRate}%)</span>
                            <strong>{formatCurrency(taxAmount)}</strong>
                        </div>

                        <div className="preview-grand-total">
                            <span>Total</span>
                            <strong>{formatCurrency(grandTotal)}</strong>
                        </div>
                    </div>
                </section>

                <section className="preview-payment-details">
                    <h3>Payment Information</h3>

                    <div>
                        <p>
                            <span>Bank</span>
                            <strong>{invoice.bankName}</strong>
                        </p>

                        <p>
                            <span>Account Holder</span>
                            <strong>{invoice.accountHolder}</strong>
                        </p>

                        <p>
                            <span>Account Number</span>
                            <strong>{invoice.accountNumber}</strong>
                        </p>

                        <p>
                            <span>IFSC Code</span>
                            <strong>{invoice.ifscCode}</strong>
                        </p>
                    </div>
                </section>

                <footer className="preview-footer">
                    <p>Thank you for your business.</p>
                </footer>
            </main >
        </div >
    );
}
