const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../server');

let mongoServer;

const runE2EWorkflowTests = async () => {
  console.log('\n======================================================');
  console.log('   FULL END-TO-END WORKFLOW & PRIVACY VERIFICATION   ');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  const testStep = (condition, name, details = '') => {
    if (condition) {
      console.log(`[OK] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} ${details}`);
      failed++;
    }
  };

  try {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Step 1: User Registration
    const regRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'securePassword123'
      });
    testStep(regRes.status === 201 && regRes.body.token, 'Step 1: Student registers account');
    const token = regRes.body.token;

    // Step 2: Form Input - Create Draft Portfolio
    const createRes = await request(app)
      .post('/api/portfolios')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Jane Doe - Computer Systems Portfolio',
        status: 'draft',
        personalInfo: {
          fullName: 'Jane Doe',
          headline: 'Systems Engineer & Open Source Contributor',
          email: 'jane.doe@example.com',
          phone: '+1 415 555 2671',
          location: 'Seattle, WA',
          bio: 'Undergraduate student passionate about high performance systems and databases.',
          linkedIn: 'https://linkedin.com/in/janedoe',
          github: 'https://github.com/janedoe'
        },
        education: [
          {
            institution: 'University of Washington',
            degree: 'B.S. Computer Engineering',
            department: 'Paul G. Allen School',
            startYear: '2021',
            graduationYear: '2025',
            cgpa: '3.95'
          }
        ],
        skills: [
          { name: 'C++', category: 'Programming Languages', proficiency: 'Advanced' },
          { name: 'Rust', category: 'Programming Languages', proficiency: 'Intermediate' },
          { name: 'Distributed Systems', category: 'Core Computer Science', proficiency: 'Advanced' }
        ],
        projects: [
          {
            title: 'LSM-Tree Key-Value Engine',
            description: 'Custom write-optimized embedded key-value store with write-ahead logging and SSTables.',
            technologies: ['C++', 'CMake', 'Google Benchmark'],
            githubUrl: 'https://github.com/janedoe/kv-engine'
          }
        ],
        experience: [
          {
            organization: 'Operating Systems Research Group',
            role: 'Undergraduate Researcher',
            startDate: 'Jan 2024',
            endDate: 'Present',
            description: 'Investigating memory tiering in Linux kernels.'
          }
        ],
        certifications: [
          {
            title: 'Linux Foundation Certified System Administrator (LFCS)',
            issuingOrganization: 'The Linux Foundation',
            issueDate: 'Aug 2023'
          }
        ],
        achievements: [
          {
            title: 'Dean’s Honor List',
            date: '2022 - 2024',
            description: 'Ranked in top 5% of engineering cohort.'
          }
        ]
      });

    testStep(createRes.status === 201, 'Step 2: Student creates complete draft portfolio');
    const portfolio = createRes.body.portfolio;
    const portfolioId = portfolio._id;
    const slug = portfolio.slug;

    // Step 3: Verify Unique Slug Generation
    testStep(slug.includes('jane-doe'), 'Step 3: Unique slug created automatically', `(slug: ${slug})`);

    // Step 4: Verify Draft Privacy: Anonymous visitor must get 404
    const draftPublicRes = await request(app).get(`/api/public/portfolios/${slug}`);
    testStep(draftPublicRes.status === 404, 'Step 4: Draft portfolio remains private and returns 404 on public route');

    // Step 5: Edit Portfolio
    const editRes = await request(app)
      .put(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Jane Doe - Lead Systems Portfolio',
        skills: [
          { name: 'C++', category: 'Programming Languages', proficiency: 'Expert' },
          { name: 'Go', category: 'Backend Development', proficiency: 'Advanced' }
        ]
      });
    testStep(editRes.status === 200 && editRes.body.portfolio.skills.length === 2, 'Step 5: Student edits and updates saved portfolio');

    // Step 6: Publish Portfolio
    const publishRes = await request(app)
      .patch(`/api/portfolios/${portfolioId}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'published' });
    testStep(publishRes.status === 200 && publishRes.body.status === 'published', 'Step 6: Student publishes portfolio');

    // Step 7: Public Access Verification
    const publishedPublicRes = await request(app).get(`/api/public/portfolios/${slug}`);
    testStep(
      publishedPublicRes.status === 200 &&
      publishedPublicRes.body.portfolio.personalInfo.fullName === 'Jane Doe' &&
      publishedPublicRes.body.portfolio.projects.length === 1,
      'Step 7: Public route serves published portfolio to unauthenticated visitor'
    );

    // Step 8: Multi-user Ownership and Access Control
    const hackerReg = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Intruder',
        email: 'intruder@example.com',
        password: 'password123'
      });
    const hackerToken = hackerReg.body.token;

    const unauthorizedEdit = await request(app)
      .put(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${hackerToken}`)
      .send({ title: 'Hacked Title' });
    testStep(unauthorizedEdit.status === 403, 'Step 8a: Other users forbidden (403) from editing portfolio');

    const unauthorizedDelete = await request(app)
      .delete(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${hackerToken}`);
    testStep(unauthorizedDelete.status === 403, 'Step 8b: Other users forbidden (403) from deleting portfolio');

    // Step 9: Unpublish and verify immediate removal from public route
    const unpublishRes = await request(app)
      .patch(`/api/portfolios/${portfolioId}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'draft' });
    testStep(unpublishRes.status === 200 && unpublishRes.body.status === 'draft', 'Step 9a: Student unpublishes portfolio to draft');

    const publicAfterUnpublish = await request(app).get(`/api/public/portfolios/${slug}`);
    testStep(publicAfterUnpublish.status === 404, 'Step 9b: Unpublished portfolio immediately becomes unavailable publicly (404)');

    // Step 10: Delete Portfolio
    const deleteRes = await request(app)
      .delete(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${token}`);
    testStep(deleteRes.status === 200, 'Step 10: Student deletes portfolio with confirmation');

    const verifyAfterDelete = await request(app)
      .get(`/api/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${token}`);
    testStep(verifyAfterDelete.status === 404, 'Step 11: Deleted portfolio returns 404');

    console.log(`\n======================================================`);
    console.log(`WORKFLOW TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`======================================================\n`);

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  }
};

runE2EWorkflowTests();
