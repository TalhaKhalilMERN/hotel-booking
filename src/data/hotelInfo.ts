export interface HotelFeatureAmenity {
  id: string;
  title: string;
  description: string;
  category: "wellness" | "dining" | "service" | "comfort";
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "rooms" | "dining" | "atmosphere" | "wellness";
  imageUrl: string;
}

export const HOTEL_INFO = {
  name: "Hamilton Hotel & Suites",
  subheading: "Boutique Residence & Dining",
  tagline: "Refined comfort, tailored hospitality, and convenient access along GT Road, Hamilton, Pakistan.",
  phone: "+92 51 4900123",
  email: "reservations@hamiltonhotel.pk",
  address: "Hamilton, GT Road, Pakistan",
  googleMapsUrl: "https://maps.app.goo.gl/fDa3vPWNZzwwL4BV7",
  country: "Pakistan",
  city: "Hamilton",
  location: "GT Road",
  currency: "PKR",
  currencySymbol: "Rs.",
  timezone: "Asia/Karachi",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  totalRooms: 45,
  guarantees: [
    "Best Rate Direct Guarantee",
    "Complimentary Breakfast Included",
    "Flexible Cancellation Policy",
    "Secure On-Site Parking & Power Backup"
  ]
};

export const HOTEL_AMENITIES: HotelFeatureAmenity[] = [
  {
    id: "wifi",
    title: "High-Speed Wi-Fi",
    description: "Complimentary fiber Wi-Fi across all guest rooms, business lounges, and dining areas.",
    category: "service",
    iconName: "Wifi"
  },
  {
    id: "parking",
    title: "Secure On-Site Parking",
    description: "Dedicated parking with 24/7 security surveillance and convenient access to GT Road.",
    category: "service",
    iconName: "Car"
  },
  {
    id: "dining",
    title: "Hamilton Dining Restaurant",
    description: "Serving fresh local and international cuisine, grilled specialties, and breakfast buffet.",
    category: "dining",
    iconName: "Utensils"
  },
  {
    id: "roomservice",
    title: "In-Room Dining",
    description: "Freshly prepared meals and tea/coffee served directly to your room.",
    category: "dining",
    iconName: "Coffee"
  },
  {
    id: "climate",
    title: "Air Conditioning & Power Backup",
    description: "Individual room climate control backed by uninterrupted generator support.",
    category: "comfort",
    iconName: "Wind"
  },
  {
    id: "concierge",
    title: "Guest Concierge & Reception",
    description: "Round-the-clock desk support, travel advice, and car hire assistance.",
    category: "service",
    iconName: "Compass"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Hotel Entrance & Lounge",
    category: "atmosphere",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-2",
    title: "Executive Deluxe Room",
    category: "rooms",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-3",
    title: "Hamilton Dining Hall",
    category: "dining",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-4",
    title: "Terrace & Courtyard",
    category: "atmosphere",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-5",
    title: "Modern Ensuite Bath",
    category: "rooms",
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-6",
    title: "Breakfast & Coffee Lounge",
    category: "dining",
    imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
  }
];
