import type { ApiAmenity } from "@/types/api";
import type { RoomType, RoomPresentationMetadata } from "@/types/room";

export type { RoomType, RoomPresentationMetadata };
export type RoomAmenity = ApiAmenity;

export interface BookingSearchParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

/**
 * Transitional Room model for the frontend.
 * Directly implements canonical RoomType (incorporating the backend contract:
 * real UUID, basePrice decimal string, capacityAdults, capacityChildren, bedConfig, sizeSqm).
 *
 * Retains transitional legacy aliases so unconverted pages continue to build cleanly
 * until they are migrated in the subsequent page integration task.
 */
export interface Room extends RoomType {
  /** Canonical relational amenity objects from database */
  amenityObjects: ApiAmenity[];

  /**
   * @deprecated Legacy mock field. Use canonical `basePrice` (decimal string) formatted via `formatCurrency()`.
   */
  pricePerNight: number;

  /**
   * @deprecated Legacy mock field. Use canonical `capacityAdults` and `capacityChildren`.
   */
  capacity: {
    adults: number;
    children: number;
  };

  /**
   * @deprecated Legacy mock field. Use canonical `bedConfig`.
   */
  bedType: string;

  /**
   * @deprecated Legacy mock field. Use canonical `sizeSqm`.
   */
  sizeSqM: number;

  /**
   * @deprecated Legacy string amenities array required by unconverted detail page template.
   * To be replaced by rendering `amenity.name` from canonical `amenities: ApiAmenity[]`.
   */
  amenities: any[];

  /**
   * @deprecated Legacy mock ID (e.g. "std-01"). The canonical identifier is the database UUID `id`.
   */
  legacyId?: string;
}

export const ROOMS_DATA: Room[] = [
  {
    id: "3738d8ab-2e11-4520-b6d2-36450952c33b",
    legacyId: "std-01",
    slug: "standard-king-room",
    name: "Classic King Room",
    tagline: "Comfortable, quiet room equipped for business and short stays.",
    description:
      "Comfortable king-size bed, workstation, high-speed Wi-Fi, and modern ensuite shower with GT Road views.",
    longDescription:
      "Designed for travelers visiting Hamilton along the GT Road corridor, the Classic King Room provides a relaxing retreat with double-glazed acoustic windows, warm lighting, split air conditioning, and daily housekeeping.",
    basePrice: "8500",
    pricePerNight: 8500,
    capacityAdults: 2,
    capacityChildren: 1,
    capacity: {
      adults: 2,
      children: 1,
    },
    bedConfig: "1 King Bed",
    bedType: "1 King Bed",
    sizeSqm: 30,
    sizeSqM: 30,
    floor: "1st & 2nd Floors",
    view: "Courtyard View",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    ],
    amenityObjects: [
      { id: "ac7b43f2-58df-40da-89fe-7a9389948c92", name: "High-Speed Wi-Fi", iconKey: "Wifi" },
      { id: "92bc46d1-ed9a-4c7b-b82f-b1b595decd86", name: "Air Conditioning & Generator Backup", iconKey: "Wind" },
      { id: "134a0d2a-d770-4dd6-831a-997a7cf5a39b", name: "Flat Screen Smart TV", iconKey: "Tv" },
      { id: "4267de05-c8a0-43a9-96fb-e88046b32ff0", name: "Room Service & Tea Bar", iconKey: "Coffee" },
    ],
    amenities: [
      "High-Speed Wi-Fi",
      "Air Conditioning & Generator Backup",
      "Flat Screen Smart TV",
      "Room Service & Tea Bar",
    ],
    totalRoomsInCategory: 16,
  },
  {
    id: "d7c176d3-14fe-4bf1-be1c-c367fb540beb",
    legacyId: "dlx-02",
    slug: "deluxe-executive-room",
    name: "Deluxe Executive Room",
    tagline: "Expanded living area with modern furnishings and balcony view.",
    description:
      "Extra floor space, seating sofa, enlarged bathroom, and tea/coffee station for enhanced business comfort.",
    longDescription:
      "The Deluxe Executive Room provides added space and modern convenience. Features an comfortable sofa nook, vanity mirror, soundproof glazing, and fast room service delivery.",
    basePrice: "12000",
    pricePerNight: 12000,
    capacityAdults: 2,
    capacityChildren: 2,
    capacity: {
      adults: 2,
      children: 2,
    },
    bedConfig: "1 Super King Bed",
    bedType: "1 Super King Bed",
    sizeSqm: 40,
    sizeSqM: 40,
    floor: "2nd & 3rd Floors",
    view: "GT Road Avenue View",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    ],
    amenityObjects: [
      { id: "ac7b43f2-58df-40da-89fe-7a9389948c92", name: "High-Speed Wi-Fi", iconKey: "Wifi" },
      { id: "92bc46d1-ed9a-4c7b-b82f-b1b595decd86", name: "Air Conditioning & Generator Backup", iconKey: "Wind" },
      { id: "f301a42e-1956-4351-a248-4e1703a11efc", name: "Guarded GT Road Parking", iconKey: "Car" },
      { id: "8270cc71-381b-4531-b527-87b63e041bfb", name: "In-House Dining & Breakfast", iconKey: "Utensils" },
      { id: "134a0d2a-d770-4dd6-831a-997a7cf5a39b", name: "Flat Screen Smart TV", iconKey: "Tv" },
    ],
    amenities: [
      "High-Speed Wi-Fi",
      "Air Conditioning & Generator Backup",
      "Guarded GT Road Parking",
      "In-House Dining & Breakfast",
      "Flat Screen Smart TV",
    ],
    totalRoomsInCategory: 14,
  },
  {
    id: "7da34b60-20dc-4662-87e3-72a741171aea",
    legacyId: "exe-03",
    slug: "hamilton-master-suite",
    name: "Hamilton Master Suite",
    tagline: "Our premier suite featuring separate living lounge and dining space.",
    description:
      "Spacious suite with separate lounge, dining table, master bedroom, and luxury bathroom amenities.",
    longDescription:
      "Designed for guests seeking maximum privacy and living room space. Includes a dedicated salon area for receiving visitors, two smart TVs, coffee bar, and priority room service.",
    basePrice: "16500",
    pricePerNight: 16500,
    capacityAdults: 3,
    capacityChildren: 2,
    capacity: {
      adults: 3,
      children: 2,
    },
    bedConfig: "1 Emperor King Bed + Lounge Sofa",
    bedType: "1 Emperor King Bed + Lounge Sofa",
    sizeSqm: 58,
    sizeSqM: 58,
    floor: "4th Floor",
    view: "Panoramic GT Road & Skyline",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    amenityObjects: [
      { id: "ac7b43f2-58df-40da-89fe-7a9389948c92", name: "High-Speed Wi-Fi", iconKey: "Wifi" },
      { id: "92bc46d1-ed9a-4c7b-b82f-b1b595decd86", name: "Air Conditioning & Generator Backup", iconKey: "Wind" },
      { id: "f301a42e-1956-4351-a248-4e1703a11efc", name: "Guarded GT Road Parking", iconKey: "Car" },
      { id: "8270cc71-381b-4531-b527-87b63e041bfb", name: "In-House Dining & Breakfast", iconKey: "Utensils" },
      { id: "134a0d2a-d770-4dd6-831a-997a7cf5a39b", name: "Flat Screen Smart TV", iconKey: "Tv" },
      { id: "4267de05-c8a0-43a9-96fb-e88046b32ff0", name: "Room Service & Tea Bar", iconKey: "Coffee" },
    ],
    amenities: [
      "High-Speed Wi-Fi",
      "Air Conditioning & Generator Backup",
      "Guarded GT Road Parking",
      "In-House Dining & Breakfast",
      "Flat Screen Smart TV",
      "Room Service & Tea Bar",
    ],
    totalRoomsInCategory: 6,
  },
  {
    id: "862f9804-a9cf-405b-874b-eda101a11133",
    legacyId: "twn-04",
    slug: "family-twin-room",
    name: "Family Twin Room",
    tagline: "Two comfortable queen beds suitable for family travel.",
    description:
      "Two double beds, spacious floor area, extra storage, and private bathroom — ideal for families.",
    longDescription:
      "Comfortable layout tailored for families or group companions traveling together. Features double queen beds, ample luggage storage, and full climate control.",
    basePrice: "22000",
    pricePerNight: 22000,
    capacityAdults: 4,
    capacityChildren: 2,
    capacity: {
      adults: 4,
      children: 2,
    },
    bedConfig: "2 Queen Beds",
    bedType: "2 Queen Beds",
    sizeSqm: 45,
    sizeSqM: 45,
    floor: "2nd & 3rd Floors",
    view: "City View",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    ],
    amenityObjects: [
      { id: "ac7b43f2-58df-40da-89fe-7a9389948c92", name: "High-Speed Wi-Fi", iconKey: "Wifi" },
      { id: "92bc46d1-ed9a-4c7b-b82f-b1b595decd86", name: "Air Conditioning & Generator Backup", iconKey: "Wind" },
      { id: "f301a42e-1956-4351-a248-4e1703a11efc", name: "Guarded GT Road Parking", iconKey: "Car" },
      { id: "8270cc71-381b-4531-b527-87b63e041bfb", name: "In-House Dining & Breakfast", iconKey: "Utensils" },
      { id: "134a0d2a-d770-4dd6-831a-997a7cf5a39b", name: "Flat Screen Smart TV", iconKey: "Tv" },
    ],
    amenities: [
      "High-Speed Wi-Fi",
      "Air Conditioning & Generator Backup",
      "Guarded GT Road Parking",
      "In-House Dining & Breakfast",
      "Flat Screen Smart TV",
    ],
    totalRoomsInCategory: 9,
  },
];

export function getFeaturedRooms(): Room[] {
  return ROOMS_DATA.filter((r) => r.featured);
}

export function getRoomById(idOrSlug: string): Room | undefined {
  return ROOMS_DATA.find(
    (r) => r.id === idOrSlug || r.slug === idOrSlug || r.legacyId === idOrSlug
  );
}
