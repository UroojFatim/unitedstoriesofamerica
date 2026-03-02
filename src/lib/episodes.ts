export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  category: string;
  releasedAt: string;
  videoEmbedUrl: string;
  story: string;
  highlights: string[];
}

export const episodes: Episode[] = [
  {
    id: 'e24',
    number: 24,
    title: 'The Last Drive-In',
    description: 'A small-town theater owner keeps the magic of cinema alive under the stars.',
    image: '/episode_thumb_01.jpg',
    duration: '42 min',
    category: 'Culture',
    releasedAt: 'Feb 18, 2026',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    story:
      'On the edge of town, one family-run drive-in has become a weekly ritual for neighbors, teenagers, and retirees alike. This episode follows the owner from projector booth to parking lot as she fights to keep a beloved piece of local culture alive.',
    highlights: [
      'How independent theaters survive in the streaming era',
      'What community spaces mean in small towns',
      'The personal cost of preserving local tradition',
    ],
  },
  {
    id: 'e23',
    number: 23,
    title: 'Postcards from the Border',
    description: 'Stories of hope, hardship, and humanity along the southern frontier.',
    image: '/episode_thumb_02.jpg',
    duration: '55 min',
    category: 'Immigration',
    releasedAt: 'Feb 11, 2026',
    videoEmbedUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
    story:
      'Through aid workers, families, and local residents, we explore a region that is often reduced to headlines. Their stories reveal complexity, resilience, and the daily acts of care that rarely make the evening news.',
    highlights: [
      'First-person stories from both sides of the border',
      'How local volunteers organize rapid response support',
      'Policy headlines vs lived community realities',
    ],
  },
  {
    id: 'e22',
    number: 22,
    title: 'Night Class',
    description: 'Adult learners pursuing dreams after dark in community colleges.',
    image: '/episode_thumb_03.jpg',
    duration: '38 min',
    category: 'Education',
    releasedAt: 'Feb 4, 2026',
    videoEmbedUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U',
    story:
      'After work shifts end, classrooms come alive with students balancing jobs, parenting, and ambition. We spend a semester with three learners chasing credentials, confidence, and second chances.',
    highlights: [
      'The hidden infrastructure behind adult education',
      'How instructors adapt to working students',
      'Stories of late-in-life career reinvention',
    ],
  },
  {
    id: 'e21',
    number: 21,
    title: 'Brothers in Arms',
    description: 'Veterans find healing through peer support and shared experience.',
    image: '/episode_thumb_04.jpg',
    duration: '48 min',
    category: 'Veterans',
    releasedAt: 'Jan 28, 2026',
    videoEmbedUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
    story:
      'In church basements, VFW halls, and neighborhood parks, veteran-led groups are building spaces where service members can speak openly and reconnect. The camera stays close to moments of vulnerability and trust.',
    highlights: [
      'Peer-led recovery models that are changing outcomes',
      'The transition from service to civilian life',
      'How shared language creates belonging',
    ],
  },
  {
    id: 'e20',
    number: 20,
    title: 'The New Americans',
    description: 'Families celebrate citizenship after years of waiting and hoping.',
    image: '/episode_thumb_05.jpg',
    duration: '51 min',
    category: 'Immigration',
    releasedAt: 'Jan 21, 2026',
    videoEmbedUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    story:
      'We document the final weeks before naturalization ceremonies, then follow families through one of the most meaningful days of their lives. It is a portrait of patience, pride, and possibility.',
    highlights: [
      'Inside real naturalization prep classes',
      'Family rituals around citizenship ceremonies',
      'What civic belonging feels like in practice',
    ],
  },
  {
    id: 'e19',
    number: 19,
    title: 'Main Street Dreams',
    description: 'Entrepreneurs rebuilding small businesses in the heartland.',
    image: '/guest_sofia.jpg',
    duration: '44 min',
    category: 'Entrepreneurship',
    releasedAt: 'Jan 14, 2026',
    videoEmbedUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
    story:
      'From a bakery to a hardware store, owners on one block are finding creative ways to keep storefronts open. Their stories show what local economies look like when community support meets relentless grit.',
    highlights: [
      'How neighborhood businesses reinvent after disruption',
      'The economics of staying independent',
      'Why local ownership still matters',
    ],
  },
];

export const getEpisodeById = (id: string) => episodes.find((episode) => episode.id === id);