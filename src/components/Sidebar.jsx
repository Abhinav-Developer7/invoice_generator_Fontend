import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderGit2,
  FilePlus2,
  ReceiptText,
  Settings,
  X,
} from 'lucide-react'
import { SUMMARY_STATS, USER_PROFILE } from '../data/mockData.js'
import './Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      end: true,
    },
    {
      to: '/projects',
      label: 'Projects',
      icon: FolderGit2,
      badge: `${SUMMARY_STATS.totalProjects.value}`,
      end: false,
    },
    {
      to: '/create-invoice',
      label: 'Create Invoice',
      icon: FilePlus2,
      badge: null,
      end: false,
    },
    {
      to: '/invoice-history',
      label: 'Invoice History',
      icon: ReceiptText,
      badge: `${SUMMARY_STATS.totalInvoices.value}`,
      end: false,
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      end: false,
    },
  ]

  return (
    <aside
      className={`app-sidebar ${isOpen ? 'drawer-open' : ''}`}
      aria-label="Sidebar Navigation"
    >
      <div className="sidebar-header">
        <div className="brand-wrapper">
          <div className="brand-icon-box" aria-hidden="true">
            IMS
          </div>
          <div className="brand-info">
            <span className="brand-title">Invoice Manager</span>
            <span className="brand-tagline">Internal Portal</span>
          </div>
        </div>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav-container">
        <div>
          <div className="nav-section-label">Main Menu</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `nav-item-link ${isActive ? 'active' : ''}`
                    }
                    onClick={onClose}
                  >
                    <div className="nav-item-content">
                      <Icon className="nav-icon" aria-hidden="true" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="nav-item-badge">{item.badge}</span>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <div className="sidebar-profile">
        <div className="admin-card">
          <div className="admin-avatar" aria-hidden="true">
            {USER_PROFILE.initials}
          </div>
          <div className="admin-details">
            <p className="admin-name">{USER_PROFILE.name}</p>
            <p className="admin-role">{USER_PROFILE.role}</p>
          </div>
          <div
            className="admin-badge-dot"
            title="Operational Active"
            aria-label="Status: Active"
          />
        </div>
      </div>
    </aside>
  )
}
