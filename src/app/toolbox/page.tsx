import ToolboxArchiveClientSide from '@/components/pages/toolbox/ToolboxArchiveClientSide';
import { fetchToolboxData } from '@/lib/wordpress';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ToolboxPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const pageSize = 12;
  
  // For pages > 1, we need to fetch all previous pages to get the correct cursor
  let cursor = undefined;
  
  if (page > 1) {
    // First fetch all items up to the current page
    const previousData = await fetchToolboxData(pageSize * (page - 1));
    
    if (previousData.nodes.length > 0) {
      cursor = previousData.pageInfo.endCursor;
    }
  }
  
  // Now fetch the current page data using the cursor
  const currentPageData = await fetchToolboxData(pageSize, cursor);
  
  // Calculate total count based on current page data and pagination info
  let estimatedTotalCount;
  if (currentPageData.pageInfo.hasNextPage) {
    // If there are more pages, estimate the total count
    estimatedTotalCount = (page * pageSize) + pageSize;
  } else {
    // If this is the last page, calculate exact count
    estimatedTotalCount = ((page - 1) * pageSize) + currentPageData.nodes.length;
  }
  
  return (
    <ToolboxArchiveClientSide 
      tools={currentPageData.nodes}
      pageInfo={currentPageData.pageInfo}
      currentPage={page}
      totalCount={estimatedTotalCount}
      pageSize={pageSize}
    />
  );
}

// Métadonnées de la page
export const metadata = {
  title: 'Toolbox - Notre sélection d\'outils pour votre croissance | Uclic',
  description: 'Découvrez notre sélection d\'outils et de ressources pour développer votre activité efficacement.',
}; 