import React from 'react';
import { Plus, Trash2, FolderGit2, ExternalLink } from 'lucide-react';

export const ProjectsForm = ({ list = [], onChange, errors = {} }) => {
  const handleAdd = () => {
    onChange([
      ...list,
      {
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveDemoUrl: ''
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
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Projects & Creations</h3>
          <p style={{ fontSize: '0.9rem' }}>Showcase software applications, research, or course capstones.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Project
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
          <FolderGit2 size={40} style={{ color: 'var(--color-text-light)', marginBottom: '0.75rem' }} />
          <p style={{ fontWeight: 500, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
            No projects added yet
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Projects demonstrate practical knowledge and problem-solving abilities to recruiters.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} /> Add First Project
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
                <span className="badge badge-indigo">Project #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="btn btn-danger-outline btn-sm"
                  title="Remove project"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Project Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors[`project_${index}_title`] ? 'is-invalid' : ''}`}
                  placeholder="e.g. Smart Digital Portfolio Generator or E-commerce Microservices"
                  value={item.title || ''}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                />
                {errors[`project_${index}_title`] && (
                  <p className="form-error">{errors[`project_${index}_title`]}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Technologies Used <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>(comma-separated)</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind CSS"
                  value={
                    Array.isArray(item.technologies)
                      ? item.technologies.join(', ')
                      : item.technologies || ''
                  }
                  onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="Describe the problem, your solution, features implemented, and measurable results..."
                  value={item.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">GitHub Repository URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/username/project"
                    value={item.githubUrl || ''}
                    onChange={(e) => handleChange(index, 'githubUrl', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Live Demo URL (optional)</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://project-demo.vercel.app"
                    value={item.liveDemoUrl || ''}
                    onChange={(e) => handleChange(index, 'liveDemoUrl', e.target.value)}
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
