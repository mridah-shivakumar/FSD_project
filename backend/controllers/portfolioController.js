const Portfolio = require('../models/Portfolio');

// Utility to create URL-safe slugs
const slugify = (text) => {
  if (!text) return 'portfolio';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Generate a guaranteed unique slug in the database
const generateUniqueSlug = async (baseText, currentPortfolioId = null) => {
  const baseSlug = slugify(baseText) || 'student-portfolio';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Portfolio.findOne({ slug });
    if (!existing || (currentPortfolioId && existing._id.toString() === currentPortfolioId.toString())) {
      return slug;
    }
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
};

// @desc    Create a new portfolio
// @route   POST /api/portfolios
// @access  Private
const createPortfolio = async (req, res, next) => {
  try {
    const {
      title,
      slug: customSlug,
      status,
      personalInfo,
      education,
      skills,
      projects,
      certifications,
      achievements,
      experience
    } = req.body;

    if (!personalInfo || !personalInfo.fullName || !personalInfo.email || !personalInfo.headline) {
      return res.status(400).json({
        success: false,
        message: 'Personal information requires fullName, headline, and email'
      });
    }

    // Determine unique slug
    const desiredSlug = customSlug || personalInfo.fullName || 'portfolio';
    const slug = await generateUniqueSlug(desiredSlug);

    const portfolio = await Portfolio.create({
      owner: req.user._id,
      title: title || `${personalInfo.fullName}'s Portfolio`,
      slug,
      status: status === 'published' ? 'published' : 'draft',
      personalInfo,
      education: Array.isArray(education) ? education : [],
      skills: Array.isArray(skills) ? skills : [],
      projects: Array.isArray(projects) ? projects : [],
      certifications: Array.isArray(certifications) ? certifications : [],
      achievements: Array.isArray(achievements) ? achievements : [],
      experience: Array.isArray(experience) ? experience : []
    });

    return res.status(201).json({
      success: true,
      portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all portfolios belonging to the logged-in user
// @route   GET /api/portfolios
// @access  Private
const getUserPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ owner: req.user._id })
      .sort({ updatedAt: -1 });

    return res.json({
      success: true,
      count: portfolios.length,
      portfolios
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single portfolio by ID (owned by user)
// @route   GET /api/portfolios/:id
// @access  Private
const getPortfolioById = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    if (portfolio.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not own this portfolio'
      });
    }

    return res.json({
      success: true,
      portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
const updatePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    if (portfolio.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not own this portfolio'
      });
    }

    const {
      title,
      slug: customSlug,
      status,
      personalInfo,
      education,
      skills,
      projects,
      certifications,
      achievements,
      experience
    } = req.body;

    if (title !== undefined) portfolio.title = title;
    if (status !== undefined) portfolio.status = status;
    if (personalInfo) portfolio.personalInfo = personalInfo;
    if (education !== undefined) portfolio.education = education;
    if (skills !== undefined) portfolio.skills = skills;
    if (projects !== undefined) portfolio.projects = projects;
    if (certifications !== undefined) portfolio.certifications = certifications;
    if (achievements !== undefined) portfolio.achievements = achievements;
    if (experience !== undefined) portfolio.experience = experience;

    // Handle slug change if provided and different
    if (customSlug && customSlug !== portfolio.slug) {
      portfolio.slug = await generateUniqueSlug(customSlug, portfolio._id);
    }

    await portfolio.save();

    return res.json({
      success: true,
      message: 'Portfolio updated successfully',
      portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    if (portfolio.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not own this portfolio'
      });
    }

    await portfolio.deleteOne();

    return res.json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Publish / Unpublish a portfolio
// @route   PATCH /api/portfolios/:id/publish
// @access  Private
const togglePublishPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    if (portfolio.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not own this portfolio'
      });
    }

    if (req.body.status) {
      portfolio.status = req.body.status === 'published' ? 'published' : 'draft';
    } else {
      portfolio.status = portfolio.status === 'published' ? 'draft' : 'published';
    }

    await portfolio.save();

    return res.json({
      success: true,
      message: `Portfolio ${portfolio.status === 'published' ? 'published' : 'unpublished'} successfully`,
      status: portfolio.status,
      slug: portfolio.slug,
      portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get published portfolio by slug (Public)
// @route   GET /api/public/portfolios/:slug
// @access  Public
const getPublicPortfolioBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const portfolio = await Portfolio.findOne({ slug: slug.toLowerCase() })
      .populate('owner', 'name email');

    if (!portfolio || portfolio.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found or is currently private/draft'
      });
    }

    return res.json({
      success: true,
      portfolio
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPortfolio,
  getUserPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  togglePublishPortfolio,
  getPublicPortfolioBySlug
};
