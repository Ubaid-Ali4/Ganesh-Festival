export type TabType = 'home' | 'ar' | 'events' | 'aarti' | 'gallery' | 'wishes' | 'about';

export type TrackingState =
  | 'searching'
  | 'move_closer'
  | 'move_slowly'
  | 'detected'
  | 'lost';

export interface AREffectToggles {
  petals: boolean;
  diyas: boolean;
  particles: boolean;
  mandala: boolean;
  om: boolean;
  aura: boolean;
  sound: boolean;
}

export interface AartiItem {
  id: string;
  name: string;
  marathiName: string;
  time: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  description: string;
  significance: string;
  icon: string;
}

export interface FestivalEvent {
  id: string;
  srNo?: string;
  day: string;
  date: string;
  title: string;
  subtitle: string;
  time: string;
  location: string;
  description: string;
  highlights: string[];
  category: 'Ritual' | 'Cultural' | 'Technical' | 'Procession' | 'Competition' | 'Ceremony';
  imageUrl?: string; // Optional side image for the event card
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bappa' | 'Decoration' | 'Aarti' | 'Events' | 'Students' | 'Celebrations' | 'Visarjan';
  imageUrl: string;
  caption: string;
  featured?: boolean;
}

export interface Wish {
  id: string;
  author: string;
  message: string;
  department?: string;
  timestamp: string;
  likes: number;
}

export interface FactItem {
  id: string;
  title: string;
  symbolism: string;
  explanation: string;
  digitalWisdom: string;
}

export interface FestivalData {
  year: string;
  title: string;
  tagline: string;
  theme: string;
  themeSubtitle: string;
  collegeName: string;
  parentTrust: string;
  accreditations: string;
  location: string;
  summary: string;
  pillars: {
    title: string;
    description: string;
    icon: string;
  }[];
  aartiList: AartiItem[];
  eventsList: FestivalEvent[];
  galleryItems: GalleryItem[];
  facts: FactItem[];
}
