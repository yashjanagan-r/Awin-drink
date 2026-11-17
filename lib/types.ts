export type FlavorId = 'badam' | 'chocolate-coffee' | 'chocolate-vanilla' | 'variety-pack';

export type PackSize = '6-pack' | '12-pack';

export interface ProductFlavor {
  id: FlavorId;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  heroGradient: string;
  tastingNotes: string[];
  specs: {
    protein: string;
    dairySource: string;
    shelfLife: string;
    serving: string;
  };
  prices: {
    '6-pack'?: number;
    '12-pack': number;
  };
  originalPrices: {
    '6-pack'?: number;
    '12-pack': number;
  };
}

export interface CartItem {
  id: string; // unique item key
  flavorId: FlavorId;
  name: string;
  image: string;
  packSize: PackSize;
  isSubscription: boolean;
  unitPrice: number;
  quantity: number;
}

export interface OrderRecord {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city?: string;
  pincode?: string;
  items: CartItem[];
  total_amount: number;
  status?: string;
  created_at?: string;
}
