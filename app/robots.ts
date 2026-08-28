import { MetadataRoute } from 'next';

// See also /llms.txt (public/llms.txt) — a plain-text guide for AI
// crawlers/assistants summarizing what HostCopy AI is and linking to
// key pages. Not part of the Robots Exclusion Protocol, so it isn't
// referenced from this file's output, just documented here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://hostcopyai.com/sitemap.xml',
  };
}
