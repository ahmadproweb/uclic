export interface Portfolio {
  id: string;
  title: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  } | null;
}

export interface PortfolioResponse {
  portfolios: {
    nodes: Portfolio[];
  };
} 