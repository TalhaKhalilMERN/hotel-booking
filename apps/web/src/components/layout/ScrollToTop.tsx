"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls the window back to (0, 0) on every route change.
 *
 * Next.js App Router's <Link> has scroll={true} by default, but it can be
 * unreliable when:
 *  - navigating away from a deeply-scrolled page (e.g. /rooms/[id])
 *  - using hash links like /#amenities which override the scroll target
 *  - the scroll container is not the <html> element
 *
 * This component watches pathname changes and explicitly resets scroll,
 * acting as a reliable fallback that works in all cases.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Only reset scroll for real route changes (not hash-only changes).
    // Hash links (/#amenities, /#gallery) should scroll to their target,
    // so we skip reset when the URL has a hash.
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
