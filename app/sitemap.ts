import { MetadataRoute } from 'next';

const blogPosts = [
  'airbnb-listing-description-guide',
  'airbnb-photography-tips',
  'airbnb-pricing-strategy',
  'airbnb-seo-search-ranking',
  'airbnb-startup-cost',
  'airbnb-vs-booking-vs-vrbo',
  'airbnb-vs-vrbo-vs-booking-2026',
  'best-airbnb-amenities-2026',
  'dealing-with-difficult-airbnb-guests',
  'how-to-get-airbnb-5-star-reviews',
  'new-airbnb-host-checklist',
  'short-term-rental-tax-basics',
  'hostcopy-ai-vs-chatgpt',
  'hostcopy-ai-vs-copyai',
  'best-time-to-list-airbnb',
  'airbnb-superhost-requirements',
  'airbnb-house-rules-guide',
  'airbnb-instagram-marketing',
  'airbnb-title-that-gets-clicks',
  'booking-com-description-guide',
  'airbnb-hosting-glossary',
  'common-airbnb-description-mistakes',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hostcopyai.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://hostcopyai.com/booking-com-description-generator',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://hostcopyai.com/airbnb-title-generator',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://hostcopyai.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://hostcopyai.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://hostcopyai.com/seo-guide',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://hostcopyai.com/changelog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    ...blogPosts.map((slug) => ({
      url: `https://hostcopyai.com/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: 'https://hostcopyai.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://hostcopyai.com/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
