import React from 'react';
import { Plus, Trash2, Trophy } from 'lucide-react';

export const AchievementsForm = ({ list = [], onChange, errors = {} }) => {
  const handleAdd = () => {
    onChange([
      ...list,
      {
        title: '',
        description: '',
        date: ''
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
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Honors & Achievements</h3>
          <p style={{ fontSize: '0.9rem' }}>Highlight hackathon wins, scholarships, competitive programming, and awards.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Achievement
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
          <Trophy size={40} style={{ color: 'var(--color-text-light)', marginBottom: '0.75rem' }} />
          <p style={{ fontWeight: 500, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
            No achievements added yet
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Include contest rankings, dean's list recognition, or paper publications.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} /> Add First Achievement
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
                <span className="badge badge-indigo">Achievement #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="btn btn-danger-outline btn-sm"
                  title="Remove achievement"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Achievement Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors[`achieve_${index}_title`] ? 'is-invalid' : ''}`}
                    placeholder="e.g. 1st Place - Smart City Hackathon 2024"
                    value={item.title || ''}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                  />
                  {errors[`achieve_${index}_title`] && (
                    <p className="form-error">{errors[`achieve_${index}_title`]}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Date / Year (optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. October 2024"
                    value={item.date || ''}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description (optional)</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Provide context on your ranking, competition scope, or team size..."
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
