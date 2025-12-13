type Project = {
  name: string
  description: string
  link: string
  video?: string
  image?: string
  id: string
  details?: {
    overview: string
    technologies: string[]
    features: string[]
    challenges?: string
    results?: string
  }
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Cryptography: RSA & Vigenere Cipher',
    description:
      'Implementation of cryptographic algorithms including RSA encryption/decryption, Vigenere cipher, and advanced attacks like weak key detection and broadcast attacks.',
    link: '#',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=80',
    id: 'project1',
    details: {
      overview: 'A comprehensive cryptography project implementing RSA and Vigenere cipher algorithms with various cryptographic attacks. The project includes implementations of encryption/decryption, weak key detection, broadcast attacks, and parity oracle attacks using advanced mathematical techniques like the Chinese Remainder Theorem.',
      technologies: ['Python', 'Cryptography', 'Number Theory', 'Decimal Arithmetic'],
      features: [
        'RSA encryption and decryption with key generation',
        'Vigenere cipher with dictionary attack',
        'Weak RSA key detection using GCD',
        'RSA broadcast attack using Chinese Remainder Theorem',
        'Parity oracle attack for RSA plaintext recovery'
      ],
      challenges: 'Handling large number arithmetic for RSA operations, implementing efficient attacks on cryptographic systems, and managing precision issues with extremely large numbers using Python\'s Decimal module.',
      results: 'Successfully implemented multiple cryptographic algorithms and attacks, demonstrating understanding of both classical and modern cryptography principles. Achieved 100% score on the project.'
    },
  },
  {
    name: 'BGP Measurements & Analysis',
    description:
      'Network analysis project analyzing BGP routing data to track unique prefixes, autonomous systems, and routing behavior over time using pybgpstream.',
    link: '#',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
    id: 'project2',
    details: {
      overview: 'A network analysis project that processes BGP (Border Gateway Protocol) routing data to analyze internet routing behavior. The project tracks unique advertised prefixes, autonomous systems, and identifies top ASes by prefix growth over time using real BGP data snapshots.',
      technologies: ['Python', 'pybgpstream', 'Network Analysis', 'BGP Protocol'],
      features: [
        'Unique prefix tracking over time',
        'Autonomous system identification and counting',
        'Top 10 ASes by prefix growth analysis',
        'BGP routing table snapshot processing',
        'AS path parsing and analysis'
      ],
      challenges: 'Processing large-scale BGP routing data efficiently, parsing complex AS path structures, and handling multiple data snapshots to track changes over time.',
      results: 'Successfully analyzed BGP routing data to identify routing trends and autonomous system behavior, providing insights into internet routing dynamics.'
    },
  },
  {
    name: 'Machine Learning for Cyber Security',
    description:
      'Machine learning project focused on cybersecurity applications, including data preprocessing, feature engineering, and model development for security threat detection.',
    link: '#',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80',
    id: 'project3',
    details: {
      overview: 'A comprehensive machine learning project applying data science techniques to cybersecurity problems. The project includes data type detection, feature engineering, model development, and evaluation for security threat detection and analysis.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Science'],
      features: [
        'Data type detection and conversion',
        'DataFrame manipulation and indexing',
        'Feature engineering for security data',
        'Machine learning model development',
        'Model evaluation and validation'
      ],
      challenges: 'Handling diverse data types in security datasets, preprocessing noisy security data, and developing effective features for threat detection while maintaining model interpretability.',
      results: 'Successfully developed machine learning models for cybersecurity applications, demonstrating proficiency in data preprocessing and ML techniques. Achieved 100% score on the project.'
    },
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Tempus Labs',
    title: 'Computational Biologist',
    start: '2021',
    end: 'Present',
    link: 'https://www.tempus.com/',
    id: 'work1',
  },
  {
    company: 'Indiana University',
    title: 'Phlebotomist',
    start: '2020',
    end: '2021',
    link: 'https://www.indiana.edu/',
    id: 'work2',
  },
]

export const BLOG_POSTS: BlogPost[] = []

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/max-vaglica',
  },
]

export const EMAIL = 'maxvaglica@gmail.com'
