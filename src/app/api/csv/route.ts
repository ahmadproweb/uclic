import { NextResponse } from 'next/server';
import { getExpertiseCategories, getExpertisesByCategory } from '@/lib/wordpress';

export async function GET() {
  try {
    const categories = await getExpertiseCategories();
    
    const expertisesByCategory = await Promise.all(
      categories.map(async (category) => {
        const expertises = await getExpertisesByCategory(category.slug);
        return {
          category,
          expertises
        };
      })
    );

    // En-têtes complets pour Google Ads
    const csvHeaders = [
      'Campaign',
      'Labels',
      'Campaign Type',
      'Networks',
      'Budget',
      'Budget type',
      'Standard conversion goals',
      'Customer acquisition',
      'Languages',
      'Bid Strategy Type',
      'Bid Strategy Name',
      'Enhanced CPC',
      'Start Date',
      'End Date',
      'Broad match keywords',
      'Ad Schedule',
      'Ad rotation',
      'Content exclusions',
      'Targeting method',
      'Exclusion method',
      'DSA Website',
      'DSA Language',
      'DSA targeting source',
      'DSA page feeds',
      'Audience targeting',
      'Flexible Reach',
      'Text asset automation',
      'Final URL expansion',
      'Final URL suffix',
      'Campaign Status'
    ];

    // Générer une ligne par expertise
    const rows = expertisesByCategory.flatMap(({ category, expertises }) => {
      return expertises.map(expertise => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://uclic.fr';
        const finalUrl = `${baseUrl}/expertise/${category.slug}/${expertise.slug}`;
        
        return [
          `Uclic - Agence Intelligence Artificielle - ${expertise.title}`, // Campaign (nom de l'expertise)
          '', // Labels
          'Search', // Campaign Type
          'Google search;Search Partners;Display Network', // Networks
          '50.00', // Budget
          'Daily', // Budget type
          'Account-level', // Standard conversion goals
          'Bid equally', // Customer acquisition
          'fr', // Languages
          'Manual CPC', // Bid Strategy Type
          '', // Bid Strategy Name
          'Disabled', // Enhanced CPC
          '[]', // Start Date
          '[]', // End Date
          'Off', // Broad match keywords
          '[]', // Ad Schedule
          'Optimize for clicks', // Ad rotation
          '[]', // Content exclusions
          'Location of presence or Area of interest', // Targeting method
          'Location of presence', // Exclusion method
          'uclic.fr', // DSA Website
          'fr', // DSA Language
          'Google and Page feed', // DSA targeting source
          '', // DSA page feeds
          'Audience', // Audience targeting
          'Audience segments', // Flexible Reach
          'Disabled', // Text asset automation
          'Disabled', // Final URL expansion
          finalUrl, // Final URL suffix
          'Enabled' // Campaign Status
        ];
      });
    });

    // Convertir en CSV avec encodage UTF-8
    const csvContent = [
      csvHeaders.join(','),
      ...rows.map(row => row.map(cell => {
        // Échapper les guillemets et entourer de guillemets si nécessaire
        const escaped = cell.replace(/"/g, '""');
        return /[,"\n]/.test(cell) ? `"${escaped}"` : cell;
      }).join(','))
    ].join('\n');

    // Ajouter le BOM UTF-8 pour Excel
    const utf8BOM = '\uFEFF';
    
    return new NextResponse(utf8BOM + csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="uclic-google-ads-campaign.csv"'
      }
    });
  } catch (error) {
    console.error('Error generating CSV:', error);
    return new NextResponse('Error generating CSV', { status: 500 });
  }
} 