import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, LogOut, Store, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Vendors', path: '/vendors', icon: <Store size={20} /> },
    { label: 'Customers', path: '/customers', icon: <Users size={20} /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1 className="logo">AdminPanel</h1>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={22} />
        </button>

        <h2 className="page-title">Dashboard</h2>

        <div className="user-menu">
          <span className="user-email">{user?.email}</span>
          <button onClick={logout} className="btn btn-outline btn-sm">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content-wrapper">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="main-content">
          <div className="container">{children}</div>
        </main>
      </div>
    </div>
  );
};
