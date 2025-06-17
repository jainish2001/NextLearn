const coursesData = require('./src/data/courseinfo.json');

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://next-learn-seven-plum.vercel.app/',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,

  additionalPaths: async () => {
    const staticPaths = [
      { loc: '/', lastmod: new Date().toISOString() },
      { loc: '/courses', lastmod: new Date().toISOString() },
      { loc: '/terms', lastmod: new Date().toISOString() },
      { loc: '/privacy', lastmod: new Date().toISOString() },
    ];

    const coursePaths = coursesData.map((course) => {
      // Create the slug based on the course ID and title
      const slug = `${course.id}-${course.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphen
        .replace(/(^-|-$)/g, '')}`;    // Remove leading/trailing hyphens
    
      return {
        loc: `/courses/${slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      };
    });
    
    return [...staticPaths, ...coursePaths];
  },
};

module.exports = config;
