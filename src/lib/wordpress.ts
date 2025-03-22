export interface TeamMember {
  title: string;
  slug: string;
  date: string;
  equipe: {
    role: string;
    linkedin: string;
    twitter: string;
    autre: string;
    extrait: string;
    image: {
      node: {
        id: string;
        sourceUrl: string;
      }
    } | null;
  };
}

export interface TeamResponse {
  data: {
    equipe: {
      nodes: TeamMember[];
    };
  };
}

export async function fetchTeamData(): Promise<TeamMember[]> {
  try {
    const response = await fetch('https://uclic.fr/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          equipe {
            nodes {
              title
              slug
              date
              equipe {
                role
                linkedin
                twitter
                autre
                extrait
                image {
                  node {
                    id
                    sourceUrl
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
    return data.data.equipe.nodes.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } catch (error) {
    console.error('Error fetching team data:', error);
    return [];
  }
} 