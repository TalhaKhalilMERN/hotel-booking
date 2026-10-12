import type { ApiAmenity, ApiRoomType } from "./api";

/**
 * Presentation metadata required for rich hotel UI cards, galleries, and detail views.
 * These presentation fields are kept strictly separate from the backend database response contract.
 */
export interface RoomPresentationMetadata {
  slug: string;
  tagline: string;
  longDescription: string;
  floor: string;
  view: string;
  featured: boolean;
  heroImage: string;
  images: string[];
  totalRoomsInCategory: number;
}

/**
 * Canonical RoomType representing a sellable accommodation product.
 * Combines the backend database contract (ApiRoomType) directly with UI presentation metadata.
 * Does NOT rename or restructure any backend fields:
 *   - id: string (database UUID)
 *   - name: string
 *   - description: string | null
 *   - basePrice: string (decimal string from API)
 *   - capacityAdults: number
 *   - capacityChildren: number
 *   - sizeSqm: number | null
 *   - bedConfig: string | null
 *   - amenities: ApiAmenity[]
 */
export interface RoomType extends ApiRoomType, RoomPresentationMetadata {}
