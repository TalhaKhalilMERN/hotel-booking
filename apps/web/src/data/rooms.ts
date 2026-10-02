export interface RoomAmenity {
  id: string;
  name: string;
  icon?: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  pricePerNight: number;
  capacity: {
    adults: number;
    children: number;
  };
  bedType: string;
  sizeSqM: number;
  floor: string;
  view: string;
  featured: boolean;
  heroImage: string;
  images: string[];
  amenities: string[];
  totalRoomsInCategory: number;
}

export interface BookingSearchParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export const ROOMS_DATA: Room[] = [
  {
    id: "std-01",
    slug: "standard-king-room",
    name: "Classic King Room",
    tagline: "Comfortable, quiet room equipped for business and short stays.",
    description: "Features a comfortable king-size bed, workstation, high-speed Wi-Fi, and modern ensuite shower room with GT Road access.",
    longDescription: "Designed for travelers visiting Hamilton along the GT Road corridor, the Classic King Room provides a relaxing retreat with double-glazed acoustic windows, warm lighting, split air conditioning, and daily housekeeping.",
    pricePerNight: 8500,
    capacity: {
      adults: 2,
      children: 1
    },
    bedType: "1 King Bed",
    sizeSqM: 30,
    floor: "1st & 2nd Floors",
    view: "Courtyard View",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "High-Speed Wi-Fi",
      "Air Conditioning",
      "Generator Backup",
      "Flat Screen Smart TV",
      "Workstation Desk",
      "Tea & Coffee Maker",
      "Ensuite Bathroom",
      "Daily Housekeeping"
    ],
    totalRoomsInCategory: 16
  },
  {
    id: "dlx-02",
    slug: "deluxe-executive-room",
    name: "Deluxe Executive Room",
    tagline: "Expanded living area with modern furnishings and balcony view.",
    description: "Offers additional floor space, seating sofa, enlarged bathroom, and tea/coffee station for enhanced comfort.",
    longDescription: "The Deluxe Executive Room provides added space and modern convenience. Features an comfortable sofa nook, vanity mirror, soundproof glazing, and fast room service delivery.",
    pricePerNight: 12000,
    capacity: {
      adults: 2,
      children: 2
    },
    bedType: "1 Super King Bed",
    sizeSqM: 40,
    floor: "2nd & 3rd Floors",
    view: "GT Road Avenue View",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Super King Bed",
      "Sofa Seating Nook",
      "Air Conditioning",
      "High-Speed Wi-Fi",
      "Mini Fridge",
      "Smart TV 55\"",
      "Complimentary Breakfast",
      "Ensuite Bath & Shower"
    ],
    totalRoomsInCategory: 14
  },
  {
    id: "exe-03",
    slug: "hamilton-master-suite",
    name: "Hamilton Master Suite",
    tagline: "Our premier suite featuring separate living lounge and dining space.",
    description: "A spacious residence suite with separate lounge room, dining table, master bedroom, and luxury bathroom amenities.",
    longDescription: "Designed for guests seeking maximum privacy and living room space. Includes a dedicated salon area for receiving visitors, two smart TVs, coffee bar, and priority room service.",
    pricePerNight: 16500,
    capacity: {
      adults: 3,
      children: 2
    },
    bedType: "1 Emperor King Bed + Lounge Sofa",
    sizeSqM: 58,
    floor: "4th Floor",
    view: "Panoramic GT Road & Skyline",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Separate Living Lounge",
      "Dining Table",
      "High-Speed Wi-Fi",
      "Dual Smart TVs",
      "Air Conditioning",
      "Coffee Bar",
      "Walk-in Closet",
      "Priority Concierge Care"
    ],
    totalRoomsInCategory: 6
  },
  {
    id: "twn-04",
    slug: "family-twin-room",
    name: "Family Twin Room",
    tagline: "Two comfortable queen beds suitable for family travel.",
    description: "Equipped with two double beds, spacious floor area, extra storage, and private bathroom suitable for families.",
    longDescription: "Comfortable layout tailored for families or group companions traveling together. Features double queen beds, ample luggage storage, and full climate control.",
    pricePerNight: 22000,
    capacity: {
      adults: 4,
      children: 2
    },
    bedType: "2 Queen Beds",
    sizeSqM: 45,
    floor: "2nd & 3rd Floors",
    view: "City View",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Two Queen Beds",
      "Air Conditioning",
      "Generator Backup",
      "High-Speed Wi-Fi",
      "Work Desk",
      "Smart TV 55\"",
      "Ensuite Bath"
    ],
    totalRoomsInCategory: 9
  }
];

export function getFeaturedRooms(): Room[] {
  return ROOMS_DATA.filter((r) => r.featured);
}

export function getRoomById(idOrSlug: string): Room | undefined {
  return ROOMS_DATA.find((r) => r.id === idOrSlug || r.slug === idOrSlug);
}
