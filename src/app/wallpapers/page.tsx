import type { Metadata } from "next";
import { WallpapersListingClient } from "./wallpapers-client";

export const metadata: Metadata = {
  title: "Wallpapers",
  description:
    "Original desktop and mobile wallpapers created by Pranav K. Browse the collection and download free for personal use.",
  openGraph: {
    title: "Wallpapers | Pranav K",
    description:
      "Original desktop and mobile wallpapers — free downloads for personal use.",
  },
};

export default function WallpapersPage() {
  return <WallpapersListingClient />;
}
