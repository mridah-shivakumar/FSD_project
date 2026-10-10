import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export const EducationForm = ({ list = [], onChange, errors = {} }) => {
  const handleAdd = () => {
    onChange([
      ...list,
      {
        institution: '',
        degree: '',
        department: '',
        startYear: '',
        graduationYear: '',
        cgpa: ''
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
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Education Details</h3>
          <p style={{ fontSize: '0.9rem' }}>Add your university degrees, diplomas, or academic qualifications.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Education
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
          <GraduationCap size={40} style={{ color: 'var(--color-text-light)', marginBottom: '0.75rem' }} />
          <p style={{ fontWeight: 500, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
            No education entries added yet
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            List your college, university, or high school education.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} /> Add First Degree
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
                backgroundColor: '#ffffff',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-blue">Degree #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="btn btn-danger-outline btn-sm"
                  title="Remove this education record"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Institution / University <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors[`education_${index}_institution`] ? 'is-invalid' : ''}`}
                    placeholder="e.g. Stanford University or Delhi University"
                    value={item.institution || ''}
                    onChange={(e) => handleChange(index, 'institution', e.target.value)}
                  />
                  {errors[`education_${index}_institution`] && (
                    <p className="form-error">{errors[`education_${index}_institution`]}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Degree / Qualification <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors[`education_${index}_degree`] ? 'is-invalid' : ''}`}
                    placeholder="e.g. Bachelor of Technology (B.Tech) or B.Sc."
                    value={item.degree || ''}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                  />
                  {errors[`education_${index}_degree`] && (
                    <p className="form-error">{errors[`education_${index}_degree`]}</p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Specialization / Department</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Computer Science & Engineering"
                    value={item.department || ''}
                    onChange={(e) => handleChange(index, 'department', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CGPA / Percentage (optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 8.9/10 or 88%"
                    value={item.cgpa || ''}
                    onChange={(e) => handleChange(index, 'cgpa', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Year</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 2022"
                    value={item.startYear || ''}
                    onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Graduation Year (or Expected)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 2026"
                    value={item.graduationYear || ''}
                    onChange={(e) => handleChange(index, 'graduationYear', e.target.value)}
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
