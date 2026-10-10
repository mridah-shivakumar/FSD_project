import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HeroSection = ({ onExploreFeatures }) => {
  const { isAuthenticated } = useAuth();

  return (
    <section style={{
      padding: '4.5rem 0 3.5rem 0',
      background: 'linear-gradient(180deg, #ffffff 0%, var(--color-bg-page) 100%)',
      borderBottom: '1px solid var(--color-border)',
      textAlign: 'center'
    }}>
      <div className="container-narrow">
        {/* Sub-badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary-dark)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          border: '1px solid #bfdbfe'
        }}>
          <Sparkles size={16} />
          Student Career & Portfolio Builder
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '1.5rem',
          color: 'var(--color-text-main)'
        }}>
          Build Your <span style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-indigo) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Professional Identity</span>
        </h1>

        {/* Short description */}
        <p style={{
          fontSize: '1.15rem',
          color: 'var(--color-text-muted)',
          maxWidth: '680px',
          margin: '0 auto 2.25rem auto',
          lineHeight: 1.6
        }}>
          Enter your academics, tech stack, and capstone projects. Automatically generate an interactive, responsive, and recruiter-ready digital portfolio you can preview, edit, and share with a unique link.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          <Link
            to={isAuthenticated ? '/create' : '/register'}
            className="btn btn-primary btn-lg"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Create My Portfolio <ArrowRight size={18} />
          </Link>

          <button
            onClick={onExploreFeatures}
            className="btn btn-secondary btn-lg"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Explore Features
          </button>
        </div>

        {/* Highlights */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} /> 100% Free for Students
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} /> Instant Shareable URL
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} /> Print & PDF Export
          </span>
        </div>
      </div>
    </section>
  );
};
