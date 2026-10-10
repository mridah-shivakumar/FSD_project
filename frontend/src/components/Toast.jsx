import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} />,
    error: <AlertCircle size={18} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />,
    info: <Info size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        {icons[type] || icons.info}
        <span style={{ flex: 1, fontWeight: 500 }}>{message}</span>
        <button
          onClick={onClose}
          style={{ color: 'var(--color-text-light)', padding: '0.2rem' }}
          aria-label="Dismiss toast"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
