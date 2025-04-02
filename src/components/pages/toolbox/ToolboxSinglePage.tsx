import React from 'react';
import { ProductHunt } from '@/lib/wordpress';
import { formatDate } from '@/lib/utils';
import { FaTwitter } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';

interface ToolboxSinglePageProps {
  item: ProductHunt;
}

export default function ToolboxSinglePage({ item }: ToolboxSinglePageProps) {
  const makers = [
    {
      name: item.productHuntFields?.makersname,
      headline: item.productHuntFields?.makersheadline,
      twitter: item.productHuntFields?.makerstwitterUsername,
      website: item.productHuntFields?.makerswebsiteUrl,
    },
    {
      name: item.productHuntFields?.makersname1,
      headline: item.productHuntFields?.makersheadline1,
      twitter: item.productHuntFields?.makerstwitterUsername1,
      website: item.productHuntFields?.makerswebsiteUrl1,
    },
    {
      name: item.productHuntFields?.makersname2,
      headline: item.productHuntFields?.makersheadline2,
      twitter: item.productHuntFields?.makerstwitterUsername2,
      website: item.productHuntFields?.makerswebsiteUrl2,
    },
  ].filter((maker) => maker.name);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Logo */}
          <div className="w-32 h-32 relative flex-shrink-0">
            <img
              src={item.productHuntFields?.logo || '/placeholder.png'}
              alt={item.title}
              width="128"
              height="128"
              className="rounded-lg object-contain w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Title and Basic Info */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{item.productHuntFields?.tagline}</p>
            <div className="flex items-center gap-4">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                {item.productHuntFields?.productState}
              </span>
              <span className="text-gray-500 text-sm">
                Publié le {formatDate(item.date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot and Description */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Screenshot */}
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <img
            src={item.productHuntFields?.screenshotUrl || '/placeholder.png'}
            alt={`${item.title} screenshot`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Description and Stats */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Notre avis</h2>
            <div className="prose max-w-none" 
                 dangerouslySetInnerHTML={{ __html: item.productHuntFields?.commentaire || '' }} 
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Statistiques Product Hunt</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Votes</p>
                  <p className="text-2xl font-bold">{item.productHuntFields?.votesCount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Featured</p>
                  <p className="text-2xl font-bold">{item.productHuntFields?.featured ? 'Oui' : 'Non'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Makers Section */}
      {makers.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Makers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {makers.map((maker, index) => (
              maker.name && (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{maker.name}</h3>
                  {maker.headline && (
                    <p className="text-gray-600 text-sm mb-3">{maker.headline}</p>
                  )}
                  <div className="flex gap-3">
                    {maker.twitter && (
                      <a
                        href={`https://twitter.com/${maker.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    )}
                    {maker.website && (
                      <a
                        href={maker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <CgWebsite className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 