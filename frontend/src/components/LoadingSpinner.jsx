import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ message = 'Loading...', size = 32 }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      gap: '1rem',
      color: 'var(--color-primary)'
    }}>
      <Loader2
        size={size}
        style={{
          animation: 'spin 1s linear infinite'
        }}
      />
      {message && (
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-muted)',
          fontWeight: 500
        }}>
          {message}
        </p>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
