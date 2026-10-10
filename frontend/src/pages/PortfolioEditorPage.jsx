import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { portfolioService } from '../services/api';
import { PersonalInfoForm } from '../components/forms/PersonalInfoForm';
import { EducationForm } from '../components/forms/EducationForm';
import { SkillsForm } from '../components/forms/SkillsForm';
import { ProjectsForm } from '../components/forms/ProjectsForm';
import { CertificationsForm } from '../components/forms/CertificationsForm';
import { AchievementsForm } from '../components/forms/AchievementsForm';
import { ExperienceForm } from '../components/forms/ExperienceForm';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Toast } from '../components/Toast';
import {
  Save,
  Eye,
  Globe,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles,
  User,
  GraduationCap,
  Award,
  FolderGit2,
  Trophy,
  Briefcase
} from 'lucide-react';

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Award },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Trophy }
];

export const PortfolioEditorPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('personal');
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [validationErrors, setValidationErrors] = useState({});

  // Full portfolio state
  const [formData, setFormData] = useState({
    title: 'My Digital Portfolio',
    slug: '',
    status: 'draft',
    personalInfo: {
      fullName: '',
      headline: '',
      photoUrl: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      linkedIn: '',
      github: '',
      website: ''
    },
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    experience: []
  });

  // Fetch portfolio if in edit mode
  useEffect(() => {
    if (isEditing) {
      const fetchPortfolio = async () => {
        try {
          setInitialLoading(true);
          const res = await portfolioService.getById(id);
          const p = res.data.portfolio;
          setFormData({
            title: p.title || '',
            slug: p.slug || '',
            status: p.status || 'draft',
            personalInfo: p.personalInfo || {},
            education: p.education || [],
            skills: p.skills || [],
            projects: p.projects || [],
            certifications: p.certifications || [],
            achievements: p.achievements || [],
            experience: p.experience || []
          });
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load portfolio for editing.');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchPortfolio();
    }
  }, [id, isEditing]);

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    let score = 0;
    const totalWeights = 100;

    // Personal Info (35%)
    if (formData.personalInfo.fullName?.trim()) score += 10;
    if (formData.personalInfo.headline?.trim()) score += 10;
    if (formData.personalInfo.email?.trim()) score += 10;
    if (formData.personalInfo.bio?.trim()) score += 5;

    // Education (15%)
    if (formData.education.length > 0 && formData.education[0].institution) score += 15;

    // Skills (15%)
    if (formData.skills.length > 0 && formData.skills[0].name) score += 15;

    // Projects (20%)
    if (formData.projects.length > 0 && formData.projects[0].title) score += 20;

    // Experience (5%)
    if (formData.experience.length > 0) score += 5;

    // Certifications / Achievements (10%)
    if (formData.certifications.length > 0 || formData.achievements.length > 0) score += 10;

    return Math.min(score, 100);
  }, [formData]);

  // Validate required fields
  const validateForm = () => {
    const errors = {};

    if (!formData.personalInfo.fullName?.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.personalInfo.headline?.trim()) {
      errors.headline = 'Professional Headline is required';
    }
    if (!formData.personalInfo.email?.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Education validations if added
    formData.education.forEach((edu, idx) => {
      if (!edu.institution?.trim()) {
        errors[`education_${idx}_institution`] = 'Institution is required';
      }
      if (!edu.degree?.trim()) {
        errors[`education_${idx}_degree`] = 'Degree is required';
      }
    });

    // Skills validations if added
    formData.skills.forEach((skill, idx) => {
      if (!skill.name?.trim()) {
        errors[`skill_${idx}_name`] = 'Skill name is required';
      }
    });

    // Projects validations if added
    formData.projects.forEach((proj, idx) => {
      if (!proj.title?.trim()) {
        errors[`project_${idx}_title`] = 'Project title is required';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save handler (Draft or Published)
  const handleSave = async (statusOverride = null, redirectToPreview = false) => {
    if (!validateForm()) {
      // Switch to personal tab if personal errors exist
      if (validationErrors.fullName || validationErrors.headline || validationErrors.email) {
        setActiveSection('personal');
      }
      setToast({
        message: 'Please complete all required fields indicated in red before proceeding.',
        type: 'error'
      });
      return null;
    }

    const payload = {
      ...formData,
      status: statusOverride || formData.status
    };

    try {
      setSaving(true);
      setError('');
      let savedPortfolio;

      if (isEditing) {
        const res = await portfolioService.update(id, payload);
        savedPortfolio = res.data.portfolio;
        setToast({
          message: statusOverride === 'published'
            ? 'Portfolio successfully updated and published!'
            : 'Portfolio saved as draft!',
          type: 'success'
        });
      } else {
        const res = await portfolioService.create(payload);
        savedPortfolio = res.data.portfolio;
        setToast({
          message: statusOverride === 'published'
            ? 'Portfolio created and published!'
            : 'Portfolio draft created!',
          type: 'success'
        });
      }

      if (redirectToPreview && savedPortfolio?._id) {
        navigate(`/preview/${savedPortfolio._id}`);
      } else if (!isEditing && savedPortfolio?._id) {
        // Redirect to edit mode for the created portfolio
        navigate(`/edit/${savedPortfolio._id}`, { replace: true });
      }

      return savedPortfolio;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save portfolio. Please try again.';
      setError(msg);
      setToast({ message: msg, type: 'error' });
      return null;
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <LoadingSpinner message="Loading portfolio details..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0 4rem 0', minHeight: 'calc(100vh - 180px)' }}>
      <div className="container">
        {/* Top Back & Actions Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <Link
            to="/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)'
            }}
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave('draft', false)}
              className="btn btn-secondary"
            >
              <Save size={16} /> Save Draft
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(null, true)}
              className="btn btn-secondary"
            >
              <Eye size={16} /> Preview Portfolio
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave('published', false)}
              className="btn btn-primary"
            >
              <Globe size={16} />
              {saving ? 'Publishing...' : 'Publish Portfolio'}
            </button>
          </div>
        </div>

        {/* Title & Slug Header */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <div className="form-row">
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">
                Portfolio Internal Title <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Alex Johnson - Software Engineering Portfolio"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">
                Custom URL Slug <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>(auto-generated if blank)</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  padding: '0.65rem 0.75rem',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRight: 'none',
                  borderTopLeftRadius: 'var(--radius-md)',
                  borderBottomLeftRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)'
                }}>
                  /portfolio/
                </span>
                <input
                  type="text"
                  className="form-input"
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  placeholder="alex-johnson"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Form Progress Indicator */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                Profile Strength & Completion
              </span>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                {completionPercentage}%
              </span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>
        </div>

        {/* Global Error Banner */}
        <ErrorMessage message={error} />

        {/* Multi-Section Workspace */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '1.5rem',
          alignItems: 'start'
        }} className="editor-grid">
          
          {/* Section Navigation Sidebar */}
          <div className="card" style={{ padding: '0.75rem' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}>
              {SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isCurrent = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSection(sec.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isCurrent ? 'var(--color-primary-light)' : 'transparent',
                      color: isCurrent ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                      fontWeight: isCurrent ? 700 : 500,
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={18} style={{ color: isCurrent ? 'var(--color-primary)' : 'inherit' }} />
                    <span style={{ flex: 1, fontSize: '0.925rem' }}>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Form Container */}
          <div className="card" style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
            {activeSection === 'personal' && (
              <PersonalInfoForm
                data={formData.personalInfo}
                errors={validationErrors}
                onChange={(personalInfo) => setFormData({ ...formData, personalInfo })}
              />
            )}

            {activeSection === 'education' && (
              <EducationForm
                list={formData.education}
                errors={validationErrors}
                onChange={(education) => setFormData({ ...formData, education })}
              />
            )}

            {activeSection === 'skills' && (
              <SkillsForm
                list={formData.skills}
                errors={validationErrors}
                onChange={(skills) => setFormData({ ...formData, skills })}
              />
            )}

            {activeSection === 'projects' && (
              <ProjectsForm
                list={formData.projects}
                errors={validationErrors}
                onChange={(projects) => setFormData({ ...formData, projects })}
              />
            )}

            {activeSection === 'experience' && (
              <ExperienceForm
                list={formData.experience}
                errors={validationErrors}
                onChange={(experience) => setFormData({ ...formData, experience })}
              />
            )}

            {activeSection === 'certifications' && (
              <CertificationsForm
                list={formData.certifications}
                errors={validationErrors}
                onChange={(certifications) => setFormData({ ...formData, certifications })}
              />
            )}

            {activeSection === 'achievements' && (
              <AchievementsForm
                list={formData.achievements}
                errors={validationErrors}
                onChange={(achievements) => setFormData({ ...formData, achievements })}
              />
            )}

            {/* Bottom section buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave('draft', false)}
                  className="btn btn-secondary btn-sm"
                >
                  <Save size={15} /> Save Draft
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave(null, true)}
                  className="btn btn-secondary btn-sm"
                >
                  <Eye size={15} /> Preview
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave('published', false)}
                  className="btn btn-primary btn-sm"
                >
                  <Globe size={15} /> Publish
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .editor-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
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
