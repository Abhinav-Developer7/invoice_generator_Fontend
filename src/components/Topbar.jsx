import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Bell, Menu, X, ChevronRight, Sun, Moon } from 'lucide-react'
import { USER_PROFILE } from '../data/mockData.js'
import './Topbar.css'

export default function Topbar({
  onOpenMenu,
  searchQuery,
  onSearchChange,
  theme,
  onThemeChange,
}) {
  const location = useLocation()
  const [notificationToast, setNotificationToast] = useState(null)
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false)
  // Derive breadcrumb from current URL pathname
  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/projects':
        return 'Projects'
      case '/create-invoice':
        return 'Create Invoice'
      case '/invoice-history':
        return 'Invoice History'
      case '/settings':
        return 'Settings'
      case '/':
      default:
        return 'Dashboard'
    }
  }

  const handleNotificationClick = () => {
    setNotificationToast('You have 2 pending invoice approval requests.')
    setTimeout(() => {
      setNotificationToast(null)
    }, 4000)
  }

  return (
    <>
      <header className="app-topbar">
        <div className="topbar-left">
          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <span className="breadcrumb-root">Workspace</span>
            <ChevronRight className="breadcrumb-separator" aria-hidden="true" />
            <span className="breadcrumb-current">{getBreadcrumb()}</span>
          </nav>
        </div>

        <div className="topbar-right">
          <div className="topbar-search-form" role="search">
            <span className="search-icon-wrapper" aria-hidden="true">
              <Search className="search-icon" />
            </span>
            <input
              type="text"
              className="topbar-search-input"
              placeholder="Search invoices, clients, projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search invoices by invoice number, client, or project"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search input"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="icon-action-btn"
              onClick={handleNotificationClick}
              aria-label="View system notifications"
              title="System notifications"
            >
              <Bell size={18} />
              <span className="notification-badge-dot" aria-hidden="true" />
            </button>

            <div className="quick-profile-badge" title={USER_PROFILE.email}>
              <div className="profile-avatar-mini" aria-hidden="true">
                {USER_PROFILE.initials}
              </div>
              <span>{USER_PROFILE.name}</span>
            </div>
          </div>
        </div>
      </header>

      {notificationToast && (
        <div
          role="status"
          aria-live="polite"
          className="topbar-notification-toast"
        >
          <div className="toast-content">
            <Bell size={16} />
            <span>{notificationToast}</span>
          </div>
          <button
            type="button"
            className="toast-dismiss-btn"
            onClick={() => setNotificationToast(null)}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </>
  )
}
