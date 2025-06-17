const coursesData = require('./data/courses'); // Import the static data

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

    const coursePaths = coursesData.map((course) => ({
      loc: `/courses/${course.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8
    }));

    return [...staticPaths, ...coursePaths];
  },
};

module.exports = config;
