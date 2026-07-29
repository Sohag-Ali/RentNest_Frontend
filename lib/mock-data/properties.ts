export interface Landlord {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  isVerified: boolean;
  rating: number;
  responseRate: string;
  responseTime: string;
  joinedDate: string;
  phone: string;
  email: string;
}

export interface PropertyOverview {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  category: string;
  availableFrom: string;
  status: "Available" | "Pending" | "Rented";
  yearBuilt: number;
  depositAmount: number;
  leaseTerm: string;
  petPolicy: string;
  parkingType: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  location: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isAvailable: boolean;
  category: "Villa" | "Penthouse" | "Apartment" | "Studio" | "Loft" | "Cottage";
  mainImage: string;
  images: string[];
  amenities: string[];
  landlord: Landlord;
  overview: PropertyOverview;
  createdAt: string;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "The Grand Horizon Luxury Penthouse",
    slug: "grand-horizon-luxury-penthouse",
    description: "Expansive high-rise penthouse featuring 360-degree panoramic ocean views, private rooftop infinity pool, and bespoke Italian design.",
    detailedDescription:
      "Welcome to peak luxury living at The Grand Horizon Penthouse. Spanning over 3,800 square feet of meticulously designed interior space, this residence blends sleek modern aesthetics with warm architectural accents. Features include floor-to-ceiling double-glazed windows, a gourmet chef's kitchen fitted with Gaggenau appliances, smart home automation, and a master suite with dual walk-in closets and a spa-inspired marble bathroom. Perfect for executives or families seeking unmatched sophistication.",
    location: "742 Ocean Drive, Downtown, Miami, FL",
    city: "Miami",
    state: "FL",
    price: 6500,
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqFt: 3850,
    rating: 4.96,
    reviewCount: 42,
    isFeatured: true,
    isAvailable: true,
    category: "Penthouse",
    mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Pool",
      "High-Speed Wi-Fi",
      "Gym & Fitness Center",
      "24/7 Security",
      "EV Charging",
      "Balcony / Terrace",
      "Pet Friendly",
      "Air Conditioning",
      "Valet Parking",
      "Smart Home Automation"
    ],
    landlord: {
      id: "landlord-1",
      name: "Victoria Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      isSuperhost: true,
      isVerified: true,
      rating: 4.98,
      responseRate: "100%",
      responseTime: "Within an hour",
      joinedDate: "January 2021",
      phone: "+1 (305) 892-4100",
      email: "victoria.vance@rentnest.com"
    },
    overview: {
      address: "742 Ocean Drive, Penthouse 4201",
      city: "Miami",
      state: "FL",
      zipCode: "33139",
      category: "Penthouse",
      availableFrom: "Immediate",
      status: "Available",
      yearBuilt: 2023,
      depositAmount: 6500,
      leaseTerm: "12 Months Minimum",
      petPolicy: "Allowed (Small Dogs & Cats)",
      parkingType: "2 Reserved Garage Spaces"
    },
    createdAt: "2026-06-15"
  },
  {
    id: "prop-2",
    title: "Serene Coastal Villa with Private Beach",
    slug: "serene-coastal-villa-private-beach",
    description: "Ultra-private seaside retreat with direct beach entrance, private infinity pool, lush tropical gardens, and expansive teak wood sundecks.",
    detailedDescription:
      "Escape to tranquil luxury at the Serene Coastal Villa. Tucked away in an exclusive enclave, this home features floor-to-ceiling glass walls that frame endless ocean vistas. Enjoy indoor-outdoor living with slide-away glass doors, custom outdoor kitchen, firepit lounge, and a wellness suite with sauna. Thoughtfully outfitted with eco-friendly solar systems, ultra-fast fiber internet, and top-tier security.",
    location: "184 Malibu Canyon Rd, Malibu, CA",
    city: "Malibu",
    state: "CA",
    price: 8200,
    bedrooms: 5,
    bathrooms: 5,
    areaSqFt: 4500,
    rating: 4.92,
    reviewCount: 38,
    isFeatured: true,
    isAvailable: true,
    category: "Villa",
    mainImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Beach Access",
      "Infinity Pool",
      "Sauna & Spa",
      "High-Speed Wi-Fi",
      "Fireplace",
      "Garden / Courtyard",
      "Security System",
      "Air Conditioning",
      "Garage Parking"
    ],
    landlord: {
      id: "landlord-2",
      name: "Marcus Sterling",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      isSuperhost: true,
      isVerified: true,
      rating: 4.95,
      responseRate: "98%",
      responseTime: "Within a few hours",
      joinedDate: "March 2019",
      phone: "+1 (310) 456-9921",
      email: "marcus.sterling@rentnest.com"
    },
    overview: {
      address: "184 Malibu Canyon Rd",
      city: "Malibu",
      state: "CA",
      zipCode: "90265",
      category: "Villa",
      availableFrom: "Available Sep 1",
      status: "Available",
      yearBuilt: 2022,
      depositAmount: 8200,
      leaseTerm: "12 - 24 Months",
      petPolicy: "Cats Allowed",
      parkingType: "3 Car Attached Garage"
    },
    createdAt: "2026-06-20"
  },
  {
    id: "prop-3",
    title: "Urban Minimalist Loft in Soho",
    slug: "urban-minimalist-loft-soho",
    description: "Authentic Soho artist loft with soaring 14ft ceilings, exposed brick, oversized industrial windows, and bespoke Scandinavian interiors.",
    detailedDescription:
      "Immerse yourself in authentic Manhattan style. Located on iconic cobblestone Greene Street in the heart of Soho, this residence retains historical cast-iron building character while boasting state-of-the-art updates. Includes key-locked elevator entry, custom Poliform cabinetry, Miele kitchen suite, concrete cast soaking tub, and custom lighting fixtures throughout.",
    location: "128 Greene Street, Soho, New York, NY",
    city: "New York",
    state: "NY",
    price: 4800,
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1950,
    rating: 4.88,
    reviewCount: 29,
    isFeatured: false,
    isAvailable: true,
    category: "Loft",
    mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "High-Speed Wi-Fi",
      "Elevator Access",
      "Washer & Dryer in Unit",
      "Central Air Conditioning",
      "Dishwasher",
      "Pet Friendly",
      "Storage Locker"
    ],
    landlord: {
      id: "landlord-3",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      isSuperhost: true,
      isVerified: true,
      rating: 4.91,
      responseRate: "100%",
      responseTime: "Within an hour",
      joinedDate: "July 2020",
      phone: "+1 (212) 555-0199",
      email: "elena.rostova@rentnest.com"
    },
    overview: {
      address: "128 Greene St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10012",
      category: "Loft",
      availableFrom: "Immediate",
      status: "Available",
      yearBuilt: 2020,
      depositAmount: 4800,
      leaseTerm: "12 Months",
      petPolicy: "All Pets Welcome",
      parkingType: "Street / Nearby Garage"
    },
    createdAt: "2026-07-01"
  },
  {
    id: "prop-4",
    title: "Skyline Glass Apartment with Skyline Balcony",
    slug: "skyline-glass-apartment",
    description: "Modern 3-bedroom residence in premier high-rise featuring floor-to-ceiling glass, private glass balcony, and resort-grade amenities.",
    detailedDescription:
      "Elevate your urban lifestyle in this glass tower residence overlooking the city skyline. Features open concept living, quartz kitchen island, smart thermostat, recessed LED lighting, and direct access to building sky lounge, heated lap pool, and 24-hour concierge services.",
    location: "500 N Michigan Ave, River North, Chicago, IL",
    city: "Chicago",
    state: "IL",
    price: 3400,
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1650,
    rating: 4.85,
    reviewCount: 19,
    isFeatured: true,
    isAvailable: true,
    category: "Apartment",
    mainImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Heated Pool",
      "Fitness Center",
      "Concierge Service",
      "Balcony",
      "High-Speed Wi-Fi",
      "Underground Garage",
      "Air Conditioning"
    ],
    landlord: {
      id: "landlord-4",
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      isSuperhost: false,
      isVerified: true,
      rating: 4.86,
      responseRate: "95%",
      responseTime: "Within a few hours",
      joinedDate: "October 2022",
      phone: "+1 (312) 490-1122",
      email: "david.chen@rentnest.com"
    },
    overview: {
      address: "500 N Michigan Ave, Unit 2804",
      city: "Chicago",
      state: "IL",
      zipCode: "60611",
      category: "Apartment",
      availableFrom: "Next Month",
      status: "Available",
      yearBuilt: 2021,
      depositAmount: 3400,
      leaseTerm: "12 Months",
      petPolicy: "Dogs Allowed (< 35 lbs)",
      parkingType: "Assigned Garage Space"
    },
    createdAt: "2026-07-05"
  },
  {
    id: "prop-5",
    title: "Alpine Modern Cottage & Timber Sanctuary",
    slug: "alpine-modern-cottage-timber-sanctuary",
    description: "Custom cedar and stone mountain lodge nestled among pine trees with private hot tub, stone fireplace, and panoramic mountain views.",
    detailedDescription:
      "Find mountain serenity in this designer alpine cottage. Crafted with sustainable timber, radiant floor heating, double-story stone fireplace, and floor-to-ceiling wilderness view windows. Located just 10 minutes from ski slopes and hiking trails.",
    location: "410 Evergreen Way, Aspen, CO",
    city: "Aspen",
    state: "CO",
    price: 5900,
    bedrooms: 4,
    bathrooms: 3.5,
    areaSqFt: 3100,
    rating: 4.98,
    reviewCount: 54,
    isFeatured: true,
    isAvailable: true,
    category: "Cottage",
    mainImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Hot Tub",
      "Stone Fireplace",
      "Mountain Views",
      "Radiant Heating",
      "Ski Storage Room",
      "High-Speed Wi-Fi",
      "Garage"
    ],
    landlord: {
      id: "landlord-1",
      name: "Victoria Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      isSuperhost: true,
      isVerified: true,
      rating: 4.98,
      responseRate: "100%",
      responseTime: "Within an hour",
      joinedDate: "January 2021",
      phone: "+1 (305) 892-4100",
      email: "victoria.vance@rentnest.com"
    },
    overview: {
      address: "410 Evergreen Way",
      city: "Aspen",
      state: "CO",
      zipCode: "81611",
      category: "Cottage",
      availableFrom: "Immediate",
      status: "Available",
      yearBuilt: 2022,
      depositAmount: 5900,
      leaseTerm: "6 - 12 Months",
      petPolicy: "Pet Friendly",
      parkingType: "2 Car Heated Garage"
    },
    createdAt: "2026-07-10"
  },
  {
    id: "prop-6",
    title: "Sleek Executive Micro-Studio Studio",
    slug: "sleek-executive-micro-studio",
    description: "Efficient luxury studio designed by minimalist architects featuring smart space transformable furniture and prime tech corridor access.",
    detailedDescription:
      "Designed for modern professionals seeking streamlined luxury. Features custom Italian Murphy bed, fold-away dining console, integrated Smart TV wall, high-speed fiber internet, and sleek matte black fixtures.",
    location: "888 Howard Street, SoMa, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    price: 2650,
    bedrooms: 1,
    bathrooms: 1,
    areaSqFt: 620,
    rating: 4.79,
    reviewCount: 15,
    isFeatured: false,
    isAvailable: true,
    category: "Studio",
    mainImage: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "High-Speed Wi-Fi",
      "Rooftop Deck",
      "Co-Working Lounge",
      "Bike Storage",
      "Keyless Smart Entry",
      "Air Conditioning"
    ],
    landlord: {
      id: "landlord-4",
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      isSuperhost: false,
      isVerified: true,
      rating: 4.86,
      responseRate: "95%",
      responseTime: "Within a few hours",
      joinedDate: "October 2022",
      phone: "+1 (312) 490-1122",
      email: "david.chen@rentnest.com"
    },
    overview: {
      address: "888 Howard St, Apt 602",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      category: "Studio",
      availableFrom: "Immediate",
      status: "Available",
      yearBuilt: 2023,
      depositAmount: 2650,
      leaseTerm: "12 Months",
      petPolicy: "Cats Friendly",
      parkingType: "Street Parking / EV Charging"
    },
    createdAt: "2026-07-12"
  },
  {
    id: "prop-7",
    title: "Mediterranean Luxury Estate & Garden",
    slug: "mediterranean-luxury-estate",
    description: "Palatial 6-bedroom estate with courtyard fountains, olive groves, tennis court, wine cellar, and separate guest house.",
    detailedDescription:
      "A rare architectural triumph offering ultimate grandeur. Showcasing hand-painted ceiling frescoes, terracotta tile loggias, temperature-controlled 1,500-bottle wine cellar, private tennis court, and infinity-edge pool framed by Italian cypress trees.",
    location: "1024 Beverly Estate Dr, Beverly Hills, CA",
    city: "Beverly Hills",
    state: "CA",
    price: 12500,
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 7200,
    rating: 4.99,
    reviewCount: 61,
    isFeatured: true,
    isAvailable: true,
    category: "Villa",
    mainImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Pool",
      "Tennis Court",
      "Wine Cellar",
      "Guest House",
      "Gated Security",
      "High-Speed Wi-Fi",
      "Air Conditioning",
      "4-Car Garage"
    ],
    landlord: {
      id: "landlord-2",
      name: "Marcus Sterling",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      isSuperhost: true,
      isVerified: true,
      rating: 4.95,
      responseRate: "98%",
      responseTime: "Within a few hours",
      joinedDate: "March 2019",
      phone: "+1 (310) 456-9921",
      email: "marcus.sterling@rentnest.com"
    },
    overview: {
      address: "1024 Beverly Estate Dr",
      city: "Beverly Hills",
      state: "CA",
      zipCode: "90210",
      category: "Villa",
      availableFrom: "Immediate",
      status: "Available",
      yearBuilt: 2024,
      depositAmount: 12500,
      leaseTerm: "12 - 36 Months",
      petPolicy: "Pet Friendly",
      parkingType: "4 Car Private Garage"
    },
    createdAt: "2026-07-18"
  },
  {
    id: "prop-8",
    title: "Waterfront Modern Glass Residence",
    slug: "waterfront-modern-glass-residence",
    description: "Contemporary glass sanctuary over looking Lake Austin with private deep-water dock, boat slip, and outdoor fireplace.",
    detailedDescription:
      "Experience serene waterfront living just minutes from downtown Austin. Features warm cedar cladding, floor-to-ceiling glass walls, outdoor summer kitchen, private dock with electric boat lift, and sunset views over the water.",
    location: "3400 Lake Austin Blvd, Austin, TX",
    city: "Austin",
    state: "TX",
    price: 5200,
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3400,
    rating: 4.91,
    reviewCount: 31,
    isFeatured: false,
    isAvailable: true,
    category: "Villa",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Dock",
      "Lake Views",
      "Outdoor Fireplace",
      "High-Speed Wi-Fi",
      "Air Conditioning",
      "Pet Friendly",
      "2-Car Garage"
    ],
    landlord: {
      id: "landlord-3",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      isSuperhost: true,
      isVerified: true,
      rating: 4.91,
      responseRate: "100%",
      responseTime: "Within an hour",
      joinedDate: "July 2020",
      phone: "+1 (212) 555-0199",
      email: "elena.rostova@rentnest.com"
    },
    overview: {
      address: "3400 Lake Austin Blvd",
      city: "Austin",
      state: "TX",
      zipCode: "78703",
      category: "Villa",
      availableFrom: "Immediate",
      status: "Available",
      yearBuilt: 2022,
      depositAmount: 5200,
      leaseTerm: "12 Months",
      petPolicy: "Dogs Allowed",
      parkingType: "2 Car Garage"
    },
    createdAt: "2026-07-22"
  }
];

export const CATEGORIES = ["All", "Villa", "Penthouse", "Apartment", "Studio", "Loft", "Cottage"];

export const CITIES = ["All", "Miami", "Malibu", "New York", "Chicago", "Aspen", "San Francisco", "Beverly Hills", "Austin"];

export const AMENITIES_LIST = [
  "High-Speed Wi-Fi",
  "Private Pool",
  "Gym & Fitness Center",
  "Air Conditioning",
  "Pet Friendly",
  "Balcony / Terrace",
  "EV Charging",
  "24/7 Security",
  "Private Beach Access",
  "Fireplace"
];
