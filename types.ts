export type PageTab = 'home' | 'services' | 'bot' | 'about' | 'track';

export type ServiceCategory = 'all' | 'telegram' | 'instagram' | 'network' | 'development';

export interface ServiceTier {
  name: string;
  price: number; // in Tomans
  description: string;
  speed: string;
  dropRate?: string;
  recommended?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  icon: string; // lucide icon identifier
  iconBgGradient: string;
  startingPrice: string;
  unit: string;
  minAmount: number;
  maxAmount: number;
  pricePerUnit: number; // in Tomans
  deliveryTime: string;
  successRate: string;
  guarantee: string;
  features: string[];
  tiers?: ServiceTier[];
}

export interface OrderItem {
  id: string;
  serviceId: string;
  serviceTitle: string;
  customerTelegram: string;
  customerPhone?: string;
  targetLinkOrId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  trackingCode: string;
  serverNode?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  avatarText: string;
  quote: string;
  rating: number;
  serviceUsed: string;
  date: string;
}

export interface BotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  buttons?: { text: string; action: string; url?: string }[][];
}
