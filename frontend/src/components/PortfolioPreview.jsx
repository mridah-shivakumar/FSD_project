import React from 'react';
import {
  Mail, Phone, MapPin, Globe,
  GraduationCap, Briefcase, Award, Trophy, FolderGit2,
  ExternalLink, Calendar, CheckCircle2, User
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const PortfolioPreview = ({ portfolio }) => {
  if (!portfolio) return null;

  const {
    personalInfo = {},
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    experience = []
  } = portfolio;

  // Group skills by category for clear presentation
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const getInitials = (name) => {
    if (!name) return 'SP';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert': return 'badge-published';
      case 'Advanced': return 'badge-indigo';
      case 'Intermediate': return 'badge-blue';
      default: return 'badge-gray';
    }
  };

  return (
    <div className="portfolio-view" style={{
      backgroundColor: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      {/* Top Accent Stripe */}
      <div style={{
        height: '8px',
        background: 'linear-gradient(90deg, var(--color-primary), var(--color-indigo))'
      }} />

      {/* Hero / Header Section */}
      <div style={{
        padding: '3rem 2.5rem 2.5rem 2.5rem',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: '#fbfcfd'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Profile Photo or Initials Avatar */}
          <div style={{ flexShrink: 0 }}>
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #ffffff',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
            ) : null}
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-indigo))',
                color: '#ffffff',
                fontSize: '2.5rem',
                fontWeight: 700,
                display: personalInfo.photoUrl ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid #ffffff',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {getInitials(personalInfo.fullName)}
            </div>
          </div>

          {/* Name & Headline */}
          <div style={{ flex: 1, minWidth: '260px' }}>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              marginBottom: '0.35rem',
              letterSpacing: '-0.02em'
            }}>
              {personalInfo.fullName || 'Student Name'}
            </h1>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              {personalInfo.headline || 'Student & Aspiring Professional'}
            </p>

            {/* Quick Contact & Location Badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.9rem',
              color: 'var(--color-text-muted)'
            }}>
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'inherit' }}
                >
                  <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={16} style={{ color: 'var(--color-primary)' }} />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} style={{ color: 'var(--color-primary)' }} />
                  {personalInfo.location}
                </span>
              )}
            </div>

            {/* Social & Web Links */}
            {(personalInfo.linkedIn || personalInfo.github || personalInfo.website) && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginTop: '1.25rem'
              }}>
                {personalInfo.linkedIn && (
                  <a
                    href={personalInfo.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ borderRadius: 'var(--radius-full)' }}
                  >
                    <LinkedinIcon size={15} style={{ color: '#0077b5' }} />
                    LinkedIn
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ borderRadius: 'var(--radius-full)' }}
                  >
                    <GithubIcon size={15} />
                    GitHub
                  </a>
                )}
                {personalInfo.website && (
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ borderRadius: 'var(--radius-full)' }}
                  >
                    <Globe size={15} style={{ color: 'var(--color-primary)' }} />
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Biography / About Section */}
        {personalInfo.bio && (
          <section>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              marginBottom: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-main)'
            }}>
              <User size={20} style={{ color: 'var(--color-primary)' }} />
              About Me
            </h2>
            <div style={{
              backgroundColor: 'var(--color-bg-page)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              color: 'var(--color-text-main)',
              lineHeight: '1.7',
              whiteSpace: 'pre-line',
              fontSize: '0.975rem'
            }}>
              {personalInfo.bio}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-main)'
            }}>
              <Award size={20} style={{ color: 'var(--color-primary)' }} />
              Technical & Professional Skills
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(groupedSkills).map(([category, catSkills]) => (
                <div
                  key={category}
                  style={{
                    backgroundColor: 'var(--color-bg-page)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem'
                  }}
                >
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-text-muted)',
                    marginBottom: '0.75rem'
                  }}>
                    {category}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {catSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className={`badge ${getProficiencyColor(s.proficiency)}`}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
                      >
                        {s.name}
                        {s.proficiency && (
                          <span style={{ opacity: 0.75, fontWeight: 500, fontSize: '0.75rem' }}>
                            • {s.proficiency}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-main)'
            }}>
              <FolderGit2 size={20} style={{ color: 'var(--color-primary)' }} />
              Featured Projects
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}>
              {projects.map((proj, idx) => {
                const techList = Array.isArray(proj.technologies)
                  ? proj.technologies
                  : typeof proj.technologies === 'string'
                  ? proj.technologies.split(',').map((t) => t.trim()).filter(Boolean)
                  : [];

                return (
                  <div
                    key={idx}
                    className="card"
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <div style={{ marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        {proj.title}
                      </h3>
                      {proj.description && (
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--color-text-muted)' }}>
                          {proj.description}
                        </p>
                      )}
                    </div>

                    {techList.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                        {techList.map((tech, tIdx) => (
                          <span key={tIdx} className="badge badge-gray" style={{ fontSize: '0.75rem' }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ flex: 1 }}
                        >
                          <GithubIcon size={14} /> Code
                        </a>
                      )}
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                          style={{ flex: 1 }}
                        >
                          <ExternalLink size={14} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-main)'
            }}>
              <GraduationCap size={20} style={{ color: 'var(--color-primary)' }} />
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {edu.degree} {edu.department ? `in ${edu.department}` : ''}
                    </h3>
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                      {edu.institution}
                    </p>
                    {edu.cgpa && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                        Grade / CGPA: <strong>{edu.cgpa}</strong>
                      </p>
                    )}
                  </div>
                  {(edu.startYear || edu.graduationYear) && (
                    <div className="badge badge-gray" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} />
                      {edu.startYear ? `${edu.startYear} - ` : ''}{edu.graduationYear || 'Present'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-main)'
            }}>
              <Briefcase size={20} style={{ color: 'var(--color-primary)' }} />
              Experience & Activities
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{ padding: '1.25rem 1.5rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{exp.role}</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--color-indigo)', fontWeight: 600 }}>
                        {exp.organization}
                      </p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <div className="badge badge-gray" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={13} />
                        {exp.startDate ? `${exp.startDate} - ` : ''}{exp.endDate || 'Present'}
                      </div>
                    )}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--color-text-muted)', whiteSpace: 'pre-line' }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-main)'
            }}>
              <Award size={20} style={{ color: 'var(--color-primary)' }} />
              Certifications & Credentials
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{ padding: '1.25rem' }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {cert.title}
                  </h3>
                  {cert.issuingOrganization && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {cert.issuingOrganization}
                    </p>
                  )}
                  {cert.issueDate && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
                      Issued: {cert.issueDate}
                    </p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.775rem', padding: '0.3rem 0.6rem' }}
                    >
                      <ExternalLink size={12} /> View Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-main)'
            }}>
              <Trophy size={20} style={{ color: 'var(--color-primary)' }} />
              Honors & Achievements
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{ padding: '1.25rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{ach.title}</h3>
                    {ach.date && (
                      <span className="badge badge-gray" style={{ fontSize: '0.75rem' }}>{ach.date}</span>
                    )}
                  </div>
                  {ach.description && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      {ach.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Footer */}
        <div style={{
          marginTop: '1rem',
          padding: '2rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#f8fafc',
          border: '1px solid var(--color-border)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Interested in working together?</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Reach out directly for internships, project opportunities, or full-time roles.
          </p>
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <Mail size={16} /> Get In Touch ({personalInfo.email})
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
