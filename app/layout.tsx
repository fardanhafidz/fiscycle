import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { DemoPitchToolbar } from "@/components/shared/DemoPitchToolbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiscycle — Ekosistem Perikanan Sirkular",
  description:
    "Dari limbah menjadi sumber daya — Platform terintegrasi untuk ekosistem perikanan yang lebih berkelanjutan.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1A365D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        {children}
        <DemoPitchToolbar />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
