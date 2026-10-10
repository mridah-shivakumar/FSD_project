import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { FeatureCard } from '../components/FeatureCard';
import { PortfolioPreview } from '../components/PortfolioPreview';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Layers,
  Code2,
  Share2,
  FileCheck2,
  ArrowRight,
  UserCheck,
  Palette,
  Eye,
  CheckCircle,
  Briefcase
} from 'lucide-react';

// Representative sample portfolio for demonstration
const SAMPLE_PORTFOLIO = {
  title: 'Alex Johnson - Full-Stack Portfolio',
  slug: 'alex-johnson-sample',
  status: 'published',
  personalInfo: {
    fullName: 'Alex Johnson',
    headline: 'Computer Science Undergraduate | Full-Stack & Cloud Enthusiast',
    email: 'alex.johnson@stanford.edu',
    phone: '+1 (650) 723-2300',
    location: 'Stanford, CA',
    bio: 'Passionate CS junior dedicated to building accessible, scalable, and responsive web systems. Experienced in modern JavaScript frameworks, distributed backend design, and open-source contribution.',
    linkedIn: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://alexjohnson.dev'
  },
  education: [
    {
      institution: 'Stanford University',
      degree: 'B.S. in Computer Science',
      department: 'School of Engineering',
      startYear: '2022',
      graduationYear: '2026',
      cgpa: '3.92 / 4.0'
    }
  ],
  skills: [
    { name: 'JavaScript (ES6+)', category: 'Programming Languages', proficiency: 'Expert' },
    { name: 'Python', category: 'Programming Languages', proficiency: 'Advanced' },
    { name: 'React & Vite', category: 'Frontend Development', proficiency: 'Expert' },
    { name: 'Node.js & Express', category: 'Backend Development', proficiency: 'Advanced' },
    { name: 'MongoDB & Mongoose', category: 'Databases & Cloud', proficiency: 'Advanced' },
    { name: 'Git & GitHub Actions', category: 'Tools & DevOps', proficiency: 'Advanced' }
  ],
  projects: [
    {
      title: 'Smart Digital Portfolio Generator',
      description: 'A full-stack student career platform that converts academic profiles into responsive digital portfolios with custom slugs and PDF export.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      githubUrl: 'https://github.com',
      liveDemoUrl: 'https://example.com'
    },
    {
      title: 'Real-Time Campus Study Hub',
      description: 'Collaborative virtual study rooms with live markdown notes, synchronized whiteboard, and WebRTC audio chat.',
      technologies: ['React', 'Socket.io', 'WebRTC', 'Tailwind CSS'],
      githubUrl: 'https://github.com',
      liveDemoUrl: 'https://example.com'
    }
  ],
  experience: [
    {
      organization: 'Tech Innovation Labs',
      role: 'Full-Stack Software Engineering Intern',
      startDate: 'Jun 2024',
      endDate: 'Aug 2024',
      description: 'Implemented reusable React UI components and optimized REST API endpoints, reducing page load latencies by 35%.'
    }
  ],
  certifications: [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuingOrganization: 'Amazon Web Services',
      issueDate: 'Apr 2024',
      credentialUrl: 'https://aws.amazon.com'
    }
  ],
  achievements: [
    {
      title: '1st Place Winner - HackTech 2024',
      date: 'Feb 2024',
      description: 'Awarded first place among 85 university teams for building an AI-assisted accessibility tool.'
    }
  ]
};

export const HomePage = () => {
  const featuresRef = useRef(null);
  const sampleRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const handleExploreFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection onExploreFeatures={handleExploreFeatures} />

      {/* Feature Cards Section */}
      <section ref={featuresRef} style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
              Built For Success
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Everything You Need to Stand Out
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
              Engineered specifically for engineering students, designers, and recent graduates who want to make a lasting impression on recruiters.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            <FeatureCard
              icon={Sparkles}
              title="Easy Portfolio Creation"
              description="Step-by-step modular form with instant client-side validation, progress indicators, and autosave draft functionality."
              badge="Intuitive"
            />
            <FeatureCard
              icon={Code2}
              title="Project Showcasing"
              description="Highlight capstone projects with descriptions, technology stack badges, direct GitHub repository links, and live demos."
              badge="GitHub Ready"
            />
            <FeatureCard
              icon={Layers}
              title="Skill Presentation"
              description="Group your technical competencies by category with visual proficiency tags and clean categorization."
              badge="Structured"
            />
            <FeatureCard
              icon={Share2}
              title="Public URL & PDF Export"
              description="Publish with a clean, custom slug URL for your resume or LinkedIn, plus one-click browser PDF saving."
              badge="Shareable"
            />
          </div>
        </div>
      </section>

      {/* 3-Step Process Explanation */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg-page)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>
              Simple 3-Step Process
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              How It Works
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
              From blank page to deployed professional portfolio in minutes.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', backgroundColor: '#ffffff' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.4rem',
                fontWeight: 800
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Enter Your Details</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                Fill in your education, technical skills, projects, certifications, and achievements in organized sections.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', backgroundColor: '#ffffff' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-indigo-light)',
                color: 'var(--color-indigo)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.4rem',
                fontWeight: 800
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Customize & Review</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                Watch your live completion meter, customize your personalized URL slug, and verify your draft in real-time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', backgroundColor: '#ffffff' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-light)',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.4rem',
                fontWeight: 800
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Preview & Share</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                Publish with a single click, print as a professional PDF resume, or share your live public link with recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Sample Portfolio Preview Section */}
      <section ref={sampleRef} style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-published" style={{ marginBottom: '0.75rem' }}>
              Interactive Preview
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Sample Portfolio Preview
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
              See what your generated digital portfolio will look like to visitors and recruiters.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--color-bg-page)',
            padding: '2rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <PortfolioPreview portfolio={SAMPLE_PORTFOLIO} />
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              to={isAuthenticated ? '/create' : '/register'}
              className="btn btn-primary btn-lg"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              Generate Your Own Portfolio Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
