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
  subheading: "45-Room Hotel & Dining on GT Road",
  tagline: "Clean, comfortable rooms with 24/7 power backup and secure parking along GT Road, Hamilton, Pakistan.",
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
    "Direct Booking Rate Guarantee",
    "Complimentary Breakfast Included",
    "Flexible Free Cancellation",
    "Secure On-Site Parking & 24/7 Generator Backup"
  ]
};

export const HOTEL_AMENITIES: HotelFeatureAmenity[] = [
  {
    id: "climate",
    title: "24/7 Generator & Climate Control",
    description: "Uninterrupted power supply with heavy-duty backup generators and individual split AC in every room.",
    category: "comfort",
    iconName: "Wind"
  },
  {
    id: "parking",
    title: "Secure On-Site Parking",
    description: "Dedicated guarded parking lot with 24/7 security cameras and direct, easy pull-in from GT Road.",
    category: "service",
    iconName: "Car"
  },
  {
    id: "wifi",
    title: "High-Speed Fiber Wi-Fi",
    description: "Reliable fiber internet access throughout all guest rooms, dining spaces, and front lobby.",
    category: "service",
    iconName: "Wifi"
  },
  {
    id: "dining",
    title: "Hamilton Kitchen & Dining",
    description: "Freshly cooked local breakfast, daily lunch specials, and traditional Pakistani & continental dinner.",
    category: "dining",
    iconName: "Utensils"
  },
  {
    id: "roomservice",
    title: "Room Service & Tea Bar",
    description: "Fresh tea, coffee, snacks, and full meals delivered directly to your door until late night.",
    category: "dining",
    iconName: "Coffee"
  },
  {
    id: "concierge",
    title: "24-Hour Front Desk",
    description: "Friendly front desk team available around the clock for check-ins, extra bedding, and local travel directions.",
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
