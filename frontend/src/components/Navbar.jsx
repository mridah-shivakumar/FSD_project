import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Menu, X, PlusCircle, LayoutDashboard, LogOut, User as UserIcon, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          color: 'var(--color-primary-dark)',
          fontWeight: 800,
          fontSize: '1.25rem',
          letterSpacing: '-0.02em'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-indigo))',
            color: '#ffffff',
            borderRadius: '10px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.25)'
          }}>
            <Briefcase size={20} />
          </div>
          <span>SmartPortfolio</span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          <Link
            to="/"
            style={{
              fontWeight: 500,
              color: isActive('/') ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontSize: '0.95rem'
            }}
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontWeight: 500,
                  color: isActive('/dashboard') ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontSize: '0.95rem'
                }}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                to="/create"
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <PlusCircle size={16} />
                Create Portfolio
              </Link>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderLeft: '1px solid var(--color-border)',
                paddingLeft: '1.25rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--color-text-main)'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <UserIcon size={16} />
                  </div>
                  <span>{user?.name?.split(' ')[0] || 'Student'}</span>
                </div>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.4rem 0.6rem' }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
          style={{
            display: 'none',
            color: 'var(--color-text-main)',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--color-border)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 500, color: 'var(--color-text-main)' }}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontWeight: 500, color: 'var(--color-text-main)' }}
              >
                Dashboard
              </Link>
              <Link
                to="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
              >
                <PlusCircle size={18} />
                Create Portfolio
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start' }}
              >
                <LogOut size={18} />
                Log Out ({user?.name})
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Responsive media query styling */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};
