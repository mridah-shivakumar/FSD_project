import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Sparkles, Image as ImageIcon } from 'lucide-react';

export const PersonalInfoForm = ({ data, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="form-section">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Personal Information</h3>
        <p style={{ fontSize: '0.9rem' }}>Introduce yourself to recruiters and collaborators.</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              name="fullName"
              className={`form-input ${errors?.fullName ? 'is-invalid' : ''}`}
              placeholder="e.g. Alex Johnson"
              value={data.fullName || ''}
              onChange={handleChange}
            />
          </div>
          {errors?.fullName && <p className="form-error">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Professional Headline <span className="required">*</span>
          </label>
          <input
            type="text"
            name="headline"
            className={`form-input ${errors?.headline ? 'is-invalid' : ''}`}
            placeholder="e.g. Computer Science Student | Aspiring Cloud Engineer"
            value={data.headline || ''}
            onChange={handleChange}
          />
          {errors?.headline && <p className="form-error">{errors.headline}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            className={`form-input ${errors?.email ? 'is-invalid' : ''}`}
            placeholder="e.g. alex.johnson@university.edu"
            value={data.email || ''}
            onChange={handleChange}
          />
          {errors?.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Phone Number <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>(optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            placeholder="e.g. +1 (555) 019-2834"
            value={data.phone || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Location <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>(optional)</span>
          </label>
          <input
            type="text"
            name="location"
            className="form-input"
            placeholder="e.g. Austin, TX or Bangalore, India"
            value={data.location || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Profile Photo URL <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>(optional)</span>
          </label>
          <input
            type="url"
            name="photoUrl"
            className="form-input"
            placeholder="https://images.unsplash.com/... or avatar link"
            value={data.photoUrl || ''}
            onChange={handleChange}
          />
          <p className="form-hint">Tip: Enter a direct image URL or leave blank to use automatic initials avatar.</p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Short Biography <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>(recommended)</span>
        </label>
        <textarea
          name="bio"
          rows={4}
          className="form-textarea"
          placeholder="Briefly describe your background, interests, passion for technology, and career objectives..."
          value={data.bio || ''}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '1rem', color: 'var(--color-text-main)' }}>Social & Professional Links</h4>
        <p style={{ fontSize: '0.85rem' }}>Showcase your repositories, professional networks, and personal blog.</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">LinkedIn Profile URL</label>
          <input
            type="url"
            name="linkedIn"
            className="form-input"
            placeholder="https://linkedin.com/in/username"
            value={data.linkedIn || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub Profile URL</label>
          <input
            type="url"
            name="github"
            className="form-input"
            placeholder="https://github.com/username"
            value={data.github || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Personal Website / Blog URL</label>
          <input
            type="url"
            name="website"
            className="form-input"
            placeholder="https://yourportfolio.me"
            value={data.website || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
