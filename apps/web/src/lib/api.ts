import type { ApiHotel, ApiRoomTypesResponse } from "@/types/api";

/**
 * Custom error class for API request failures.
 * Captures HTTP status, requested endpoint, and server error response payload.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly endpoint: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface FetchOptions extends Omit<RequestInit, "cache"> {
  /**
   * Cache behavior. Defaults to "no-store" for live database-backed data.
   */
  cache?: RequestCache;
  /**
   * Next.js ISR revalidation interval in seconds.
   */
  revalidate?: number | false;
}

/**
 * Resolves the server-side API base URL from the environment variable API_BASE_URL.
 * Falls back to http://localhost:4000 for local development.
 */
export function getApiBaseUrl(): string {
  const envUrl = process.env.API_BASE_URL;
  const baseUrl = envUrl && envUrl.trim().length > 0 ? envUrl.trim() : "http://127.0.0.1:4000";
  return baseUrl.replace(/\/+$/, "");
}

/**
 * Core server-side HTTP request wrapper with robust error handling and explicit caching.
 */
async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${normalizedEndpoint}`;

  const { revalidate, cache = "no-store", headers, ...restOptions } = options;

  let response: Response;
  try {
    response = await fetch(fullUrl, {
      ...restOptions,
      headers: {
        Accept: "application/json",
        ...headers,
      },
      cache: revalidate !== undefined ? undefined : cache,
      ...(revalidate !== undefined ? { next: { revalidate } } : {}),
    });
  } catch (error) {
    throw new ApiError(
      `Network error communicating with backend API at ${fullUrl}: ${
        error instanceof Error ? error.message : String(error)
      }`,
      0,
      normalizedEndpoint
    );
  }

  if (!response.ok) {
    let errorDetails: unknown = null;
    try {
      errorDetails = await response.json();
    } catch {
      try {
        errorDetails = await response.text();
      } catch {
        errorDetails = null;
      }
    }

    throw new ApiError(
      `API request failed: ${response.status} ${response.statusText} on ${normalizedEndpoint}`,
      response.status,
      normalizedEndpoint,
      errorDetails
    );
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new ApiError(
      `Failed to parse JSON response from ${normalizedEndpoint}: ${
        error instanceof Error ? error.message : String(error)
      }`,
      response.status,
      normalizedEndpoint
    );
  }
}

/**
 * Fetches the hotel's metadata and ID.
 * Endpoint: GET /hotel
 */
export async function getHotel(options?: FetchOptions): Promise<ApiHotel> {
  return apiFetch<ApiHotel>("/hotel", options);
}

/**
 * Fetches the room types for a specific hotel ID.
 * Endpoint: GET /hotels/:hotelId/room-types
 *
 * @param hotelId The hotel's UUID (must not be empty)
 */
export async function getRoomTypes(
  hotelId: string,
  options?: FetchOptions
): Promise<ApiRoomTypesResponse> {
  if (!hotelId || typeof hotelId !== "string" || hotelId.trim() === "") {
    throw new ApiError("hotelId parameter is required and cannot be empty", 400, "/hotels/:hotelId/room-types");
  }

  return apiFetch<ApiRoomTypesResponse>(`/hotels/${encodeURIComponent(hotelId.trim())}/room-types`, options);
}

/**
 * Composite convenience helper that resolves the seeded hotel and queries its room types dynamically.
 * Avoids hardcoding any hotel UUIDs.
 */
export async function getHotelWithRoomTypes(
  options?: FetchOptions
): Promise<{ hotel: ApiHotel; roomTypesResponse: ApiRoomTypesResponse }> {
  const hotel = await getHotel(options);
  const roomTypesResponse = await getRoomTypes(hotel.id, options);
  return { hotel, roomTypesResponse };
}
