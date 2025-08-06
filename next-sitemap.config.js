/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mercaluz.net',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  i18n: {
    locales: ['fr', 'es', 'en'],
    defaultLocale: 'fr',
  },
};
