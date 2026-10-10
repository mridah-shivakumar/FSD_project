import React from 'react';

export const FeatureCard = ({ icon: Icon, title, description, badge }) => {
  return (
    <div className="card card-hover" style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      backgroundColor: '#ffffff'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-primary-light)',
        color: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem'
      }}>
        <Icon size={24} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
          {title}
        </h3>
        {badge && <span className="badge badge-indigo">{badge}</span>}
      </div>

      <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
  );
};
