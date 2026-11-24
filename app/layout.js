import { Barlow } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4101"),
  title: {
    default: brand.rootTitle,
    template: `%s — ${brand.portalTitle}`,
  },
  description: brand.description,
  icons: {
    icon: brand.iconSrc,
    apple: brand.appleIconSrc,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={brand.theme} className={barlow.variable}>
      <body>{children}</body>
    </html>
  );
}
