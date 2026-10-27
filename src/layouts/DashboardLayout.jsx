import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Building2, ShieldCheck } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import { USER_PROFILE } from '../data/mockData.js'
import './DashboardLayout.css'

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  return (
    <div className="app-layout">
      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="app-main">
        <Topbar
          onOpenMenu={() => setIsMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="dashboard-layout-content" id="main-content">
          <Outlet context={{ searchQuery, setSearchQuery }} />
        </main>

        {/* Global Application Footer */}
        <footer className="app-footer">
          <div className="footer-company-label">
            <Building2 size={14} aria-hidden="true" />
            <span>{USER_PROFILE.workspace}</span>
            <span className="footer-bullet" aria-hidden="true">
              •
            </span>
            <span>Invoice Management System v1.0</span>
            <span className="footer-bullet" aria-hidden="true">
              •
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} aria-hidden="true" />
              <span>Authorized Personnel Only</span>
            </span>
          </div>

          <p className="footer-disclaimer-note">
            Mock administrative data for frontend evaluation • Real-time backend API integration upcoming
          </p>
        </footer>
      </div>
    </div>
  )
}
