import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

const CATEGORIES = [
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'Databases & Cloud',
  'Tools & DevOps',
  'Core Computer Science',
  'Soft Skills & Management',
  'Other'
];

const PROFICIENCIES = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const SkillsForm = ({ list = [], onChange, errors = {} }) => {
  const handleAdd = () => {
    onChange([
      ...list,
      {
        name: '',
        category: 'Programming Languages',
        proficiency: 'Intermediate'
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
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Skills & Technical Expertise</h3>
          <p style={{ fontSize: '0.9rem' }}>Categorize your technologies, tools, and competencies.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Skill
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
            No skills added yet
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Add technologies like JavaScript, React, Python, Java, SQL, or Git.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} /> Add First Skill
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {list.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                padding: '1.25rem',
                backgroundColor: '#ffffff'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 1.2fr auto',
                gap: '1rem',
                alignItems: 'start'
              }} className="skill-row-grid">
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>
                    Skill Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors[`skill_${index}_name`] ? 'is-invalid' : ''}`}
                    placeholder="e.g. React.js, Python, Docker"
                    value={item.name || ''}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                  />
                  {errors[`skill_${index}_name`] && (
                    <p className="form-error">{errors[`skill_${index}_name`]}</p>
                  )}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Category</label>
                  <select
                    className="form-select"
                    value={item.category || 'Programming Languages'}
                    onChange={(e) => handleChange(index, 'category', e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Proficiency</label>
                  <select
                    className="form-select"
                    value={item.proficiency || 'Intermediate'}
                    onChange={(e) => handleChange(index, 'proficiency', e.target.value)}
                  >
                    {PROFICIENCIES.map((prof) => (
                      <option key={prof} value={prof}>{prof}</option>
                    ))}
                  </select>
                </div>

                <div style={{ paddingTop: '1.75rem' }}>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="btn btn-danger-outline btn-sm"
                    title="Remove skill"
                    style={{ padding: '0.6rem' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .skill-row-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
