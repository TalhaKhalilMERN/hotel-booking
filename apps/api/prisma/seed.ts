/**
 * Prisma seed for Hamilton Hotel & Suites
 *
 * Seeds:
 *  - 1 Hotel
 *  - 6 Amenities
 *  - 4 RoomTypes  (Classic King, Deluxe Executive, Hamilton Master Suite, Family Twin)
 *  - 16 physical Rooms  (4 per room type)
 *  - 1 demo admin User  (password: Admin1234!)
 *  - 1 demo customer User  (password: Guest1234!)
 *
 * No bookings are seeded — real bookings will be created via the API.
 */

import { PrismaClient, RoomStatus, UserRole } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Produces a SHA-256 hex digest of the password.
 *
 * NOTE: SHA-256 is used here only for seeding demo/test accounts so that
 * no additional npm package is required in the seed script.
 * The real authentication layer MUST use bcrypt (cost ≥ 12) or Argon2.
 * Never use SHA-256 for production passwords.
 */
function hashPassword(plain: string): string {
  return crypto.createHash("sha256").update(plain).digest("hex");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱  Seeding Hamilton Hotel & Suites...\n");

  // ── 1. Wipe existing data (reverse dependency order) ─────────────────────
  await prisma.bookingGuest.deleteMany();
  await prisma.bookingRoom.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.user.deleteMany();
  await prisma.room.deleteMany();
  await prisma.roomTypeAmenity.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.hotel.deleteMany();

  console.log("  ✓  Cleared existing data");

  // ── 2. Hotel ──────────────────────────────────────────────────────────────
  const hotel = await prisma.hotel.create({
    data: {
      name: "Hamilton Hotel & Suites",
      address: "GT Road",
      city: "Hamilton",
      country: "Pakistan",
      timezone: "Asia/Karachi",
      currency: "PKR",
      description:
        "Clean, comfortable rooms with 24/7 power backup and secure parking along GT Road, Hamilton, Pakistan.",
    },
  });

  console.log(`  ✓  Hotel: ${hotel.name}  (${hotel.id})`);

  // ── 3. Amenities ─────────────────────────────────────────────────────────
  const amenityData = [
    { name: "High-Speed Wi-Fi", iconKey: "Wifi" },
    { name: "Air Conditioning & Generator Backup", iconKey: "Wind" },
    { name: "Guarded GT Road Parking", iconKey: "Car" },
    { name: "In-House Dining & Breakfast", iconKey: "Utensils" },
    { name: "Flat Screen Smart TV", iconKey: "Tv" },
    { name: "Room Service & Tea Bar", iconKey: "Coffee" },
  ];

  const amenityMap: Record<string, string> = {}; // name → id

  for (const item of amenityData) {
    const amenity = await prisma.amenity.create({ data: item });
    amenityMap[item.name] = amenity.id;
  }

  console.log(`  ✓  ${amenityData.length} amenities created`);

  // ── 4. Room Types & physical Rooms ────────────────────────────────────────
  const roomTypesConfig = [
    {
      name: "Classic King Room",
      description:
        "Comfortable king-size bed, workstation, high-speed Wi-Fi, and modern ensuite shower with GT Road views.",
      basePrice: 8500,
      capacityAdults: 2,
      capacityChildren: 1,
      sizeSqm: 30,
      bedConfig: "1 King Bed",
      floor: 1,
      roomNumbers: ["101", "102", "103", "104"],
      amenityNames: [
        "High-Speed Wi-Fi",
        "Air Conditioning & Generator Backup",
        "Flat Screen Smart TV",
        "Room Service & Tea Bar",
      ],
    },
    {
      name: "Deluxe Executive Room",
      description:
        "Extra floor space, seating sofa, enlarged bathroom, and tea/coffee station for enhanced business comfort.",
      basePrice: 12000,
      capacityAdults: 2,
      capacityChildren: 2,
      sizeSqm: 40,
      bedConfig: "1 Super King Bed",
      floor: 2,
      roomNumbers: ["201", "202", "203", "204"],
      amenityNames: [
        "High-Speed Wi-Fi",
        "Air Conditioning & Generator Backup",
        "Guarded GT Road Parking",
        "In-House Dining & Breakfast",
        "Flat Screen Smart TV",
      ],
    },
    {
      name: "Hamilton Master Suite",
      description:
        "Spacious suite with separate lounge, dining table, master bedroom, and luxury bathroom amenities.",
      basePrice: 16500,
      capacityAdults: 3,
      capacityChildren: 2,
      sizeSqm: 58,
      bedConfig: "1 Emperor King Bed + Lounge Sofa",
      floor: 3,
      roomNumbers: ["301", "302", "303", "304"],
      amenityNames: [
        "High-Speed Wi-Fi",
        "Air Conditioning & Generator Backup",
        "Guarded GT Road Parking",
        "In-House Dining & Breakfast",
        "Flat Screen Smart TV",
        "Room Service & Tea Bar",
      ],
    },
    {
      name: "Family Twin Room",
      description:
        "Two double beds, spacious floor area, extra storage, and private bathroom — ideal for families.",
      basePrice: 22000,
      capacityAdults: 4,
      capacityChildren: 2,
      sizeSqm: 45,
      bedConfig: "2 Queen Beds",
      floor: 4,
      roomNumbers: ["401", "402", "403", "404"],
      amenityNames: [
        "High-Speed Wi-Fi",
        "Air Conditioning & Generator Backup",
        "Guarded GT Road Parking",
        "In-House Dining & Breakfast",
        "Flat Screen Smart TV",
      ],
    },
  ];

  let totalRooms = 0;

  for (const rt of roomTypesConfig) {
    // Create the RoomType
    const roomType = await prisma.roomType.create({
      data: {
        hotelId: hotel.id,
        name: rt.name,
        description: rt.description,
        basePrice: rt.basePrice,
        capacityAdults: rt.capacityAdults,
        capacityChildren: rt.capacityChildren,
        sizeSqm: rt.sizeSqm,
        bedConfig: rt.bedConfig,
      },
    });

    // Link amenities
    for (const amenityName of rt.amenityNames) {
      const amenityId = amenityMap[amenityName];
      if (!amenityId) {
        throw new Error(`Unknown amenity: "${amenityName}"`);
      }
      await prisma.roomTypeAmenity.create({
        data: { roomTypeId: roomType.id, amenityId },
      });
    }

    // Create physical rooms
    for (const roomNumber of rt.roomNumbers) {
      await prisma.room.create({
        data: {
          hotelId: hotel.id,
          roomTypeId: roomType.id,
          roomNumber,
          floor: rt.floor,
          status: RoomStatus.AVAILABLE,
        },
      });
    }

    totalRooms += rt.roomNumbers.length;
    console.log(
      `  ✓  RoomType "${roomType.name}"  →  ${rt.roomNumbers.length} rooms (${rt.roomNumbers.join(", ")})`
    );
  }

  console.log(`\n  ✓  ${totalRooms} physical rooms created across ${roomTypesConfig.length} room types`);

  // ── 5. Demo Users ─────────────────────────────────────────────────────────
  //
  // Passwords are SHA-256 hashed here ONLY for seed convenience.
  // The real authentication module MUST use bcrypt/Argon2.
  //
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@hamiltonhotel.pk",
      passwordHash: hashPassword("Admin1234!"),
      name: "Hamilton Admin",
      phone: "+92-300-0000001",
      role: UserRole.ADMIN,
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      email: "guest@example.com",
      passwordHash: hashPassword("Guest1234!"),
      name: "Demo Guest",
      phone: "+92-300-0000002",
      role: UserRole.CUSTOMER,
    },
  });

  console.log(`\n  ✓  Demo users:`);
  console.log(`       Admin    → ${adminUser.email}  (password: Admin1234!)`);
  console.log(`       Customer → ${customerUser.email}  (password: Guest1234!)`);
  console.log("\n🌱  Seeding complete.\n");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
