-- ============================================================================
-- Migration: 20241008_init_approved_mvp_schema
-- Hamilton Hotel & Suites — Initial approved MVP schema
-- ============================================================================

-- ---------------------------------------------------------------------------
-- STEP 0: Enable btree_gist extension
-- Required for the PostgreSQL EXCLUDE USING GIST constraint on BookingRoom.
-- This constraint prevents physical room double-bookings at the DB level.
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE "RoomStatus"    AS ENUM ('AVAILABLE', 'MAINTENANCE', 'INACTIVE');
CREATE TYPE "UserRole"      AS ENUM ('CUSTOMER', 'STAFF', 'ADMIN');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'NO_SHOW');
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PARTIALLY_PAID', 'PAID', 'REFUNDED');
CREATE TYPE "GuestType"     AS ENUM ('ADULT', 'CHILD');

-- ---------------------------------------------------------------------------
-- Hotel
-- ---------------------------------------------------------------------------
CREATE TABLE "Hotel" (
    "id"          TEXT NOT NULL,
    "name"        TEXT NOT NULL,
    "address"     TEXT NOT NULL,
    "city"        TEXT NOT NULL,
    "country"     TEXT NOT NULL,
    "description" TEXT,
    "timezone"    TEXT NOT NULL,   -- e.g. "Asia/Karachi"
    "currency"    TEXT NOT NULL,   -- e.g. "PKR"
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- RoomType  — sellable accommodation product
-- ---------------------------------------------------------------------------
CREATE TABLE "RoomType" (
    "id"               TEXT         NOT NULL,
    "hotelId"          TEXT         NOT NULL,
    "name"             TEXT         NOT NULL,
    "description"      TEXT,
    "basePrice"        DECIMAL(65,30) NOT NULL,   -- MUST remain Decimal, not Float
    "capacityAdults"   INTEGER      NOT NULL,
    "capacityChildren" INTEGER      NOT NULL,
    "sizeSqm"          DOUBLE PRECISION,           -- floor area; not monetary so Float is OK
    "bedConfig"        TEXT,
    "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"        TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- Room  — physical room unit (inventory)
--
-- IMPORTANT: status is an OPERATIONAL flag.
-- Availability for a date range is derived from BookingRoom records.
-- ---------------------------------------------------------------------------
CREATE TABLE "Room" (
    "id"         TEXT           NOT NULL,
    "hotelId"    TEXT           NOT NULL,
    "roomTypeId" TEXT           NOT NULL,
    "roomNumber" TEXT           NOT NULL,
    "floor"      INTEGER,
    "status"     "RoomStatus"   NOT NULL DEFAULT 'AVAILABLE',
    "createdAt"  TIMESTAMP(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"  TIMESTAMP(3)   NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- Amenity
-- ---------------------------------------------------------------------------
CREATE TABLE "Amenity" (
    "id"      TEXT NOT NULL,
    "name"    TEXT NOT NULL,
    "iconKey" TEXT,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- RoomTypeAmenity  — many-to-many junction
-- ---------------------------------------------------------------------------
CREATE TABLE "RoomTypeAmenity" (
    "roomTypeId" TEXT NOT NULL,
    "amenityId"  TEXT NOT NULL,

    CONSTRAINT "RoomTypeAmenity_pkey" PRIMARY KEY ("roomTypeId", "amenityId")
);

-- ---------------------------------------------------------------------------
-- User  — authenticated account
-- ---------------------------------------------------------------------------
CREATE TABLE "User" (
    "id"           TEXT       NOT NULL,
    "email"        TEXT       NOT NULL,
    "passwordHash" TEXT       NOT NULL,
    "name"         TEXT       NOT NULL,
    "phone"        TEXT,
    "role"         "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- Booking
-- ---------------------------------------------------------------------------
CREATE TABLE "Booking" (
    "id"                 TEXT            NOT NULL,
    "bookingReference"   TEXT            NOT NULL,
    "hotelId"            TEXT            NOT NULL,
    "userId"             TEXT,                         -- nullable: walk-in bookings
    "contactName"        TEXT            NOT NULL,
    "contactEmail"       TEXT            NOT NULL,
    "contactPhone"       TEXT,
    "status"             "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus"      "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "totalPrice"         DECIMAL(65,30)  NOT NULL,     -- snapshot at booking time
    "currency"           TEXT            NOT NULL,     -- snapshot of Hotel.currency
    "cancellationReason" TEXT,
    "cancelledAt"        TIMESTAMP(3),
    "createdAt"          TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"          TIMESTAMP(3)    NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- BookingRoom  — one room-line inside a booking
--
-- roomId IS NULLABLE.  Customers book a RoomType; staff assign a physical
-- Room later.  The PostgreSQL EXCLUDE constraint below prevents two
-- BookingRooms from overlapping on the same physical room, but ONLY when
-- roomId IS NOT NULL.
--
-- ⚠ CONCURRENCY WARNING (RoomType-level overbooking):
--   This constraint does NOT prevent overbooking at the RoomType level,
--   e.g. booking more BookingRooms for a RoomType than physical rooms exist.
--   That protection MUST be implemented in the Booking service via a
--   serialised database transaction (SELECT FOR UPDATE or advisory locks).
-- ---------------------------------------------------------------------------
CREATE TABLE "BookingRoom" (
    "id"            TEXT           NOT NULL,
    "bookingId"     TEXT           NOT NULL,
    "roomTypeId"    TEXT           NOT NULL,
    "roomId"        TEXT,                          -- nullable until staff assigns
    "checkIn"       TIMESTAMP(3)   NOT NULL,
    "checkOut"      TIMESTAMP(3)   NOT NULL,
    "adults"        INTEGER        NOT NULL,
    "children"      INTEGER        NOT NULL DEFAULT 0,
    "pricePerNight" DECIMAL(65,30) NOT NULL,       -- snapshot
    "subtotal"      DECIMAL(65,30) NOT NULL,       -- snapshot
    "createdAt"     TIMESTAMP(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3)   NOT NULL,

    CONSTRAINT "BookingRoom_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- BookingGuest
-- ---------------------------------------------------------------------------
CREATE TABLE "BookingGuest" (
    "id"            TEXT        NOT NULL,
    "bookingId"     TEXT        NOT NULL,
    "bookingRoomId" TEXT,                   -- nullable: room assignment optional
    "fullName"      TEXT        NOT NULL,
    "guestType"     "GuestType" NOT NULL,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingGuest_pkey" PRIMARY KEY ("id")
);

-- ============================================================================
-- Unique Constraints
-- ============================================================================
CREATE UNIQUE INDEX "RoomType_hotelId_name_key"    ON "RoomType"("hotelId", "name");
CREATE UNIQUE INDEX "Room_hotelId_roomNumber_key"   ON "Room"("hotelId", "roomNumber");
CREATE UNIQUE INDEX "Amenity_name_key"              ON "Amenity"("name");
CREATE UNIQUE INDEX "User_email_key"                ON "User"("email");
CREATE UNIQUE INDEX "Booking_bookingReference_key"  ON "Booking"("bookingReference");

-- ============================================================================
-- Performance Indexes
-- ============================================================================
CREATE INDEX "Room_roomTypeId_status_idx"                       ON "Room"("roomTypeId", "status");
CREATE INDEX "Booking_status_idx"                               ON "Booking"("status");
CREATE INDEX "Booking_userId_idx"                               ON "Booking"("userId");
CREATE INDEX "Booking_hotelId_idx"                              ON "Booking"("hotelId");
CREATE INDEX "BookingRoom_roomTypeId_checkIn_checkOut_idx"      ON "BookingRoom"("roomTypeId", "checkIn", "checkOut");
CREATE INDEX "BookingRoom_roomId_idx"                           ON "BookingRoom"("roomId");

-- ============================================================================
-- PHYSICAL ROOM DOUBLE-BOOKING EXCLUSION CONSTRAINT
-- ============================================================================
--
-- Prevents two BookingRoom rows from being assigned the same physical roomId
-- for overlapping date ranges.
--
-- This uses PostgreSQL's GIST-based exclusion constraint:
--   - tsrange("checkIn", "checkOut", '[)') — a half-open date range
--     [checkIn, checkOut) meaning checkIn is inclusive, checkOut exclusive.
--     This allows back-to-back bookings where one booking checks out on the
--     same day the next checks in.
--   - roomId WITH =  — the same physical room
--
-- The WHERE clause restricts the constraint to rows where roomId IS NOT NULL.
-- Unassigned BookingRooms (roomId = NULL) are excluded from the constraint
-- because NULL means "not yet assigned" — they don't occupy a physical room.
--
-- LIMITATION: This constraint prevents physical double-booking only.
-- RoomType-level overbooking (booking more rooms of a type than physically
-- exist) still requires application-layer protection via transactions.
-- ============================================================================
ALTER TABLE "BookingRoom"
    ADD CONSTRAINT "BookingRoom_no_physical_room_overlap"
    EXCLUDE USING GIST (
        "roomId"                                  WITH =,
        tsrange("checkIn", "checkOut", '[)') WITH &&
    )
    WHERE ("roomId" IS NOT NULL);

-- ============================================================================
-- Foreign Keys
-- ============================================================================
ALTER TABLE "RoomType"      ADD CONSTRAINT "RoomType_hotelId_fkey"         FOREIGN KEY ("hotelId")       REFERENCES "Hotel"("id")       ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Room"          ADD CONSTRAINT "Room_hotelId_fkey"              FOREIGN KEY ("hotelId")       REFERENCES "Hotel"("id")       ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Room"          ADD CONSTRAINT "Room_roomTypeId_fkey"           FOREIGN KEY ("roomTypeId")    REFERENCES "RoomType"("id")    ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RoomTypeAmenity" ADD CONSTRAINT "RoomTypeAmenity_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id")   ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RoomTypeAmenity" ADD CONSTRAINT "RoomTypeAmenity_amenityId_fkey"  FOREIGN KEY ("amenityId")  REFERENCES "Amenity"("id")    ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Booking"       ADD CONSTRAINT "Booking_hotelId_fkey"           FOREIGN KEY ("hotelId")       REFERENCES "Hotel"("id")       ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Booking"       ADD CONSTRAINT "Booking_userId_fkey"            FOREIGN KEY ("userId")        REFERENCES "User"("id")        ON DELETE SET NULL  ON UPDATE CASCADE;
ALTER TABLE "BookingRoom"   ADD CONSTRAINT "BookingRoom_bookingId_fkey"     FOREIGN KEY ("bookingId")     REFERENCES "Booking"("id")     ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "BookingRoom"   ADD CONSTRAINT "BookingRoom_roomTypeId_fkey"    FOREIGN KEY ("roomTypeId")    REFERENCES "RoomType"("id")    ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "BookingRoom"   ADD CONSTRAINT "BookingRoom_roomId_fkey"        FOREIGN KEY ("roomId")        REFERENCES "Room"("id")        ON DELETE SET NULL  ON UPDATE CASCADE;
ALTER TABLE "BookingGuest"  ADD CONSTRAINT "BookingGuest_bookingId_fkey"    FOREIGN KEY ("bookingId")     REFERENCES "Booking"("id")     ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "BookingGuest"  ADD CONSTRAINT "BookingGuest_bookingRoomId_fkey" FOREIGN KEY ("bookingRoomId") REFERENCES "BookingRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
