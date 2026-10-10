import React from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export const ExperienceForm = ({ list = [], onChange, errors = {} }) => {
  const handleAdd = () => {
    onChange([
      ...list,
      {
        organization: '',
        role: '',
        description: '',
        startDate: '',
        endDate: ''
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
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Experience & Extracurricular Activities</h3>
          <p style={{ fontSize: '0.9rem' }}>Internships, research assistantships, club leadership, and volunteer roles.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Experience
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
          <Briefcase size={40} style={{ color: 'var(--color-text-light)', marginBottom: '0.75rem' }} />
          <p style={{ fontWeight: 500, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
            No experience records added yet
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Add internships, college tech club positions, or open-source contributions.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} /> Add First Experience
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
                <span className="badge badge-blue">Experience #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="btn btn-danger-outline btn-sm"
                  title="Remove experience"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Organization / Company <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors[`exp_${index}_org`] ? 'is-invalid' : ''}`}
                    placeholder="e.g. Acme Tech Solutions or GDSC Campus Club"
                    value={item.organization || ''}
                    onChange={(e) => handleChange(index, 'organization', e.target.value)}
                  />
                  {errors[`exp_${index}_org`] && (
                    <p className="form-error">{errors[`exp_${index}_org`]}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Role / Position <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors[`exp_${index}_role`] ? 'is-invalid' : ''}`}
                    placeholder="e.g. Full-Stack Engineering Intern or Tech Lead"
                    value={item.role || ''}
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                  />
                  {errors[`exp_${index}_role`] && (
                    <p className="form-error">{errors[`exp_${index}_role`]}</p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Jun 2024"
                    value={item.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date (or Present)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Aug 2024 or Present"
                    value={item.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Responsibilities & Impact</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="Key contributions, projects delivered, tools used, and outcomes achieved..."
                  value={item.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
