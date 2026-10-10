import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { publicService } from '../services/api';
import { PortfolioPreview } from '../components/PortfolioPreview';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Printer, ShieldAlert, Home, Briefcase, ArrowLeft } from 'lucide-react';

export const PublicPortfolioPage = () => {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const res = await publicService.getBySlug(slug);
        setPortfolio(res.data.portfolio);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0' }}>
        <LoadingSpinner message="Loading digital portfolio..." />
      </div>
    );
  }

  // Not found or private draft error state
  if (notFound || !portfolio) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem'
      }}>
        <div className="card" style={{
          maxWidth: '520px',
          textAlign: 'center',
          padding: '3rem 2rem',
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-danger-light)',
            color: 'var(--color-danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <ShieldAlert size={32} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Portfolio Not Available
          </h2>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-muted)',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            The portfolio at <code>/portfolio/{slug}</code> either does not exist, has been deleted, or is currently saved as a private draft by the student.
          </p>

          <Link
            to="/"
            className="btn btn-primary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Home size={16} /> Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        {/* Recruiter / Visitor Top Navigation Bar */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--color-primary-dark)'
            }}
          >
            <Briefcase size={18} />
            <span>SmartPortfolio</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => window.print()}
              className="btn btn-secondary btn-sm"
              title="Print or Save as PDF"
            >
              <Printer size={15} /> Save / Print PDF
            </button>
            <Link
              to="/register"
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              Build Your Own
            </Link>
          </div>
        </div>

        {/* Portfolio Render */}
        <PortfolioPreview portfolio={portfolio} />

        {/* Footer Credit for Public View */}
        <div
          className="no-print"
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            fontSize: '0.85rem',
            color: 'var(--color-text-light)'
          }}
        >
          Powered by{' '}
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
            Smart Digital Portfolio Generator
          </Link>{' '}
          — Create your own student portfolio for free.
        </div>
      </div>
    </div>
  );
};
