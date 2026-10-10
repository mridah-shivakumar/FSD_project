import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink, Edit, Eye, Trash2, Share2, Globe,
  Calendar, CheckCircle, Clock, BookOpen, Layers
} from 'lucide-react';

export const PortfolioCard = ({
  portfolio,
  onDelete,
  onTogglePublish,
  onShare
}) => {
  const isPublished = portfolio.status === 'published';
  const updatedDate = new Date(portfolio.updatedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const projectsCount = portfolio.projects?.length || 0;
  const skillsCount = portfolio.skills?.length || 0;
  const educationCount = portfolio.education?.length || 0;

  return (
    <div className="card card-hover" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative'
    }}>
      <div>
        {/* Header & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
          <span className={`badge ${isPublished ? 'badge-published' : 'badge-draft'}`}>
            {isPublished ? (
              <>
                <Globe size={13} /> Published
              </>
            ) : (
              <>
                <Clock size={13} /> Draft
              </>
            )}
          </span>

          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={13} /> {updatedDate}
          </span>
        </div>

        {/* Portfolio Title & Headline */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
          {portfolio.title}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          marginBottom: '1.25rem',
          lineHeight: '1.4'
        }}>
          {portfolio.personalInfo?.headline || 'No professional headline provided'}
        </p>

        {/* Quick Stats Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.8rem'
        }}>
          <span className="badge badge-gray">
            <Layers size={13} /> {projectsCount} {projectsCount === 1 ? 'Project' : 'Projects'}
          </span>
          <span className="badge badge-gray">
            {skillsCount} {skillsCount === 1 ? 'Skill' : 'Skills'}
          </span>
          <span className="badge badge-gray">
            <BookOpen size={13} /> {educationCount} {educationCount === 1 ? 'Degree' : 'Degrees'}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: '1rem',
        marginTop: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem'
      }}>
        {/* Main Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link
            to={`/preview/${portfolio._id}`}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
          >
            <Eye size={15} /> Preview
          </Link>
          <Link
            to={`/edit/${portfolio._id}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
          >
            <Edit size={15} /> Edit
          </Link>
        </div>

        {/* Secondary Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => onTogglePublish(portfolio)}
              className={`btn btn-sm ${isPublished ? 'btn-secondary' : 'btn-outline'}`}
              style={{ fontSize: '0.775rem', padding: '0.35rem 0.65rem' }}
              title={isPublished ? 'Unpublish portfolio' : 'Publish portfolio'}
            >
              {isPublished ? 'Make Draft' : 'Publish'}
            </button>

            {isPublished && (
              <button
                onClick={() => onShare(portfolio)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.775rem', padding: '0.35rem 0.65rem' }}
                title="Copy shareable link"
              >
                <Share2 size={13} /> Share
              </button>
            )}

            {isPublished && (
              <Link
                to={`/portfolio/${portfolio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.775rem', padding: '0.35rem 0.65rem' }}
                title="Open live public URL"
              >
                <ExternalLink size={13} />
              </Link>
            )}
          </div>

          <button
            onClick={() => onDelete(portfolio)}
            className="btn btn-danger-outline btn-sm"
            style={{ padding: '0.35rem 0.6rem' }}
            title="Delete portfolio"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
