export interface WordPressPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  pagetypes: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
} 