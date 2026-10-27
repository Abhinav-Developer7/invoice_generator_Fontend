
import { useState } from "react";
import {
    Building2,
    FileText,
    CreditCard,
    Save,
    RotateCcw,
} from "lucide-react";
import "./Settings.css";

const initialSettings = {
    companyName: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    invoicePrefix: "INV",
    defaultCurrency: "INR",
    paymentTerms: "15",
    defaultTaxRate: "0",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
};

export default function SettingsPage() {
    const [settings, setSettings] = useState(initialSettings);
    const [saved, setSaved] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setSettings((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSaved(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSaved(true);

        alert(
            "Settings validated in the frontend. Permanent saving will be implemented with the backend."
        );
    };

    const handleReset = () => {
        setSettings(initialSettings);
        setSaved(false);
    };

    return (
        <div className="settings-page">
            <header className="settings-page-header">
                <div>
                    <h1>Settings</h1>
                    <p>
                        Manage your company information and invoice preferences.
                    </p>
                </div>
            </header>

            <form className="settings-form" onSubmit={handleSubmit}>
                {/* Company Details */}
                <section className="settings-section">
                    <div className="settings-section-header">
                        <div className="settings-section-icon">
                            <Building2 size={20} />
                        </div>

                        <div>
                            <h2>Company Details</h2>
                            <p>Information displayed on your invoices.</p>
                        </div>
                    </div>

                    <div className="settings-fields-grid">
                        <div className="settings-field">
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                id="companyName"
                                name="companyName"
                                value={settings.companyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                required
                            />
                        </div>

                        <div className="settings-field">
                            <label htmlFor="email">Company Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={settings.email}
                                onChange={handleChange}
                                placeholder="company@example.com"
                            />
                        </div>

                        <div className="settings-field">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={settings.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div className="settings-field">
                            <label htmlFor="gstNumber">GST Number</label>
                            <input
                                id="gstNumber"
                                name="gstNumber"
                                value={settings.gstNumber}
                                onChange={handleChange}
                                placeholder="Enter GSTIN (if applicable)"
                            />
                        </div>

                        <div className="settings-field settings-field-full">
                            <label htmlFor="address">Company Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                placeholder="Enter your complete company address"
                                rows={3}
                            />
                        </div>
                    </div>
                </section>

                {/* Invoice Preferences */}
                <section className="settings-section">
                    <div className="settings-section-header">
                        <div className="settings-section-icon">
                            <FileText size={20} />
                        </div>

                        <div>
                            <h2>Invoice Preferences</h2>
                            <p>Configure default values for new invoices.</p>
                        </div>
                    </div>

                    <div className="settings-fields-grid">
                        <div className="settings-field">
                            <label htmlFor="invoicePrefix">Invoice Prefix</label>
                            <input
                                id="invoicePrefix"
                                name="invoicePrefix"
                                value={settings.invoicePrefix}
                                onChange={handleChange}
                                placeholder="INV"
                                required
                            />
                            <span className="settings-field-hint">
                                Example: INV-2026-0001
                            </span>
                        </div>

                        <div className="settings-field">
                            <label htmlFor="defaultCurrency">Currency</label>
                            <select
                                id="defaultCurrency"
                                name="defaultCurrency"
                                value={settings.defaultCurrency}
                                onChange={handleChange}
                            >
                                <option value="INR">INR — Indian Rupee</option>
                                <option value="USD">USD — US Dollar</option>
                                <option value="EUR">EUR — Euro</option>
                                <option value="GBP">GBP — British Pound</option>
                            </select>
                        </div>

                        <div className="settings-field">
                            <label htmlFor="paymentTerms">Payment Terms</label>
                            <select
                                id="paymentTerms"
                                name="paymentTerms"
                                value={settings.paymentTerms}
                                onChange={handleChange}
                            >
                                <option value="0">Due immediately</option>
                                <option value="7">7 days</option>
                                <option value="15">15 days</option>
                                <option value="30">30 days</option>
                                <option value="45">45 days</option>
                                <option value="60">60 days</option>
                            </select>
                        </div>

                        <div className="settings-field">
                            <label htmlFor="defaultTaxRate">
                                Default Tax Rate (%)
                            </label>
                            <input
                                id="defaultTaxRate"
                                name="defaultTaxRate"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={settings.defaultTaxRate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </section>

                {/* Payment Details */}
                <section className="settings-section">
                    <div className="settings-section-header">
                        <div className="settings-section-icon">
                            <CreditCard size={20} />
                        </div>

                        <div>
                            <h2>Payment Details</h2>
                            <p>Bank details that can appear on your invoices.</p>
                        </div>
                    </div>

                    <div className="settings-fields-grid">
                        <div className="settings-field">
                            <label htmlFor="accountHolder">Account Holder Name</label>
                            <input
                                id="accountHolder"
                                name="accountHolder"
                                value={settings.accountHolder}
                                onChange={handleChange}
                                placeholder="Enter account holder name"
                            />
                        </div>

                        <div className="settings-field">
                            <label htmlFor="bankName">Bank Name</label>
                            <input
                                id="bankName"
                                name="bankName"
                                value={settings.bankName}
                                onChange={handleChange}
                                placeholder="Enter bank name"
                            />
                        </div>

                        <div className="settings-field">
                            <label htmlFor="accountNumber">Account Number</label>
                            <input
                                id="accountNumber"
                                name="accountNumber"
                                value={settings.accountNumber}
                                onChange={handleChange}
                                placeholder="Enter account number"
                            />
                        </div>

                        <div className="settings-field">
                            <label htmlFor="ifscCode">IFSC Code</label>
                            <input
                                id="ifscCode"
                                name="ifscCode"
                                value={settings.ifscCode}
                                onChange={handleChange}
                                placeholder="Enter IFSC code"
                            />
                        </div>
                    </div>
                </section>

                {/* Form Actions */}
                <div className="settings-form-actions">
                    <button
                        type="button"
                        className="settings-reset-button"
                        onClick={handleReset}
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>

                    <button type="submit" className="settings-save-button">
                        <Save size={16} />
                        Save Settings
                    </button>
                </div>

                {saved && (
                    <p className="settings-save-message" role="status">
                        Form submitted. Permanent saving will be available after backend
                        integration.
                    </p>
                )}
            </form>
        </div>
    );
}
