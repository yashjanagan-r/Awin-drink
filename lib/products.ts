import { ProductFlavor } from './types';

export const PRODUCTS: ProductFlavor[] = [
  {
    id: 'badam',
    name: 'Aavin Badam Milk',
    badge: 'Golden Saffron & Cream Tin',
    tagline: 'Rich farm-fresh milk infused with real crushed almonds and aromatic saffron.',
    description: 'A timeless royal South Indian heritage recipe. Sourced from pure cow milk collected across Tamil Nadu green pastures, enriched with real crushed California almonds, and steeped in hand-picked saffron strands.',
    image: '/images/aavin-badam.png',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    bgGradient: 'from-[#1a1205] via-[#100b02] to-[#070501]',
    heroGradient: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.22) 0%, rgba(20, 12, 4, 0.95) 75%)',
    tastingNotes: ['Crushed California Almonds', 'Kashmiri Saffron', 'Velvety Clotted Cream', 'Cardamom Essence'],
    specs: {
      protein: '8.4g per tin',
      dairySource: 'Tamil Nadu Co-op Dairy Farms',
      shelfLife: '180 Days Chilled',
      serving: 'Serve Ice Cold (4°C)'
    },
    prices: {
      '6-pack': 299,
      '12-pack': 549
    },
    originalPrices: {
      '6-pack': 360,
      '12-pack': 660
    }
  },
  {
    id: 'chocolate-coffee',
    name: 'Aavin Chocolate Coffee',
    badge: 'Deep Roasted Brown Tin',
    tagline: 'Bold South Indian filter & cold-brew coffee blended with velvety dark cocoa.',
    description: 'The definitive pick-me-up. High-grown Arabica & Robusta coffee beans slow-steeped to eliminate acidity, married with Belgian dark cocoa and wholesome chilled Aavin milk for an unmistakably rich, bold body.',
    image: '/images/aavin-chocolate-coffee.png',
    accentColor: '#D97706',
    glowColor: 'rgba(180, 83, 9, 0.4)',
    bgGradient: 'from-[#190d07] via-[#0f0703] to-[#060301]',
    heroGradient: 'radial-gradient(ellipse at center, rgba(180, 83, 9, 0.25) 0%, rgba(18, 9, 4, 0.95) 75%)',
    tastingNotes: ['South Indian Filter Brew', 'Single-Origin Cocoa', 'Brown Butter Caramel', 'Zero Bitter Aftertaste'],
    specs: {
      protein: '9.2g per tin',
      dairySource: '100% Whole Farm Milk',
      shelfLife: '180 Days Chilled',
      serving: 'Shake & Drink Cold'
    },
    prices: {
      '6-pack': 299,
      '12-pack': 549
    },
    originalPrices: {
      '6-pack': 360,
      '12-pack': 660
    }
  },
  {
    id: 'chocolate-vanilla',
    name: 'Aavin Chocolate Vanilla Coffee',
    badge: 'Crisp Ivory-White Tin',
    tagline: 'Smooth cold coffee swirled with Madagascar vanilla bean and rich chocolate.',
    description: 'An indulgent dessert-in-a-can balance. Infused with natural Bourbon vanilla pods and sweet chocolate swirls, harmonized with chilled dairy milk for a silky, smooth finish that melts on the palate.',
    image: '/images/aavin-chocolate-vanilla.png',
    accentColor: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.35)',
    bgGradient: 'from-[#14120e] via-[#0c0a07] to-[#050504]',
    heroGradient: 'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.2) 0%, rgba(15, 14, 12, 0.95) 75%)',
    tastingNotes: ['Madagascar Vanilla Bean', 'Silky Cocoa Butter', 'Cold-Pressed Espresso', 'Creamy Milk Foam'],
    specs: {
      protein: '8.8g per tin',
      dairySource: 'Freshly Collected Co-op Milk',
      shelfLife: '180 Days Chilled',
      serving: 'Pour Over Ice Cubes'
    },
    prices: {
      '6-pack': 299,
      '12-pack': 549
    },
    originalPrices: {
      '6-pack': 360,
      '12-pack': 660
    }
  },
  {
    id: 'variety-pack',
    name: 'Aavin Trio Variety Pack',
    badge: 'The Complete Flight (12 Tins)',
    tagline: 'Combo box containing 4 tins of each flavor (12 tins total) in chilled packaging.',
    description: 'Can’t pick just one? The Trio Variety Pack delivers the full spectrum: 4 cans of Badam Milk, 4 cans of Chocolate Coffee, and 4 cans of Chocolate Vanilla Coffee. Hand-packed in our custom thermal insulated chilled box.',
    image: '/images/aavin-chocolate-coffee.png', // Main hero can representation
    accentColor: '#E5A93C',
    glowColor: 'rgba(229, 169, 60, 0.35)',
    bgGradient: 'from-[#17130a] via-[#0d0a05] to-[#040402]',
    heroGradient: 'radial-gradient(ellipse at center, rgba(229, 169, 60, 0.22) 0%, rgba(14, 11, 7, 0.95) 75%)',
    tastingNotes: ['4x Badam Milk', '4x Chocolate Coffee', '4x Chocolate Vanilla', 'Ultimate Chilled Variety'],
    specs: {
      protein: '106g Total Protein',
      dairySource: 'Tamil Nadu Dairy Federation',
      shelfLife: '180 Days Chilled',
      serving: 'Chilled Gift Box'
    },
    prices: {
      '12-pack': 579
    },
    originalPrices: {
      '12-pack': 720
    }
  }
];

export const FREE_SHIPPING_THRESHOLD = 999;
export const SUBSCRIPTION_DISCOUNT = 0.15; // 15% off
