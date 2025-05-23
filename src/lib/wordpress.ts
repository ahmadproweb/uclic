import { WordPressPost } from "@/services/wordpress";

export interface TeamListMember {
  title: string;
  slug: string;
  date: string;
  equipeFields: {
    role: string;
    linkedin: string;
    twitter: string;
    autre: string;
    extrait: string;
    image: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    } | null;
    miniImage: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    } | null;
  };
}

export interface TeamMember {
  title: string;
  slug: string;
  content: string;
  equipeFields: {
    role: string;
    linkedin: string;
    twitter: string;
    autre: string;
    extrait: string;
    image: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    } | null;
    miniImage: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    } | null;
  };
}

export interface TeamResponse {
  data: {
    equipes: {
      nodes: TeamListMember[];
    };
  };
}

export interface ProductHunt {
  title: string;
  slug: string;
  productHuntFields: {
    id: string;
    name: string | null;
    productState: string | null;
    tagline: string | null;
    votesCount: number | null;
    day: string | null;
    featured: boolean;
    iosFeaturedAt: string | null;
    makersname: string | null;
    makersname1: string | null;
    makersname2: string | null;
    makersheadline: string | null;
    makersheadline1: string | null;
    makersheadline2: string | null;
    makerstwitterUsername: string | null;
    makerstwitterUsername1: string | null;
    makerstwitterUsername2: string | null;
    makerswebsiteUrl: string | null;
    makerswebsiteUrl1: string | null;
    makerswebsiteUrl2: string | null;
    logo: string | null;
    screenshotUrl: string | null;
    commentaire: string | null;
    categories: string | null;
  };
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface ProductHuntConnection {
  nodes: ProductHunt[];
  pageInfo: PageInfo;
  totalCount?: number;
}

export interface ProductHuntResponse {
  data: {
    producthunts: ProductHuntConnection;
  };
}

interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: Record<string, unknown>;
}

export interface ExpertiseFields {
  tag: string;
  h1: string;
  subtitle: string;
  h21: string;
  titrebox1: string;
  description1: string;
  titrebox2: string;
  description2: string;
  titrebox3: string;
  description3: string;
  marqueeRelatedCat: string | null;
  moreRelatedCat: string | null;
  h22: string;
  content2: string;
  processLittleTitle: string;
  processTitle: string;
  processDescription: string;
  processTitre1: string;
  processTitre2: string;
  processTitre3: string;
  descriptionTitre1: string;
  descriptionTitre2: string;
  descriptionTitre3: string;
  faqSubtitle: string;
  faqTitle1: string;
  faqDesc1: string;
  faqTitle2: string;
  faqDesc2: string;
  faqTitle3: string;
  faqDesc3: string;
  faqTitle4: string;
  faqDesc4: string;
  faqTitle5: string;
  faqDesc5: string;
  faqTitle6: string;
  faqDesc6: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Expertise {
  id: string;
  title: string;
  slug: string;
  expertiseFields: ExpertiseFields;
  expertiseGrowthCategories?: {
    nodes: Array<{
      name: string;
      slug: string;
      description?: string | null;
    }>;
  };
}

export interface ExpertiseResponse {
  data: {
    expertises: {
      nodes: Expertise[];
    };
  };
}

export interface ExpertiseCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
  description?: string;
}

export interface ExpertisePost {
  id: string;
  title: string;
  slug: string;
  uri: string;
  expertiseFields: ExpertiseFields;
  categories?: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls?: {
    [key: string]: string;
  };
  meta?: {
    role?: string;
    linkedin?: string;
    twitter?: string;
    autre?: string;
  };
  posts?: WordPressPost[];
  posts_count?: number;
}

export interface AuthorResponse {
  data: {
    user: Author;
  };
}

export async function fetchTeamData(): Promise<TeamMember[]> {
  try {
    const response = await fetch(`https://api.uclic.fr/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetTeamMembers {
            equipes(first: 100, where: { orderby: { field: DATE, order: ASC } }) {
              nodes {
                title
                slug
                content
                date
                equipeFields {
                  role
                  extrait
                  linkedin
                  twitter
                  autre
                  image {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                  miniImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", JSON.stringify(data.errors, null, 2));
      throw new Error(
        `GraphQL query failed: ${data.errors[0]?.message || "Unknown error"}`
      );
    }

    if (!data?.data?.equipes?.nodes) {
      console.error(
        "Invalid response structure:",
        JSON.stringify(data, null, 2)
      );
      return [];
    }

    return data.data.equipes.nodes.map((member: any) => ({
      ...member,
      equipeFields: {
        ...member.equipeFields,
        linkedin: member.equipeFields?.linkedin || "",
        twitter: member.equipeFields?.twitter || "",
        autre: member.equipeFields?.autre || "",
        role: member.equipeFields?.role || "",
        extrait: member.equipeFields?.extrait || "",
        image: member.equipeFields?.image || null,
        miniImage: member.equipeFields?.miniImage || null,
      },
    }));
  } catch (error) {
    console.error(
      "Error fetching team data:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return [];
  }
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  console.log("🔍 Fetching team member with slug:", slug);

  const query = `
    query GetTeamMember($slug: ID!) {
      equipe(id: $slug, idType: SLUG) {
        title
        slug
        content
        equipeFields {
          role
          extrait
          image {
            node {
              sourceUrl
              altText
            }
          }
          linkedin
          twitter
          autre
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query...");
    const response = await fetchAPI(query, { variables: { slug } });
    console.log("📦 Raw API response:", JSON.stringify(response, null, 2));

    if (!response?.equipe) {
      console.error("❌ No team member found in response");
      console.error("Response structure:", {
        hasEquipe: !!response?.equipe,
        responseKeys: response ? Object.keys(response) : [],
        fullResponse: response,
      });
      return null;
    }

    const member = response.equipe;
    console.log("🔍 Member structure:", {
      hasTitle: !!member.title,
      hasSlug: !!member.slug,
      hasContent: !!member.content,
      hasEquipeFields: !!member.equipeFields,
      equipeFieldsKeys: member.equipeFields
        ? Object.keys(member.equipeFields)
        : [],
      hasImage: !!member.equipeFields?.image,
      imageStructure: member.equipeFields?.image,
    });

    console.log("✅ Successfully fetched team member:", member.title);
    return member;
  } catch (error) {
    console.error("🚨 Error fetching team member:", error);
    console.error("Error details:", {
      slug,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  console.log("🔍 Fetching all team members");

  const query = `
    query GetTeamMembers {
      equipes(first: 100) {
        nodes {
          title
          slug
          content
          equipeFields {
            role
            extrait
            image {
              node {
                sourceUrl
                altText
              }
            }
            linkedin
            twitter
            autre
          }
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for team members...");
    const response = await fetchAPI(query);
    console.log("📦 Raw API response:", JSON.stringify(response, null, 2));

    if (!response?.equipes?.nodes) {
      console.error("❌ No team members found in response");
      console.error("Response structure:", {
        hasEquipes: !!response?.equipes,
        responseKeys: response ? Object.keys(response) : [],
        fullResponse: response,
      });
      return [];
    }

    const members = response.equipes.nodes;
    console.log(`✅ Successfully fetched ${members.length} team members`);
    return members;
  } catch (error) {
    console.error("🚨 Error fetching team members:", error);
    console.error("Error details:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return [];
  }
}

async function fetchAPI(
  query: string,
  {
    variables,
  }: { variables?: { [key: string]: string | number | boolean | null } } = {}
) {
  try {
    const res = await fetch("https://api.uclic.fr/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL Errors:", JSON.stringify(json.errors, null, 2));
      throw new Error(
        `GraphQL Error: ${(json.errors as GraphQLError[])
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    if (!json.data) {
      console.error("No data in response:", JSON.stringify(json, null, 2));
      throw new Error("No data received from GraphQL API");
    }

    return json.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function getToolboxItem(
  slug: string
): Promise<ProductHunt | null> {
  console.log("🔍 Fetching toolbox item with slug:", slug);

  const query = `
    query GetProductHuntBySlug($slug: ID!) {
      producthunt(id: $slug, idType: SLUG) {
        title
        slug
        content
        productHuntFields {
          id
          name
          productState
          tagline
          votesCount
          day
          featured
          iosFeaturedAt
          makersname
          makersname1
          makersname2
          makersheadline
          makersheadline1
          makersheadline2
          makerstwitterUsername
          makerstwitterUsername1
          makerstwitterUsername2
          makerswebsiteUrl
          makerswebsiteUrl1
          makerswebsiteUrl2
          logo
          screenshotUrl
          commentaire
        }
      }
      # Fetch recent tools for related content
      producthunts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          productHuntFields {
            tagline
            logo
          }
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for toolbox item...");
    const response = await fetchAPI(query, { variables: { slug } });

    if (!response?.producthunt) {
      console.error("❌ No toolbox item found in response");
      return null;
    }

    // Filter and map related tools
    const relatedTools = response.producthunts.nodes
      .filter((tool: ProductHunt) => tool.slug !== slug)
      .slice(0, 3); // Limit to 3 related tools

    // Add related tools to the main tool object
    const toolWithRelated = {
      ...response.producthunt,
      relatedTools,
    };

    console.log(
      "✅ Successfully fetched toolbox item:",
      response.producthunt.title
    );
    return toolWithRelated;
  } catch (error) {
    console.error("❌ Error fetching toolbox item:", error);
    return null;
  }
}

export async function fetchToolboxData(
  first: number = 100,
  after?: string
): Promise<ProductHuntConnection> {
  console.log("🔍 Fetching toolbox items with params:", { first, after });

  const query = `
    query GetToolboxItems($first: Int!, $after: String) {
      producthunts(
        first: $first
        after: $after
        where: { orderby: { field: DATE, order: DESC } }
      ) {
        nodes {
          id
          title
          slug
          date
          content
          productHuntFields {
            id
            name
            productState
            tagline
            votesCount
            day
            featured
            iosFeaturedAt
            makersname
            makersname1
            makersname2
            makersheadline
            makersheadline1
            makersheadline2
            makerstwitterUsername
            makerstwitterUsername1
            makerstwitterUsername2
            makerswebsiteUrl
            makerswebsiteUrl1
            makerswebsiteUrl2
            logo
            screenshotUrl
            commentaire
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  `;

  try {
    let allNodes: ProductHunt[] = [];
    let hasNextPage = true;
    let endCursor: string | null = after || null;

    while (hasNextPage) {
      const response = await fetchAPI(query, {
        variables: {
          first: 100,
          after: endCursor,
        },
      });

      if (!response?.producthunts?.nodes) {
        break;
      }

      allNodes = [...allNodes, ...response.producthunts.nodes];
      hasNextPage = response.producthunts.pageInfo.hasNextPage;
      endCursor = response.producthunts.pageInfo.endCursor;
    }

    return {
      nodes: allNodes,
      pageInfo: {
        endCursor: allNodes.length > 0 ? endCursor || "" : "",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
      },
      totalCount: allNodes.length,
    };
  } catch (error) {
    console.error("🚨 Error fetching toolbox items:", error);
    console.error("Error details:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return {
      nodes: [],
      pageInfo: {
        endCursor: "",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
      },
      totalCount: 0,
    };
  }
}

export async function checkProductHuntSchema(): Promise<void> {
  const query = `
    query IntrospectionQuery {
      __type(name: "ProductHunt") {
        name
        fields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  `;

  try {
    console.log("🔍 Checking ProductHunt schema...");
    const response = await fetchAPI(query, {});
    console.log("📦 Schema response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("🚨 Error checking schema:", error);
  }
}

export async function getExpertise(slug: string): Promise<Expertise | null> {
  console.log("🔍 Fetching expertise with slug:", slug);

  const query = `
    query GetExpertise($slug: ID!) {
      expertise(id: $slug, idType: URI) {
        id
        title
        slug
        expertiseFields {
          tag
          h1
          subtitle
          h21
          titrebox1
          description1
          titrebox2
          description2
          titrebox3
          description3
          marqueeRelatedCat
          moreRelatedCat
          h22
          content2
          processLittleTitle
          processTitle
          processDescription
          processTitre1
          processTitre2
          processTitre3
          descriptionTitre1
          descriptionTitre2
          descriptionTitre3
          faqSubtitle
          faqTitle1
          faqDesc1
          faqTitle2
          faqDesc2
          faqTitle3
          faqDesc3
          faqTitle4
          faqDesc4
          faqTitle5
          faqDesc5
          faqTitle6
          faqDesc6
          metaTitle
          metaDescription
        }
        expertiseGrowthCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for expertise...");
    const response = await fetchAPI(query, {
      variables: { slug: `expertise/${slug}` },
    });

    if (!response?.expertise) {
      console.error("❌ No expertise found in response");
      return null;
    }

    // Add category information to the expertise object
    const expertise = {
      ...response.expertise,
      category:
        response.expertise.expertiseGrowthCategories?.nodes?.[0] || null,
    };

    console.log("✅ Successfully fetched expertise:", expertise.title);
    console.log("Category:", expertise.category);
    return expertise;
  } catch (error) {
    console.error("🚨 Error fetching expertise:", error);
    return null;
  }
}

export async function getAllExpertises(): Promise<Expertise[]> {
  console.log("🔍 Fetching all expertises");

  const query = `
    query GetExpertises {
      expertises {
        nodes {
          id
          title
          slug
          expertiseFields {
            tag
            h1
            subtitle
            h21
            titrebox1
            description1
            titrebox2
            description2
            titrebox3
            description3
            marqueeRelatedCat
            moreRelatedCat
            h22
            content2
            processLittleTitle
            processTitle
            processDescription
            processTitre1
            processTitre2
            processTitre3
            descriptionTitre1
            descriptionTitre2
            descriptionTitre3
            faqSubtitle
            faqTitle1
            faqDesc1
            faqTitle2
            faqDesc2
            faqTitle3
            faqDesc3
            faqTitle4
            faqDesc4
            faqTitle5
            faqDesc5
            faqTitle6
            faqDesc6
            metaTitle
            metaDescription
          }
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for expertises...");
    const response = await fetchAPI(query);

    if (!response?.expertises?.nodes) {
      console.error("❌ No expertises found in response");
      return [];
    }

    console.log(
      `✅ Successfully fetched ${response.expertises.nodes.length} expertises`
    );
    return response.expertises.nodes;
  } catch (error) {
    console.error("🚨 Error fetching expertises:", error);
    return [];
  }
}

export async function getExpertiseCategories(): Promise<ExpertiseCategory[]> {
  console.log("🔍 Fetching expertise growth categories");

  const query = `
    query GetAllExpertiseGrowthCategories {
      expertiseGrowthCategories {
        nodes {
          name
          slug
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for expertise categories...");
    const response = await fetchAPI(query);
    console.log("📦 Raw taxonomy response:", JSON.stringify(response, null, 2));

    if (!response?.expertiseGrowthCategories?.nodes) {
      console.error("❌ No expertise categories found in response");
      console.error("Response structure:", {
        hasCategories: !!response?.expertiseGrowthCategories,
        responseKeys: response ? Object.keys(response) : [],
        fullResponse: response,
      });
      return [];
    }

    const categories = response.expertiseGrowthCategories.nodes;

    console.log(
      `✅ Successfully fetched ${categories.length} expertise categories`
    );
    console.log(
      "Categories:",
      categories.map((cat: { name: string; slug: string }) => ({
        name: cat.name,
        slug: cat.slug,
      }))
    );

    return categories;
  } catch (error) {
    console.error("🚨 Error fetching expertise categories:", error);
    return [];
  }
}

export async function getExpertisePostsByCategory(
  categorySlug: string
): Promise<ExpertisePost[]> {
  console.log("🔍 Fetching expertise posts for category:", categorySlug);

  const query = `
    query GetExpertisesByCategory($categorySlug: String!) {
      expertises(
        where: {
          taxQuery: {
            taxArray: [
              {
                taxonomy: EXPERTISEGROWTHCATEGORY
                terms: [$categorySlug]
                field: SLUG
                operator: IN
              }
            ]
          }
        }
      ) {
        nodes {
          id
          title
          slug
          uri
          expertiseFields {
            tag
            h1
            subtitle
          }
          expertiseGrowthCategories {
            nodes {
              name
              slug
              description
            }
          }
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for posts...");
    const response = await fetchAPI(query, { variables: { categorySlug } });

    console.log("📦 Raw response:", JSON.stringify(response, null, 2));

    if (!response?.expertises?.nodes) {
      console.error("❌ No expertises found");
      console.error("Response structure:", response);
      return [];
    }

    const posts = response.expertises.nodes.map((post: any) => ({
      ...post,
      categories: {
        nodes: [
          {
            name: post.expertiseGrowthCategories?.nodes?.[0]?.name || "",
            slug: post.expertiseGrowthCategories?.nodes?.[0]?.slug || "",
            description:
              post.expertiseGrowthCategories?.nodes?.[0]?.description || "",
          },
        ],
      },
    }));

    console.log(
      `✅ Successfully fetched ${posts.length} expertise posts for category ${categorySlug}`
    );
    console.log(
      "Posts:",
      posts.map((post: any) => ({
        title: post.title,
        slug: post.slug,
        uri: post.uri,
        tag: post.expertiseFields?.tag,
        categoryName: post.expertiseGrowthCategories?.nodes?.[0]?.name,
      }))
    );

    return posts;
  } catch (error) {
    console.error("🚨 Error fetching posts:", error);
    console.error("Error details:", {
      categorySlug,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return [];
  }
}

export async function getAuthor(slug: string): Promise<Author | null> {
  console.log("🔍 Fetching author with slug:", slug);

  const query = `
    query GetAuthor($slug: ID!) {
      user(id: $slug, idType: SLUG) {
        id
        name
        slug
        description
        avatar {
          url
        }
        posts(first: 100) {
          nodes {
            id
            title
            content
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for author...");
    const response = await fetchAPI(query, { variables: { slug } });

    if (!response?.user) {
      console.error("❌ No author found in response");
      return null;
    }

    // Transform the response to Author format
    const author: Author = {
      id: response.user.id,
      name: response.user.name,
      slug: response.user.slug,
      description: response.user.description || "",
      avatar_urls: {
        "96":
          response.user.avatar?.url?.replace(/\?.*$/, "") ||
          "/images/default-avatar.png",
      },
      meta: {
        role: "",
        linkedin: "",
        twitter: "",
        autre: "",
      },
      posts: response.user.posts?.nodes.map((post: any) => ({
        id: post.id,
        title: {
          rendered: post.title || "",
        },
        content: {
          rendered: post.content || "",
        },
        excerpt: {
          rendered: post.excerpt || "",
        },
        slug: post.slug,
        date: post.date,
        _embedded: {
          "wp:featuredmedia": post.featuredImage
            ? [
                {
                  source_url: post.featuredImage.node.sourceUrl,
                  alt_text: post.featuredImage.node.altText,
                },
              ]
            : undefined,
          "wp:term": post.categories
            ? [
                post.categories.nodes.map((cat: any) => ({
                  name: cat.name,
                  slug: cat.slug,
                })),
              ]
            : undefined,
        },
      })),
      posts_count: response.user.posts?.nodes.length || 0,
    };

    console.log("✅ Successfully fetched author:", author.name);
    return author;
  } catch (error) {
    console.error("🚨 Error fetching author:", error);
    return null;
  }
}

export async function getAllAuthors(): Promise<Author[]> {
  console.log("🔍 Fetching all authors");

  const query = `
    query GetAllAuthors {
      users(first: 100) {
        nodes {
          id
          name
          slug
          description
          avatar {
            url
          }
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for authors...");
    const response = await fetchAPI(query);

    if (!response?.users?.nodes) {
      console.error("❌ No authors found in response");
      return [];
    }

    const authors: Author[] = response.users.nodes.map((user: any) => ({
      id: user.id,
      name: user.name,
      slug: user.slug,
      description: user.description || "",
      avatar_urls: {
        "96": user.avatar?.url || "",
      },
    }));

    console.log(`✅ Successfully fetched ${authors.length} authors`);
    return authors;
  } catch (error) {
    console.error("🚨 Error fetching authors:", error);
    return [];
  }
}

// Levee types and queries
export interface Levee {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  seo?: {
    title: string;
    description: string;
    canonicalUrl: string;
    robots: string[];
    openGraph: {
      title: string;
      description: string;
      url: string;
      siteName: string;
      locale: string;
      type: string;
      image: {
        url: string;
        width: number;
        height: number;
      };
      articleMeta: {
        section: string;
      };
      twitterMeta: {
        card: string;
        title: string;
        description: string;
      };
    };
  };
}

const GetAllLevees = `
  query GetAllLevees {
    levees(first: 10000) {
      nodes {
        id
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const GetLeveeBySlug = `
  query GetLeveeBySlug($slug: ID!) {
    levee(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      seo {
        title
        description
        canonicalUrl
        robots
        openGraph {
          title
          description
          url
          siteName
          locale
          type
          image {
            url
            width
            height
          }
          articleMeta {
            section
          }
          twitterMeta {
            card
            title
            description
          }
        }
      }
    }
  }
`;

const GetRelatedLevees = `
  query GetRelatedLevees($excludeId: ID!, $first: Int!) {
    levees(first: $first, where: { notIn: [$excludeId] }) {
      nodes {
        id
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export async function getAllLevees(): Promise<Levee[]> {
  try {
    const query = `
      query GetAllLevees($first: Int!, $after: String) {
        levees(
          first: $first
          after: $after
          where: { orderby: { field: DATE, order: DESC } }
        ) {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

    let allLevees: Levee[] = [];
    let hasNextPage = true;
    let endCursor: string | null = null;

    while (hasNextPage) {
      const response = await fetchAPI(query, {
        variables: {
          first: 100,
          after: endCursor,
        },
      });

      if (!response?.levees?.nodes) {
        break;
      }

      allLevees = [...allLevees, ...response.levees.nodes];
      hasNextPage = response.levees.pageInfo.hasNextPage;
      endCursor = response.levees.pageInfo.endCursor;
    }

    return allLevees;
  } catch (error) {
    console.error("Error fetching all levees:", error);
    return [];
  }
}

export async function getLeveeBySlug(slug: string): Promise<Levee | null> {
  try {
    const response = await fetchAPI(GetLeveeBySlug, { variables: { slug } });
    return response.levee;
  } catch (error) {
    console.error("Error fetching levee by slug:", error);
    return null;
  }
}

export async function getRelatedLevees(
  excludeId: string,
  first: number = 3
): Promise<Levee[]> {
  try {
    const response = await fetchAPI(GetRelatedLevees, {
      variables: { excludeId, first },
    });
    return response.levees.nodes;
  } catch (error) {
    console.error("Error fetching related levees:", error);
    return [];
  }
}

export async function getLatestLevees(
  first: number = 3,
  excludeIds: string[] = []
): Promise<Levee[]> {
  try {
    const response = await fetchAPI(GetAllLevees);
    const levees = response.levees.nodes;
    return levees
      .filter((levee: Levee) => !excludeIds.includes(levee.id))
      .slice(0, first);
  } catch (error) {
    console.error("Error fetching latest levees:", error);
    return [];
  }
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export async function getPortfolioBySlug(
  slug: string
): Promise<Portfolio | null> {
  const query = `
    query GetPortfolioBySlug($slug: ID!) {
      portfolio(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  try {
    const response = await fetchAPI(query, { variables: { slug } });
    return response.portfolio;
  } catch (error) {
    console.error("Error fetching portfolio by slug:", error);
    return null;
  }
}

export async function getRelatedPortfolios(
  excludeId: string,
  first: number = 3
): Promise<Portfolio[]> {
  const query = `
    query GetRelatedPortfolios($excludeId: ID!, $first: Int!) {
      portfolios(first: $first, where: { notIn: [$excludeId] }) {
        nodes {
          id
          title
          slug
          date
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetchAPI(query, { variables: { excludeId, first } });
    return response.portfolios.nodes;
  } catch (error) {
    console.error("Error fetching related portfolios:", error);
    return [];
  }
}

export async function getLatestPortfolios(
  first: number = 3,
  excludeIds: string[] = []
): Promise<Portfolio[]> {
  const query = `
    query GetLatestPortfolios($first: Int!, $excludeIds: [ID!]) {
      portfolios(first: $first, where: { notIn: $excludeIds }) {
        nodes {
          id
          title
          slug
          date
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetchAPI(query, {
      variables: {
        first,
        excludeIds: excludeIds.length > 0 ? excludeIds.join(",") : null,
      },
    });
    // Trier les résultats par date côté client
    const sortedPortfolios = response.portfolios.nodes.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedPortfolios;
  } catch (error) {
    console.error("Error fetching latest portfolios:", error);
    return [];
  }
}

export interface ExpertiseGrowthCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface ExpertiseByCategory {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  expertiseFields?: {
    subtitle?: string;
  };
  expertiseGrowthCategories: {
    nodes: ExpertiseGrowthCategory[];
  };
}

export async function getAllExpertiseGrowthCategoriesForMenu(): Promise<
  ExpertiseGrowthCategory[]
> {
  const query = `
    query GetAllExpertiseGrowthCategories {
      expertiseGrowthCategories(first: 100) {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `;

  try {
    const response = await fetchAPI(query);
    return response.expertiseGrowthCategories.nodes;
  } catch (error) {
    console.error(
      "Error fetching expertise growth categories for menu:",
      error
    );
    return [];
  }
}

export async function getExpertisesByCategory(
  categorySlug: string
): Promise<ExpertiseByCategory[]> {
  const query = `
    query GetExpertiseByCategory($categorySlug: String!) {
      expertises(
        where: {
          taxQuery: {
            taxArray: [
              {
                taxonomy: EXPERTISEGROWTHCATEGORY
                terms: [$categorySlug]
                field: SLUG
                operator: IN
              }
            ]
          }
        }
        first: 100
      ) {
        nodes {
          id
          title
          slug
          date
          content
          expertiseGrowthCategories {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetchAPI(query, { variables: { categorySlug } });
    return response.expertises.nodes;
  } catch (error) {
    console.error(
      `Error fetching expertises for category ${categorySlug}:`,
      error
    );
    return [];
  }
}

export interface ExpertiseCategoryFields {
  tag: string;
  h1: string;
  subtitle: string;
  h21: string;
  titrebox1: string;
  description1: string;
  titrebox2: string;
  description2: string;
  titrebox3: string;
  description3: string;
  marqueeRelatedCat: string;
  moreRelatedCat: string;
  h22: string;
  content2: string;
  processLittleTitle: string;
  processTitle: string;
  processDescription: string;
  processTitre1: string;
  processTitre2: string;
  processTitre3: string;
  descriptionTitre1: string;
  descriptionTitre2: string;
  descriptionTitre3: string;
  faqSubtitle: string;
  faqTitle1: string;
  faqDesc1: string;
  faqTitle2: string;
  faqDesc2: string;
  faqTitle3: string;
  faqDesc3: string;
  faqTitle4: string;
  faqDesc4: string;
  faqTitle5: string;
  faqDesc5: string;
  faqTitle6: string;
  faqDesc6: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ExpertiseCategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  expertiseFields: ExpertiseCategoryFields;
}

export async function getExpertiseCategory(
  categorySlug: string
): Promise<ExpertiseCategoryData | null> {
  console.log("🔍 Fetching expertise category with slug:", categorySlug);

  const query = `
    query GetExpertiseCategory($categorySlug: ID!) {
      expertiseGrowthCategory(id: $categorySlug, idType: SLUG) {
        id
        name
        slug
        description
        expertiseFields {
          tag
          h1
          subtitle
          h21
          titrebox1
          description1
          titrebox2
          description2
          titrebox3
          description3
          marqueeRelatedCat
          moreRelatedCat
          h22
          content2
          processLittleTitle
          processTitle
          processDescription
          processTitre1
          processTitre2
          processTitre3
          descriptionTitre1
          descriptionTitre2
          descriptionTitre3
          faqSubtitle
          faqTitle1
          faqDesc1
          faqTitle2
          faqDesc2
          faqTitle3
          faqDesc3
          faqTitle4
          faqDesc4
          faqTitle5
          faqDesc5
          faqTitle6
          faqDesc6
          metaTitle
          metaDescription
        }
      }
    }
  `;

  try {
    console.log("📡 Sending GraphQL query for expertise category...");
    const response = await fetchAPI(query, { variables: { categorySlug } });

    if (!response?.expertiseGrowthCategory) {
      console.error("❌ No expertise category found in response");
      return null;
    }

    console.log(
      "✅ Successfully fetched expertise category:",
      response.expertiseGrowthCategory.name
    );
    return response.expertiseGrowthCategory;
  } catch (error) {
    console.error("🚨 Error fetching expertise category:", error);
    return null;
  }
}
