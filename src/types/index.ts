export interface CheesecakeProduct {
  id: string;
  name: string;
  slug: string;
  badge?: string;
  tagline: string;
  description: string;
  story: string;
  category: 'all' | 'basque' | 'classic' | 'fruit' | 'chocolate-nut';
  bakeStyle: string;
  crustDescription: string;
  sizes: {
    id: 'whole-8' | 'whole-10' | 'slices-2pk' | 'minis-4pk';
    name: string;
    serves: string;
    price: number;
    weight: string;
  }[];
  tastingNotes: string[];
  pairing: string;
  ingredients: string[];
  allergens: string[];
  prepTime: string;
  caloriesPerServing: number;
  rating: number;
  reviewCount: number;
  palette: {
    surface: string;
    accent: string;
    border: string;
    crust: string;
    filling: string;
    drizzle?: string;
    garnish?: string;
  };
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  productSlug: string;
  sizeId: 'whole-8' | 'whole-10' | 'slices-2pk' | 'minis-4pk';
  sizeName: string;
  price: number;
  quantity: number;
  giftMessage?: string;
  isTastingFlight?: boolean;
  flightFlavors?: string[];
  crustChoice?: string;
  accentColor: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  cheesecake: string;
  comment: string;
  verifiedBuyer: boolean;
}
