const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    department: { type: String, default: '', trim: true },
    startYear: { type: String, default: '', trim: true },
    graduationYear: { type: String, default: '', trim: true },
    cgpa: { type: String, default: '', trim: true }
  },
  { _id: true }
);

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      default: 'General',
      trim: true
    },
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', ''],
      default: 'Intermediate'
    }
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    technologies: {
      type: [String],
      default: []
    },
    githubUrl: { type: String, default: '', trim: true },
    liveDemoUrl: { type: String, default: '', trim: true }
  },
  { _id: true }
);

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuingOrganization: { type: String, default: '', trim: true },
    issueDate: { type: String, default: '', trim: true },
    credentialUrl: { type: String, default: '', trim: true }
  },
  { _id: true }
);

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    date: { type: String, default: '', trim: true }
  },
  { _id: true }
);

const experienceSchema = new mongoose.Schema(
  {
    organization: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    startDate: { type: String, default: '', trim: true },
    endDate: { type: String, default: '', trim: true }
  },
  { _id: true }
);

const personalInfoSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    headline: { type: String, required: true, trim: true },
    photoUrl: { type: String, default: '', trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '', trim: true },
    location: { type: String, default: '', trim: true },
    bio: { type: String, default: '', trim: true },
    linkedIn: { type: String, default: '', trim: true },
    github: { type: String, default: '', trim: true },
    website: { type: String, default: '', trim: true }
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      default: 'My Digital Portfolio',
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true
    },
    personalInfo: {
      type: personalInfoSchema,
      required: true
    },
    education: {
      type: [educationSchema],
      default: []
    },
    skills: {
      type: [skillSchema],
      default: []
    },
    projects: {
      type: [projectSchema],
      default: []
    },
    certifications: {
      type: [certificationSchema],
      default: []
    },
    achievements: {
      type: [achievementSchema],
      default: []
    },
    experience: {
      type: [experienceSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
