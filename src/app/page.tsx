import Hero from "@/components/hero/Hero";
import FeaturedRooms from "@/components/rooms/FeaturedRooms";
import AmenitiesSection from "@/components/amenities/AmenitiesSection";
import HotelAboutSection from "@/components/about/HotelAboutSection";
import GallerySection from "@/components/gallery/GallerySection";
import LocationSection from "@/components/location/LocationSection";
import BookingCTASection from "@/components/cta/BookingCTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedRooms />
      <AmenitiesSection />
      <HotelAboutSection />
      <GallerySection />
      <LocationSection />
      <BookingCTASection />
    </>
  );
}
