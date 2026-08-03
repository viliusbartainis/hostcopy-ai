import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
return [
{
url: 'https://hostcopy-ai.vercel.app',
lastModified: new Date(),
changeFrequency: 'weekly',
priority: 1,
},
{
url: 'https://hostcopy-ai.vercel.app/blog',
lastModified: new Date(),
changeFrequency: 'weekly',
priority: 0.8,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/airbnb-listing-description-guide',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/airbnb-photography-tips',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/airbnb-pricing-strategy',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/airbnb-seo-search-ranking',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/airbnb-startup-cost',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/airbnb-vs-booking-vs-vrbo',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/best-airbnb-amenities-2026',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/dealing-with-difficult-airbnb-guests',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/how-to-get-airbnb-5-star-reviews',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/new-airbnb-host-checklist',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/short-term-rental-tax-basics',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
{
url: 'https://hostcopy-ai.vercel.app/blog/hostcopy-ai-vs-chatgpt',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.7,
},
];
}
