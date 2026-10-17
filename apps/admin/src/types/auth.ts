import type { ApiHotel, ApiRoomTypesResponse } from "./api";

export interface AuthenticatedAdminUser {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "STAFF" | "CUSTOMER";
}

export interface LoginResponse {
  user: AuthenticatedAdminUser;
  token: string;
}

export interface AuthSessionResponse {
  user: AuthenticatedAdminUser | null;
  authenticated: boolean;
}
