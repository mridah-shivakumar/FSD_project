import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { portfolioService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PortfolioCard } from '../components/PortfolioCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Toast } from '../components/Toast';
import {
  Plus,
  Briefcase,
  FileText,
  Globe,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Confirmation modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await portfolioService.getAll();
      setPortfolios(res.data.portfolios || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load portfolios. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDeletePrompt = (portfolio) => {
    setPortfolioToDelete(portfolio);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!portfolioToDelete) return;
    try {
      await portfolioService.delete(portfolioToDelete._id);
      setPortfolios((prev) => prev.filter((p) => p._id !== portfolioToDelete._id));
      setToast({ message: `"${portfolioToDelete.title}" was deleted.`, type: 'info' });
    } catch (err) {
      setToast({ message: 'Failed to delete portfolio.', type: 'error' });
    } finally {
      setModalOpen(false);
      setPortfolioToDelete(null);
    }
  };

  const handleTogglePublish = async (portfolio) => {
    try {
      const newStatus = portfolio.status === 'published' ? 'draft' : 'published';
      const res = await portfolioService.togglePublish(portfolio._id, newStatus);
      
      setPortfolios((prev) =>
        prev.map((p) => (p._id === portfolio._id ? { ...p, status: newStatus } : p))
      );

      setToast({
        message: newStatus === 'published'
          ? 'Portfolio published! It is now accessible via public link.'
          : 'Portfolio unpublished and set to private draft.',
        type: 'success'
      });
    } catch (err) {
      setToast({ message: 'Failed to update publication status.', type: 'error' });
    }
  };

  const handleShare = (portfolio) => {
    const publicUrl = `${window.location.origin}/portfolio/${portfolio.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(publicUrl);
      setToast({ message: 'Public portfolio URL copied to clipboard!', type: 'success' });
    } else {
      // Fallback
      prompt('Copy your portfolio link:', publicUrl);
    }
  };

  const publishedCount = portfolios.filter((p) => p.status === 'published').length;
  const draftCount = portfolios.length - publishedCount;

  return (
    <div style={{ padding: '2.5rem 0 4rem 0', minHeight: 'calc(100vh - 180px)' }}>
      <div className="container">
        {/* Header & Stats Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-blue">Student Hub</span>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-main)' }}>
              Welcome, {user?.name || 'Student'}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
              Manage your academic portfolios, track live links, and showcase your best work.
            </p>
          </div>

          <Link
            to="/create"
            className="btn btn-primary btn-lg"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Plus size={20} />
            Create New Portfolio
          </Link>
        </div>

        {/* Quick Summary Cards */}
        {portfolios.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)'
                }}>
                  <FileText size={18} />
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  Total Portfolios
                </span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                {portfolios.length}
              </div>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-success-light)',
                  color: 'var(--color-success)'
                }}>
                  <Globe size={18} />
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  Published Live
                </span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success)' }}>
                {publishedCount}
              </div>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-warning-light)',
                  color: 'var(--color-warning)'
                }}>
                  <Clock size={18} />
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  Drafts in Progress
                </span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-warning)' }}>
                {draftCount}
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        <ErrorMessage message={error} onRetry={fetchPortfolios} />

        {/* Loading Spinner */}
        {loading ? (
          <LoadingSpinner message="Loading your portfolios from database..." />
        ) : portfolios.length === 0 ? (
          /* Empty state */
          <div className="card" style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: '#ffffff'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Briefcase size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              No portfolios created yet
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              maxWidth: '480px',
              margin: '0 auto 1.75rem auto'
            }}>
              You haven't built any digital portfolios yet. Click below to enter your academics, skills, and projects, and generate an outstanding showcase.
            </p>
            <Link
              to="/create"
              className="btn btn-primary btn-lg"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <Plus size={18} /> Create Your First Portfolio
            </Link>
          </div>
        ) : (
          /* Portfolios grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio._id}
                portfolio={portfolio}
                onDelete={handleDeletePrompt}
                onTogglePublish={handleTogglePublish}
                onShare={handleShare}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        title="Delete Portfolio"
        message={`Are you sure you want to permanently delete "${portfolioToDelete?.title}"? This action cannot be undone.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};
