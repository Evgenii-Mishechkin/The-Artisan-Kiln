import type { Metadata } from "next";
import { Pathway_Gothic_One } from "next/font/google";
import { StoreProvider } from "@/components/providers/StoreProvider";
import "./globals.css";

const pathwayGothic = Pathway_Gothic_One({
  variable: "--font-pathway-gothic",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Artisan Kiln — Ceramic Tile Order",
  description: "Order form for ceramic tile collections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pathwayGothic.variable} font-sans`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
