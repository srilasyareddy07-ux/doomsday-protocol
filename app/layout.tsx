import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import DoomsdayCountdown from "@/components/DoomsdayCountdown";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Doomsday Protocol",
  description:
    "Track your watch order, explore the Multiverse, place your Death Pool predictions, and answer to Doom himself before Avengers: Doomsday.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <DoomsdayCountdown />
        <Analytics />
      </body>
    </html>
  );
}
