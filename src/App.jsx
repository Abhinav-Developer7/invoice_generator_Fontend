import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/project.jsx'
import CreateInvoice from './pages/CreateInvoice.jsx'
import InvoiceHistory from './pages/InvoiceHistory.jsx'
import SettingsPage from './pages/settings.jsx'
import InvoicePreview from './pages/InvoicePreview.jsx'
import './App.css'




// Reusable Placeholder Page Component

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
          <Route
            path="invoice-Preview"
            element={<InvoicePreview />}
          />
          <Route path="settings" element={<SettingsPage />} />
          {/* <Route path="*" element={<PlaceholderPage type="not-found" />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
