import React from 'react';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';

export const CertificationsForm = ({ list = [], onChange, errors = {} }) => {
  const handleAdd = () => {
    onChange([
      ...list,
      {
        title: '',
        issuingOrganization: '',
        issueDate: '',
        credentialUrl: ''
      }
    ]);
  };

  const handleRemove = (index) => {
    const updated = list.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...list];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="form-section">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Certifications & Credentials</h3>
          <p style={{ fontSize: '0.9rem' }}>Add industry-recognized badges, online courses, and certificates.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>

      {list.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#ffffff'
        }}>
          <Award size={40} style={{ color: 'var(--color-text-light)', marginBottom: '0.75rem' }} />
          <p style={{ fontWeight: 500, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
            No certifications added yet
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Certifications from AWS, Google Cloud, Coursera, Meta, etc., increase profile credibility.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} /> Add First Certification
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {list.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                padding: '1.25rem',
                backgroundColor: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-blue">Certificate #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="btn btn-danger-outline btn-sm"
                  title="Remove certification"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Certification Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors[`cert_${index}_title`] ? 'is-invalid' : ''}`}
                    placeholder="e.g. AWS Certified Solutions Architect or Meta Front-End"
                    value={item.title || ''}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                  />
                  {errors[`cert_${index}_title`] && (
                    <p className="form-error">{errors[`cert_${index}_title`]}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Issuing Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Amazon Web Services, Google, Coursera"
                    value={item.issuingOrganization || ''}
                    onChange={(e) => handleChange(index, 'issuingOrganization', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Issue Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. May 2024"
                    value={item.issueDate || ''}
                    onChange={(e) => handleChange(index, 'issueDate', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Credential Verification URL (optional)</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://credly.com/badges/..."
                    value={item.credentialUrl || ''}
                    onChange={(e) => handleChange(index, 'credentialUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
