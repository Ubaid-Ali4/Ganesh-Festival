import { FestivalData } from '../types';

import digitalIdolImg from '../assets/images/ganpati_digital_idol_1789118075314.jpg';
import aartiDarshanImg from '../assets/images/ganpati_aarti_darshan_1789118093633.jpg';
import campusSceneImg from '../assets/images/college_utsav_scene_1789118117913.jpg';
import danceImg from '../assets/images/dance.jpeg';
import singingImg from '../assets/images/singing.jpeg';
import rifleImg from '../assets/images/rifle.jpeg';
import treasureImg from '../assets/images/treasure hunt.jpeg';
import ganpatiImg from '../assets/images/ganpati.jpg.jpeg';
import luckyImg from '../assets/images/lucky draw.jpeg';
import idolImg from '../assets/images/idol.jpeg';
import posterImg from '../assets/images/poster.jpeg';
import decor1Img from '../assets/images/decor1.jpeg';
import decor2Img from '../assets/images/decor2.jpeg';
import decor3Img from '../assets/images/decor3.jpeg';
import teamImg from '../assets/images/group.jpeg';

export const festivalData: FestivalData & {
  scheduleDuration: string;
  culturalCoordinator: string;
  principal: string;
} = {
  year: '2026',
  title: 'GANESH FESTIVAL 2026',
  tagline: 'Where tradition meets technology',
  scheduleDuration: '14th September – 16th September 2026',
  culturalCoordinator: 'Dr. J K Shinde',
  principal: 'Dr. A. N. Nanhai',
  theme: 'Vighnaharta of the Digital Age',
  themeSubtitle: 'Technology with Wisdom for a Better Tomorrow',
  collegeName: 'Anuradha College of Engineering & Technology, Chikhli',
  parentTrust: "Paramhansa Ramkrishna Maunibaba Shikshan Sanstha's",
  accreditations: 'Approved by AICTE New Delhi • NAAC Accredited • Affiliated to SGBAU Amravati • Autonomous Institute',
  location: 'Reception, ACET Chikhli, Maharashtra',
  summary:
    'Our 2026 installation envisions Lord Ganesha as the ultimate remover of modern obstacles—guiding humanity through artificial intelligence, cyber challenges, and digital distraction with timeless spiritual discernment.',
  
  pillars: [
    {
      title: 'Awareness',
      description: 'Recognizing digital addictions, misinformation, phishing traps, and screen overload in daily life.',
      icon: 'Eye',
    },
    {
      title: 'Responsible Usage',
      description: 'Balancing digital productivity with mental peace, family connection, and conscious screen habits.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Digital Literacy',
      description: 'Empowering students and society to master cutting-edge technology, cybersecurity, and ethical AI.',
      icon: 'Cpu',
    },
    {
      title: 'Sustainable Future',
      description: 'Curtailing electronic waste, minimizing carbon footprints, and creating eco-conscious hardware.',
      icon: 'Leaf',
    },
    {
      title: 'Bridging the Divide',
      description: 'Democratizing access to engineering education, digital tools, and opportunity for every student.',
      icon: 'Sparkles',
    },
  ],

  aartiList: [],

  eventsList: [
    {
      id: 'event-1',
      srNo: '01',
      day: 'DAY 01',
      date: '14/09/2026',
      title: 'Ganesha Murti Staphana',
      subtitle: 'Auspicious Sthapana & Welcome Rituals',
      time: '9:00 AM – 11:30 AM',
      location: 'Reception, ACET Campus',
      description: 'Ceremonial arrival and sacred Murti Sthapana of Lord Ganesha with Vedic mantras, traditional aarti, and welcoming rituals.',
      highlights: ['Murti Sthapana Pooja', 'Traditional Dhol Tasha Welcome', 'Inauguration Ceremony'],
      category: 'Ritual',
      imageUrl: ganpatiImg,      // 🔁 Replace with your own image
    },
    {
      id: 'event-2',
      srNo: '02',
      day: 'DAY 01',
      date: '14/09/2026',
      title: 'Idol Making Competition',
      subtitle: 'Eco-Friendly Clay Sculpting Contest',
      time: '10:00 AM – 12:00 PM',
      location: 'Meeting Hall, ACET',
      description: 'Creative competition inviting students to handcraft eco-friendly Shadu clay Ganesha idols emphasizing environmental sustainability.',
      highlights: ['Eco-Clay Materials Provided', 'Judging on Creativity & Proportions', 'Certificate & Prizes'],
      category: 'Competition',
      imageUrl: idolImg,      // 🔁 Replace with your own image
    },
    {
      id: 'event-3',
      srNo: '03',
      day: 'DAY 01',
      date: '14/09/2026',
      title: 'Poster Making Competition',
      subtitle: 'Theme: Technology with Wisdom & Heritage',
      time: '10:00 AM – 12:00 PM',
      location: 'Drawing Hall / Tech Hub, ACET',
      description: 'Art and design competition showcasing student visual creativity on modern themes such as cyber awareness, environmental protection, and digital wisdom.',
      highlights: ['Original Art & Graphic Concepts', 'College-Wide Exhibition', 'Award Recognition'],
      category: 'Competition',
      imageUrl: posterImg,      // 🔁 Replace with your own image
    },
    {
      id: 'event-4',
      srNo: '04',
      day: 'DAY 01',
      date: '14/09/2026',
      title: 'Rifle Shooting Competition',
      subtitle: 'Precision & Focus Challenge',
      time: '11:30 AM – 12:30 PM',
      location: 'Amphitheatre, ACET',
      description: 'Exciting precision shooting tournament testing students concentration, focus, and target accuracy under expert supervision.',
      highlights: ['Certified Target Range Setup', 'Single & Team Target Rounds', 'Special Trophies'],
      category: 'Competition',
      imageUrl: rifleImg,      // 🔁 Replace with your own image
    },
    {
      id: 'event-5',
      srNo: '05',
      day: 'DAY 02',
      date: '15/09/2026',
      title: 'Singing Competition',
      subtitle: 'Devotional & Cultural Vocal Melodies',
      time: '01:00 PM – 02:30 PM',
      location: 'College Katta, ACET',
      description: 'Soulful musical showcase featuring classical ragas, devotional bhajans, abhangas, and patriotic melodies by student vocalists.',
      highlights: ['Devotional & Semi-Classical Rounds', 'Accompaniment by Harmonium & Tabla', 'Live Audience Appreciation'],
      category: 'Competition',
      imageUrl: singingImg,      // 🔁 Replace with your own image
    },
    {
      id: 'event-6',
      srNo: '05',
      day: 'DAY 02',
      date: '15/09/2026',
      title: 'Dance Competition',
      subtitle: 'Classical, Folk & Thematic Choreography',
      time: '01:00 PM – 02:30 PM',
      location: 'College Katta, ACET',
      description: 'Vibrant solo and group dance performances celebrating Indian folk, Lavani, classical Bharatanatyam, and devotional themes.',
      highlights: ['Traditional Costumes & Props', 'High-Energy Group Choreography', 'Judged on Rhythm & Expression'],
      category: 'Competition',
      imageUrl: danceImg,      // 🔁 Replace with your own image
    },
    {
      id: 'event-7',
      srNo: '06',
      day: 'DAY 02',
      date: '15/09/2026',
      title: 'Treasure Hunt',
      subtitle: 'Campus-Wide Cryptic Mystery & Clue Quest',
      time: '03:30 PM – 04:30 PM',
      location: 'College Campus Grounds, ACET',
      description: 'Thrilling campus-wide challenge where student teams solve riddles, decode tech ciphers, and find hidden checkpoints across departments.',
      highlights: ['Algorithmic & Cultural Clues', 'Multi-Department Exploration', 'Grand Prize for First Team'],
      category: 'Competition',
      imageUrl: treasureImg,      // 🔁 Replace with your own image
    },
    {
      id: 'event-8',
      srNo: '07',
      day: 'DAY 03',
      date: '16/09/2026',
      title: 'Lucky Draw & Prize Distribution',
      subtitle: 'Felicitation & Grand Campus Winner Honours',
      time: '11:20 AM – 12:30 PM',
      location: 'College Katta, ACET',
      description: 'Official prize distribution ceremony felicitating competition winners, cultural coordinators, volunteers, and lucky draw participants.',
      highlights: ['Trophy & Certificate Ceremony', 'Felicitation by Principal & Coordinators', 'Exciting Lucky Draw Announcement'],
      category: 'Ceremony',
      imageUrl: luckyImg,      // 🔁 Replace with your own image
    },
    {
      id: 'event-9',
      srNo: '08',
      day: 'DAY 03',
      date: '16/09/2026',
      title: 'Maha Prasad',
      subtitle: 'Sacred Community Feast for All Devotees',
      time: '12:30 PM – 01:30 PM',
      location: 'Workshop / College Katta, ACET',
      description: 'Grand holy feast (Maha Prasad) served with love to all students, staff, faculty, guests, and community devotees.',
      highlights: ['Traditional Festive Maharashtrian Prasad', 'Ukadiche Modak Offering', 'Community Fellowship'],
      category: 'Ritual',
      imageUrl: aartiDarshanImg,     // 🔁 Replace with your own image
    },
    {
      id: 'event-10',
      srNo: '09',
      day: 'DAY 03',
      date: '16/09/2026',
      title: 'Ganpati Visarjan',
      subtitle: 'Grand Immersion Procession & Miravnuk',
      time: '02:00 PM – 05:00 PM',
      location: 'ACET',
      description: 'Grand emotional and joyous farewell procession with vibrant gulal, lezim, energetic dhol-tasha, and eco-friendly water immersion.',
      highlights: ['Grand Farewell Miravnuk with Dhol Tasha', 'Gulal & Petal Celebrations', 'Eco-Friendly Clay Idol Immersion'],
      category: 'Procession',
      imageUrl: digitalIdolImg,      // 🔁 Replace with your own image
    },
  ],

  galleryItems: [
    {
      id: 'g-1',
      title: 'Vighnaharta of the Digital Age',
      category: 'Bappa',
      imageUrl: ganpatiImg,
      caption: 'The majestic Ganpati idol holding the illuminated laptop symbolizing divine wisdom steering modern technology.',
      featured: true,
    },
    {
      id: 'g-2',
      title: 'Engineering the Reception: Behind the Scenes',
      category: 'Decoration',
      imageUrl: decor3Img,
      caption: 'Students and organizers putting final touches on the physical installation at the ACET Reception Mandap before the grand Sthapana.',
      featured: true,
    },
    {
      id: 'g-3',
      title: 'Balancing Screens & Sustainability',
      category: 'Decoration',
      imageUrl: decor1Img,
      caption: 'Creative display highlighting digital addiction, screen exhaustion, and e-waste, contrasted with clean technology and mindful living.',
      featured: true,
    },
    {
      id: 'g-4',
      title: 'Cyber Threats & Digital Shadows',
      category: 'Decoration',
      imageUrl: decor2Img,
      caption: 'Handcrafted installation portraying modern obstacles like phishing, deepfakes, and misinformation to be dispelled by divine wisdom.',
    },

    {
      id: 'g-5',
      title: 'With the Principal & Mentors',
      category: 'Events',
      imageUrl: teamImg,
      caption: 'Core student volunteers alongside the Principal and faculty coordinators leading the ACET Ganesh Festival 2026.',
    },
    
    
  ],

  facts: [
    {
      id: 'fact-1',
      title: 'The Single Tusk (Ekadanta)',
      symbolism: 'Sacrifice for Knowledge',
      explanation:
        'Lord Ganesha broke his own tusk to write the epic Mahabharata without pause when Sage Vyasa was dictating.',
      digitalWisdom:
        'True knowledge demands undivided attention, focus, and filtering out endless digital interruptions.',
    },
    {
      id: 'fact-2',
      title: 'Large Ears & Small Mouth',
      symbolism: 'Active Listening & Measured Speech',
      explanation:
        'His vast ears symbolize the capacity to listen attentively to all prayers, while the small mouth represents wise speech.',
      digitalWisdom:
        'Listen more, verify information before sharing, and refrain from toxic arguments or impulsive online posts.',
    },
    {
      id: 'fact-3',
      title: 'The Modak Sweet',
      symbolism: 'The Reward of Wisdom',
      explanation:
        'The outer crust of rice flour is plain, but inside lies the heavenly sweetness of jaggery and coconut.',
      digitalWisdom:
        'Rigorous study, deep engineering, and consistent perseverance yield sweet discoveries and lasting success.',
    },
    {
      id: 'fact-4',
      title: 'The Tiny Mushaka (Mouse)',
      symbolism: 'Mastery Over Desires',
      explanation:
        'A mouse can burrow through walls and ruin food, yet Ganesha rides the mouse with gentle, calm authority.',
      digitalWisdom:
        'Control algorithms, notifications, and screen desires so technology serves you, rather than controlling you.',
    },
  ],
};

export const initialWishes = [
  {
    id: 'w-1',
    author: 'Anonymous Devotee',
    department: 'Computer Science & Engineering',
    message: 'May Bappa bless all ACET students with wisdom, clear intellect, and courage to build innovations that uplift mankind.',
    timestamp: 'Just now',
    likes: 42,
  },
  {
    id: 'w-2',
    author: 'Campus Well-Wisher',
    department: 'Mechanical Engineering',
    message: 'Wishing every student clarity in exams, great placement success, and true balance between digital life and peace of mind.',
    timestamp: '2 hours ago',
    likes: 38,
  },
  {
    id: 'w-3',
    author: 'Devoted Student',
    department: 'Electronics & Telecommunication',
    message: 'Ganpati Bappa Morya! May our technology stay green, safe from cyber threats, and filled with compassion.',
    timestamp: '5 hours ago',
    likes: 29,
  },
];
