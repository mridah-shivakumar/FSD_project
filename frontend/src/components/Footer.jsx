import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Code2, Globe } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid var(--color-border)',
      marginTop: 'auto',
      padding: '3rem 0 2rem 0'
    }} className="no-print">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: 'var(--color-primary-dark)',
              fontWeight: 800,
              fontSize: '1.2rem',
              marginBottom: '0.85rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-indigo))',
                color: '#ffffff',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase size={18} />
              </div>
              <span>SmartPortfolio</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              The all-in-one digital portfolio generator designed for students, fresh graduates, and career builders. Create, showcase, and share your achievements with employers worldwide.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="badge badge-blue">MERN Stack</span>
              <span className="badge badge-indigo">Vite + React</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><Link to="/">Home & Overview</Link></li>
              <li><Link to="/dashboard">Student Dashboard</Link></li>
              <li><Link to="/create">Create New Portfolio</Link></li>
              <li><Link to="/login">Account Login</Link></li>
              <li><Link to="/register">Create Free Account</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Platform Highlights</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <li>• Instant Custom URL Generation</li>
              <li>• Print & One-Click PDF Export</li>
              <li>• Projects & GitHub Integration</li>
              <li>• Dynamic Education & Skill Tags</li>
              <li>• Verified Draft & Privacy Controls</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--color-text-light)'
        }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Smart Digital Portfolio Generator. Built for student academic excellence.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Full-Stack Web Development Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
