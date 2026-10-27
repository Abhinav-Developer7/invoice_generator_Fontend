
import { useState } from "react";
import { ArrowLeft, FilePlus2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CreateInvoice.css";

export default function CreateInvoice() {
    const navigate = useNavigate();

    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: "INV-2026-0001",
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: "",
        projectId: "",
        taxRate: 0,
        discount: 0,
        notes: "",
    });

    const [items, setItems] = useState([
        { id: 1, description: "", quantity: 1, unitPrice: 0 },
    ]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setInvoiceData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleItemChange = (id, field, value) => {
        setItems((previous) =>
            previous.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const addItem = () => {
        setItems((previous) => [
            ...previous,
            {
                id: Date.now(),
                description: "",
                quantity: 1,
                unitPrice: 0,
            },
        ]);
    };

    const removeItem = (id) => {
        setItems((previous) =>
            previous.length > 1
                ? previous.filter((item) => item.id !== id)
                : previous
        );
    };

    const subtotal = items.reduce(
        (total, item) =>
            total + Number(item.quantity || 0) * Number(item.unitPrice || 0),
        0
    );

    const discountAmount = Math.min(
        subtotal,
        Math.max(0, Number(invoiceData.discount) || 0)
    );

    const taxableAmount = subtotal - discountAmount;
    const taxAmount =
        taxableAmount * (Math.max(0, Number(invoiceData.taxRate) || 0) / 100);
    const grandTotal = taxableAmount + taxAmount;

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (items.some((item) => !item.description.trim())) {
            alert("Please enter a description for every invoice item.");
            return;
        }

        alert("Invoice form is ready. Saving will be implemented next.");
    };

    return (
        <div className="create-invoice-page">
            <header className="invoice-page-header">
                <button
                    type="button"
                    className="invoice-back-button"
                    onClick={() => navigate("/projects")}
                >
                    <ArrowLeft size={16} />
                    Back to Projects
                </button>

                <h1>Create Invoice</h1>
                <p>Create a new invoice for your project.</p>
            </header>

            <form className="invoice-form" onSubmit={handleSubmit}>
                <section className="invoice-section">
                    <div className="invoice-section-heading">
                        <FilePlus2 size={20} />
                        <div>
                            <h2>Invoice Details</h2>
                            <p>Enter the basic invoice information.</p>
                        </div>
                    </div>

                    <div className="invoice-form-grid">
                        <div className="invoice-field">
                            <label htmlFor="invoiceNumber">Invoice Number</label>
                            <input
                                id="invoiceNumber"
                                value={invoiceData.invoiceNumber}
                                readOnly
                            />
                            <small>Generated automatically</small>
                        </div>

                        <div className="invoice-field">
                            <label htmlFor="projectId">Project</label>
                            <select
                                id="projectId"
                                name="projectId"
                                value={invoiceData.projectId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a project</option>
                            </select>
                            <small>Project options will be connected next.</small>
                        </div>

                        <div className="invoice-field">
                            <label htmlFor="issueDate">Issue Date</label>
                            <input
                                id="issueDate"
                                type="date"
                                name="issueDate"
                                value={invoiceData.issueDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="invoice-field">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                id="dueDate"
                                type="date"
                                name="dueDate"
                                value={invoiceData.dueDate}
                                onChange={handleChange}
                                min={invoiceData.issueDate}
                                required
                            />
                        </div>
                    </div>
                </section>

                <section className="invoice-section">
                    <div className="invoice-section-heading invoice-items-heading">
                        <div>
                            <h2>Invoice Items</h2>
                            <p>Add products or services to this invoice.</p>
                        </div>

                        <button
                            type="button"
                            className="invoice-secondary-button"
                            onClick={addItem}
                        >
                            <Plus size={16} />
                            Add Item
                        </button>
                    </div>

                    <div className="invoice-items-list">
                        {items.map((item, index) => (
                            <div className="invoice-item-row" key={item.id}>
                                <div className="invoice-field invoice-description-field">
                                    <label htmlFor={`description-${item.id}`}>
                                        Description {index + 1}
                                    </label>
                                    <input
                                        id={`description-${item.id}`}
                                        value={item.description}
                                        onChange={(event) =>
                                            handleItemChange(
                                                item.id,
                                                "description",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Product or service"
                                        required
                                    />
                                </div>


                                <div className="invoice-field">
                                    <label htmlFor={`price-${item.id}`}>Unit Price (₹)</label>
                                    <input
                                        id={`price-${item.id}`}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={item.unitPrice}
                                        onChange={(event) =>
                                            handleItemChange(
                                                item.id,
                                                "unitPrice",
                                                event.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="invoice-item-total">
                                    <span>Amount</span>
                                    <strong>
                                        {formatCurrency(
                                            Number(item.quantity || 0) *
                                            Number(item.unitPrice || 0)
                                        )}
                                    </strong>
                                </div>

                                <button
                                    type="button"
                                    className="invoice-remove-item"
                                    onClick={() => removeItem(item.id)}
                                    disabled={items.length === 1}
                                    aria-label={`Remove item ${index + 1}`}
                                    title="Remove item"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="invoice-section invoice-summary-section">
                    <h2>Invoice Summary</h2>

                    <div className="invoice-summary-fields">
                        <div className="invoice-field">
                            <label htmlFor="discount">Discount (₹)</label>
                            <input
                                id="discount"
                                type="number"
                                name="discount"
                                min="0"
                                max={subtotal}
                                step="0.01"
                                value={invoiceData.discount}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="invoice-field">
                            <label htmlFor="taxRate">Tax Rate (%)</label>
                            <input
                                id="taxRate"
                                type="number"
                                name="taxRate"
                                min="0"
                                step="0.01"
                                value={invoiceData.taxRate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="invoice-totals">
                        <div>
                            <span>Subtotal</span>
                            <strong>{formatCurrency(subtotal)}</strong>
                        </div>
                        <div>
                            <span>Discount</span>
                            <strong>- {formatCurrency(discountAmount)}</strong>
                        </div>
                        <div>
                            <span>Tax</span>
                            <strong>{formatCurrency(taxAmount)}</strong>
                        </div>
                        <div className="invoice-grand-total">
                            <span>Grand Total</span>
                            <strong>{formatCurrency(grandTotal)}</strong>
                        </div>
                    </div>

                    <div className="invoice-field invoice-notes-field">
                        <label htmlFor="notes">Notes (Optional)</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={invoiceData.notes}
                            onChange={handleChange}
                            placeholder="Add any additional information..."
                            rows="3"
                        />
                    </div>
                </section>

                <div className="invoice-form-actions">
                    <button
                        type="button"
                        className="invoice-secondary-button"
                        onClick={() => navigate("/projects")}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="invoice-primary-button">
                        Create Invoice
                    </button>
                </div>
            </form>
        </div >
    );
}
