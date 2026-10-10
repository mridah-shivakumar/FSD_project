const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../server');

let mongoServer;

const testRunner = async () => {
  console.log('--- STARTING BACKEND INTEGRATION & UNIT TESTS ---');
  let passed = 0;
  let failed = 0;

  const assert = (condition, message) => {
    if (condition) {
      console.log(`  PASS: ${message}`);
      passed++;
    } else {
      console.error(`  FAIL: ${message}`);
      failed++;
    }
  };

  try {
    // 1. Setup in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('[Test DB] In-memory MongoDB connected for tests.');

    // 2. Health check
    const healthRes = await request(app).get('/api/health');
    assert(healthRes.status === 200 && healthRes.body.status === 'ok', 'GET /api/health returns 200 OK');

    // 3. User Registration
    const regRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: 'password123'
      });
    assert(regRes.status === 201 && regRes.body.token, 'POST /api/auth/register returns 201 and JWT token');
    const user1Token = regRes.body.token;

    // 4. Duplicate Registration prevention
    const dupRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: 'password123'
      });
    assert(dupRes.status === 409, 'POST /api/auth/register duplicate email returns 409 Conflict');

    // 5. Short password validation
    const shortPassRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test',
        email: 'test@example.com',
        password: '123'
      });
    assert(shortPassRes.status === 400, 'POST /api/auth/register short password returns 400 Bad Request');

    // 6. User Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alex@example.com',
        password: 'password123'
      });
    assert(loginRes.status === 200 && loginRes.body.token, 'POST /api/auth/login returns 200 and token');

    // 7. Invalid Login
    const invalidLoginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alex@example.com',
        password: 'wrongpassword'
      });
    assert(invalidLoginRes.status === 401, 'POST /api/auth/login wrong password returns 401 Unauthorized');

    // 8. Auth profile GET /api/auth/me
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${user1Token}`);
    assert(meRes.status === 200 && meRes.body.user.email === 'alex@example.com', 'GET /api/auth/me returns user profile');

    // 9. Unauthorized access to protected route
    const unauthRes = await request(app).get('/api/portfolios');
    assert(unauthRes.status === 401, 'Protected route without token returns 401');

    // 10. Create Portfolio (Draft)
    const createPortRes = await request(app)
      .post('/api/portfolios')
      .set('Authorization', `Bearer ${user1Token}`)
      .send({
        title: 'Alex Tech Portfolio',
        personalInfo: {
          fullName: 'Alex Johnson',
          headline: 'Full-Stack Developer & CS Student',
          email: 'alex@example.com',
          phone: '+1 234 567 8900',
          location: 'San Francisco, CA',
          bio: 'Passionate student developer building modern web applications.',
          linkedIn: 'https://linkedin.com/in/alexjohnson',
          github: 'https://github.com/alexjohnson'
        },
        education: [
          {
            institution: 'Stanford University',
            degree: 'B.S.',
            department: 'Computer Science',
            startYear: '2022',
            graduationYear: '2026',
            cgpa: '3.9'
          }
        ],
        skills: [
          { name: 'JavaScript', category: 'Frontend', proficiency: 'Advanced' },
          { name: 'React', category: 'Frontend', proficiency: 'Advanced' },
          { name: 'Node.js', category: 'Backend', proficiency: 'Intermediate' },
          { name: 'MongoDB', category: 'Database', proficiency: 'Intermediate' }
        ],
        projects: [
          {
            title: 'AI Study Assistant',
            description: 'A web app that summarizes lecture notes.',
            technologies: ['React', 'Node.js', 'OpenAI'],
            githubUrl: 'https://github.com/alexjohnson/study-ai',
            liveDemoUrl: 'https://study-ai.demo.app'
          }
        ]
      });
    assert(createPortRes.status === 201 && createPortRes.body.portfolio._id, 'POST /api/portfolios creates portfolio');
    const portfolioId = createPortRes.body.portfolio._id;
    const portfolioSlug = createPortRes.body.portfolio.slug;
    assert(portfolioSlug === 'alex-tech-portfolio' || portfolioSlug.startsWith('alex'), `Generated unique slug: ${portfolioSlug}`);

    // 11. Draft Privacy: Public endpoint should reject draft portfolio
    const publicDraftRes = await request(app).get(`/api/public/portfolios/${portfolioSlug}`);
    assert(publicDraftRes.status === 404, 'Public route rejects unpublished draft with 404');

    // 12. Register second user to test ownership protection
    const regUser2 = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Sarah Connor',
        email: 'sarah@example.com',
        password: 'password123'
      });
    const user2Token = regUser2.body.token;

    // User 2 trying to access User 1's portfolio
    const user2AccessRes = await request(app)
      .get(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${user2Token}`);
    assert(user2AccessRes.status === 403, 'Forbidden 403 when User 2 accesses User 1 portfolio');

    // 13. Publish Portfolio
    const pubRes = await request(app)
      .patch(`/api/portfolios/${portfolioId}/publish`)
      .set('Authorization', `Bearer ${user1Token}`)
      .send({ status: 'published' });
    assert(pubRes.status === 200 && pubRes.body.status === 'published', 'PATCH /publish updates status to published');

    // 14. Public endpoint now serves published portfolio
    const publicPublishedRes = await request(app).get(`/api/public/portfolios/${portfolioSlug}`);
    assert(publicPublishedRes.status === 200 && publicPublishedRes.body.portfolio.personalInfo.fullName === 'Alex Johnson', 'Public route returns published portfolio');

    // 15. Update Portfolio
    const updateRes = await request(app)
      .put(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${user1Token}`)
      .send({
        title: 'Alex Johnson - Senior Portfolio',
        skills: [
          { name: 'TypeScript', category: 'Frontend', proficiency: 'Advanced' }
        ]
      });
    assert(updateRes.status === 200 && updateRes.body.portfolio.title === 'Alex Johnson - Senior Portfolio', 'PUT /portfolios/:id updates portfolio data');

    // 16. Delete Portfolio
    const delRes = await request(app)
      .delete(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${user1Token}`);
    assert(delRes.status === 200, 'DELETE /portfolios/:id deletes portfolio');

    // Verify deletion
    const verifyDelRes = await request(app)
      .get(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${user1Token}`);
    assert(verifyDelRes.status === 404, 'GET deleted portfolio returns 404');

    console.log(`\nTEST RESULTS: ${passed} Passed, ${failed} Failed.`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  }
};

testRunner();
