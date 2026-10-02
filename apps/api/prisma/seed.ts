import { PrismaClient, RoomStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for Hamilton Hotel & Suites...");

  // Clear existing data in reverse order of dependencies
  await prisma.booking.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.room.deleteMany();
  await prisma.roomTypeAmenity.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.hotel.deleteMany();

  // 1. Create Hotel
  const hotel = await prisma.hotel.create({
    data: {
      name: "Hamilton Hotel & Suites",
      address: "Hamilton, GT Road",
      city: "Hamilton",
      country: "Pakistan",
      description:
        "Clean, comfortable rooms with 24/7 power backup and secure parking along GT Road, Hamilton, Pakistan.",
    },
  });

  console.log(`Created Hotel: ${hotel.name} (${hotel.id})`);

  // 2. Create Amenities
  const amenityData = [
    { name: "High-Speed Wi-Fi", iconKey: "Wifi" },
    { name: "Air Conditioning & Generator Backup", iconKey: "Wind" },
    { name: "Guarded GT Road Parking", iconKey: "Car" },
    { name: "In-House Dining & Breakfast", iconKey: "Utensils" },
    { name: "Flat Screen Smart TV", iconKey: "Tv" },
    { name: "Room Service & Tea Bar", iconKey: "Coffee" },
  ];

  const createdAmenities: Record<string, string> = {};
  for (const item of amenityData) {
    const amenity = await prisma.amenity.create({
      data: item,
    });
    createdAmenities[item.name] = amenity.id;
  }

  console.log(`Created ${Object.keys(createdAmenities).length} Amenities.`);

  // 3. Create Room Types & Physical Rooms
  const roomTypesData = [
    {
      name: "Classic King Room",
      description:
        "Features a comfortable king-size bed, workstation, high-speed Wi-Fi, and modern ensuite shower room with GT Road access.",
      basePrice: 8500,
      capacityAdults: 2,
      capacityChildren: 1,
      sizeSqm: 30,
      bedConfig: "1 King Bed",
      roomNumbers: ["101", "102", "103", "104"],
      floor: 1,
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
        "Offers additional floor space, seating sofa, enlarged bathroom, and tea/coffee station for enhanced comfort.",
      basePrice: 12000,
      capacityAdults: 2,
      capacityChildren: 2,
      sizeSqm: 40,
      bedConfig: "1 Super King Bed",
      roomNumbers: ["201", "202", "203", "204"],
      floor: 2,
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
        "A spacious residence suite with separate lounge room, dining table, master bedroom, and luxury bathroom amenities.",
      basePrice: 16500,
      capacityAdults: 3,
      capacityChildren: 2,
      sizeSqm: 58,
      bedConfig: "1 Emperor King Bed + Lounge Sofa",
      roomNumbers: ["301", "302", "303", "304"],
      floor: 3,
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
        "Equipped with two double beds, spacious floor area, extra storage, and private bathroom suitable for families.",
      basePrice: 22000,
      capacityAdults: 4,
      capacityChildren: 2,
      sizeSqm: 45,
      bedConfig: "2 Queen Beds",
      roomNumbers: ["401", "402", "403", "404"],
      floor: 4,
      amenityNames: [
        "High-Speed Wi-Fi",
        "Air Conditioning & Generator Backup",
        "Guarded GT Road Parking",
        "In-House Dining & Breakfast",
        "Flat Screen Smart TV",
      ],
    },
  ];

  for (const rt of roomTypesData) {
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

    console.log(`Created Room Type: ${roomType.name} (${roomType.id})`);

    // Connect Amenities
    for (const amName of rt.amenityNames) {
      const amId = createdAmenities[amName];
      if (amId) {
        await prisma.roomTypeAmenity.create({
          data: {
            roomTypeId: roomType.id,
            amenityId: amId,
          },
        });
      }
    }

    // Create Physical Rooms
    for (const num of rt.roomNumbers) {
      await prisma.room.create({
        data: {
          hotelId: hotel.id,
          roomTypeId: roomType.id,
          roomNumber: num,
          floor: rt.floor,
          status: RoomStatus.AVAILABLE,
        },
      });
    }
    console.log(`Created ${rt.roomNumbers.length} Physical Rooms for ${roomType.name}.`);
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
