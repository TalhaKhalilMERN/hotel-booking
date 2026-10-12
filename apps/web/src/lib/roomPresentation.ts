import type { ApiRoomType } from "@/types/api";
import type { RoomPresentationMetadata, RoomType } from "@/types/room";

/**
 * Presentation metadata keyed strictly by verified backend room-type name.
 * Stored independently of the database contract.
 * Matching is performed by stable, explicit key (room name), never by array index.
 */
export const ROOM_PRESENTATION_METADATA: Record<string, RoomPresentationMetadata> = {
  "Classic King Room": {
    slug: "standard-king-room",
    tagline: "Comfortable, quiet room equipped for business and short stays.",
    longDescription:
      "Designed for travelers visiting Hamilton along the GT Road corridor, the Classic King Room provides a relaxing retreat with double-glazed acoustic windows, warm lighting, split air conditioning, and daily housekeeping.",
    floor: "1st & 2nd Floors",
    view: "Courtyard View",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    ],
    totalRoomsInCategory: 16,
  },
  "Deluxe Executive Room": {
    slug: "deluxe-executive-room",
    tagline: "Expanded living area with modern furnishings and balcony view.",
    longDescription:
      "The Deluxe Executive Room provides added space and modern convenience. Features an comfortable sofa nook, vanity mirror, soundproof glazing, and fast room service delivery.",
    floor: "2nd & 3rd Floors",
    view: "GT Road Avenue View",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    ],
    totalRoomsInCategory: 14,
  },
  "Hamilton Master Suite": {
    slug: "hamilton-master-suite",
    tagline: "Our premier suite featuring separate living lounge and dining space.",
    longDescription:
      "Designed for guests seeking maximum privacy and living room space. Includes a dedicated salon area for receiving visitors, two smart TVs, coffee bar, and priority room service.",
    floor: "4th Floor",
    view: "Panoramic GT Road & Skyline",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    totalRoomsInCategory: 6,
  },
  "Family Twin Room": {
    slug: "family-twin-room",
    tagline: "Two comfortable queen beds suitable for family travel.",
    longDescription:
      "Comfortable layout tailored for families or group companions traveling together. Features double queen beds, ample luggage storage, and full climate control.",
    floor: "2nd & 3rd Floors",
    view: "City View",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    ],
    totalRoomsInCategory: 9,
  },
};

/**
 * Resolves presentation metadata for a given room-type name.
 * Returns verified metadata if found, or safe fallback values if unmapped.
 */
export function getRoomPresentationMetadata(name: string): {
  presentation: RoomPresentationMetadata;
  isMatched: boolean;
} {
  const match = ROOM_PRESENTATION_METADATA[name];
  if (match) {
    return { presentation: match, isMatched: true };
  }

  const generatedSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const fallback: RoomPresentationMetadata = {
    slug: generatedSlug,
    tagline: "Quality accommodation at Hamilton Hotel & Suites.",
    longDescription:
      "Clean, comfortable room with 24/7 power backup and secure parking along GT Road, Hamilton, Pakistan.",
    floor: "Guest Floors",
    view: "City View",
    featured: false,
    heroImage:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    ],
    totalRoomsInCategory: 4,
  };

  return { presentation: fallback, isMatched: false };
}

/**
 * Enriches a canonical ApiRoomType with UI presentation metadata.
 * Does NOT convert or rename any backend fields.
 */
export function enrichRoomTypeWithPresentation(roomType: ApiRoomType): RoomType {
  const { presentation, isMatched } = getRoomPresentationMetadata(roomType.name);

  if (!isMatched) {
    console.warn(
      `[roomPresentation] No explicit presentation metadata found for backend room-type "${roomType.name}". Using fallback visual metadata.`
    );
  }

  return {
    ...roomType,
    ...presentation,
  };
}

/**
 * Enriches an array of ApiRoomType records with UI presentation metadata.
 */
export function enrichRoomTypesWithPresentation(roomTypes: ApiRoomType[]): RoomType[] {
  return roomTypes.map(enrichRoomTypeWithPresentation);
}

/**
 * Helper to check whether an array of room names has full coverage in the presentation metadata dictionary.
 */
export function checkRoomPresentationCoverage(roomNames: string[]): {
  matched: string[];
  unmatched: string[];
} {
  const matched: string[] = [];
  const unmatched: string[] = [];

  for (const name of roomNames) {
    if (ROOM_PRESENTATION_METADATA[name]) {
      matched.push(name);
    } else {
      unmatched.push(name);
    }
  }

  return { matched, unmatched };
}
