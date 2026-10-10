import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { portfolioService } from '../services/api';
import { PortfolioPreview } from '../components/PortfolioPreview';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Toast } from '../components/Toast';
import {
  ArrowLeft,
  Edit,
  Printer,
  Share2,
  Globe,
  Clock,
  ExternalLink
} from 'lucide-react';

export const PortfolioPreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await portfolioService.getById(id);
        setPortfolio(res.data.portfolio);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load portfolio preview.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    try {
      setUpdatingStatus(true);
      const newStatus = portfolio.status === 'published' ? 'draft' : 'published';
      const res = await portfolioService.togglePublish(portfolio._id, newStatus);
      setPortfolio({ ...portfolio, status: newStatus });
      setToast({
        message: newStatus === 'published'
          ? 'Portfolio published! Live public URL is active.'
          : 'Portfolio set back to private draft.',
        type: 'success'
      });
    } catch (err) {
      setToast({ message: 'Failed to update publication status.', type: 'error' });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleShare = () => {
    if (!portfolio) return;
    if (portfolio.status !== 'published') {
      setToast({
        message: 'This portfolio is currently a draft. Please publish it to share a public link.',
        type: 'error'
      });
      return;
    }

    const publicUrl = `${window.location.origin}/portfolio/${portfolio.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(publicUrl);
      setToast({ message: 'Public portfolio URL copied to clipboard!', type: 'success' });
    } else {
      prompt('Copy your portfolio link:', publicUrl);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <LoadingSpinner message="Generating preview from your saved portfolio data..." />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <ErrorMessage message={error || 'Portfolio not found'} />
        <Link to="/dashboard" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const isPublished = portfolio.status === 'published';

  return (
    <div style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        {/* Top Control Bar (Hidden when printing to PDF) */}
        <div
          className="portfolio-actions-bar card no-print"
          style={{
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            backgroundColor: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/dashboard" className="btn btn-secondary btn-sm">
              <ArrowLeft size={16} /> Dashboard
            </Link>

            <span className={`badge ${isPublished ? 'badge-published' : 'badge-draft'}`}>
              {isPublished ? (
                <>
                  <Globe size={13} /> Published
                </>
              ) : (
                <>
                  <Clock size={13} /> Private Draft
                </>
              )}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <Link to={`/edit/${portfolio._id}`} className="btn btn-secondary btn-sm">
              <Edit size={15} /> Edit Portfolio
            </Link>

            <button
              onClick={handleTogglePublish}
              disabled={updatingStatus}
              className={`btn btn-sm ${isPublished ? 'btn-secondary' : 'btn-outline'}`}
            >
              {isPublished ? 'Unpublish' : 'Publish'}
            </button>

            <button
              onClick={handleShare}
              className="btn btn-secondary btn-sm"
              title="Copy shareable public URL"
            >
              <Share2 size={15} /> Share Link
            </button>

            {isPublished && (
              <Link
                to={`/portfolio/${portfolio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                title="View Public Page"
              >
                <ExternalLink size={15} /> Public View
              </Link>
            )}

            <button
              onClick={handlePrint}
              className="btn btn-primary btn-sm"
              title="Print or Save as PDF"
            >
              <Printer size={15} /> Save as PDF
            </button>
          </div>
        </div>

        {/* Portfolio Live Render */}
        <PortfolioPreview portfolio={portfolio} />
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};
