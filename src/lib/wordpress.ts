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
      }
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
      }
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

export async function fetchTeamData(): Promise<TeamListMember[]> {
  try {
    const response = await fetch('https://uclic.fr/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          equipes {
            nodes {
              title
              slug
              date
              equipeFields {
                role
                linkedin
                twitter
                autre
                extrait
                image {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }`,
        variables: {}
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: TeamResponse = await response.json();
    // Trier les membres par date (du plus ancien au plus récent)
    return data.data.equipes.nodes.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } catch (error) {
    console.error('Error fetching team data:', error);
    return [];
  }
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  console.log('🔍 Fetching team member with slug:', slug);
  
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
    console.log('📡 Sending GraphQL query...');
    const response = await fetchAPI(query, { variables: { slug } });
    console.log('📦 Raw API response:', JSON.stringify(response, null, 2));

    if (!response?.equipe) {
      console.error('❌ No team member found in response');
      console.error('Response structure:', {
        hasEquipe: !!response?.equipe,
        responseKeys: response ? Object.keys(response) : [],
        fullResponse: response
      });
      return null;
    }

    const member = response.equipe;
    console.log('🔍 Member structure:', {
      hasTitle: !!member.title,
      hasSlug: !!member.slug,
      hasContent: !!member.content,
      hasEquipeFields: !!member.equipeFields,
      equipeFieldsKeys: member.equipeFields ? Object.keys(member.equipeFields) : [],
      hasImage: !!member.equipeFields?.image,
      imageStructure: member.equipeFields?.image
    });

    console.log('✅ Successfully fetched team member:', member.title);
    return member;
  } catch (error) {
    console.error('🚨 Error fetching team member:', error);
    console.error('Error details:', {
      slug,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  console.log('🔍 Fetching all team members');
  
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
    console.log('📡 Sending GraphQL query for team members...');
    const response = await fetchAPI(query);
    console.log('📦 Raw API response:', JSON.stringify(response, null, 2));

    if (!response?.equipes?.nodes) {
      console.error('❌ No team members found in response');
      console.error('Response structure:', {
        hasEquipes: !!response?.equipes,
        responseKeys: response ? Object.keys(response) : [],
        fullResponse: response
      });
      return [];
    }

    const members = response.equipes.nodes;
    console.log(`✅ Successfully fetched ${members.length} team members`);
    return members;
  } catch (error) {
    console.error('🚨 Error fetching team members:', error);
    console.error('Error details:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return [];
  }
}

async function fetchAPI(query: string, { variables }: { variables?: Record<string, unknown> } = {}) {
  console.log('🌐 Making API request to WordPress GraphQL endpoint');
  console.log('📝 Query:', query);
  console.log('🔧 Variables:', JSON.stringify(variables, null, 2));

  const response = await fetch('https://uclic.fr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: variables || {},
    }),
  });

  if (!response.ok) {
    console.error('🔴 API request failed:', response.status, response.statusText);
    throw new Error('Network response was not ok');
  }

  const json = await response.json();
  console.log('🟢 API request successful');
  return json.data;
} 