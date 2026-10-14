/**
 * TypeScript API Response Types for Hamilton Hotel & Suites backend.
 * Matches the NestJS API contracts from:
 *   - GET /hotel
 *   - GET /hotels/:hotelId/room-types
 *
 * These types are intentionally duplicated from apps/web to keep the admin
 * app independently deployable without a shared workspace package.
 */

export interface ApiHotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  description: string | null;
  timezone: string;
  currency: string;
}

export interface ApiAmenity {
  id: string;
  name: string;
  iconKey: string | null;
}

export interface ApiRoomType {
  id: string;
  name: string;
  description: string | null;
  /** Decimal monetary value represented as string from Prisma/NestJS */
  basePrice: string;
  capacityAdults: number;
  capacityChildren: number;
  sizeSqm: number | null;
  bedConfig: string | null;
  amenities: ApiAmenity[];
}

export interface ApiRoomTypesResponse {
  hotelId: string;
  currency: string;
  roomTypes: ApiRoomType[];
}
