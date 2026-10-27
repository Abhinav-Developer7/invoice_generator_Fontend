import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import {
  FolderGit2,
  FilePlus2,
  ReceiptText,
  Settings,
  ArrowLeft,
  HelpCircle,
} from 'lucide-react'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/project.jsx'
import CreateInvoice from './pages/CreateInvoice.jsx'
import InvoiceHistory from './pages/InvoiceHistory.jsx'
import './App.css'

// Placeholder metadata map for upcoming modules
const PLACEHOLDER_CONFIG = {



  settings: {
    title: 'System Settings',
    icon: Settings,
    tag: 'Stage 3 Feature',
    description:
      'Company fiscal year preferences, tax rate rules, email reminder templates, and team role-based access controls.',
  },
}

// Reusable Placeholder Page Component
function PlaceholderPage({ type }) {
  const meta = PLACEHOLDER_CONFIG[type] || {
    title: 'Workspace Module',
    icon: HelpCircle,
    tag: 'Upcoming',
    description: 'This module is scheduled for the upcoming development phase.',
  }

  const IconComponent = meta.icon

  return (
    <div className="placeholder-view-card">
      <div className="placeholder-icon-wrap" aria-hidden="true">
        <IconComponent size={28} />
      </div>

      <span className="placeholder-tag">{meta.tag}</span>

      <h1 className="placeholder-title">{meta.title}</h1>

      <p className="placeholder-text">{meta.description}</p>

      <Link to="/" className="btn-primary" style={{ marginTop: '12px' }}>
        <ArrowLeft size={16} aria-hidden="true" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route
            path="create-invoice"
            element={<CreateInvoice />}
          />
          <Route
            path="invoice-history"
            element={<InvoiceHistory />}
          />
          <Route path="settings" element={<PlaceholderPage type="settings" />} />
          <Route path="*" element={<PlaceholderPage type="not-found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
