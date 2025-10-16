import createNextIntlPlugin from 'next-intl/plugin';

// Connect the next-intl plugin to load messages via src/i18n/request.js
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
