import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layount/mainLayout";
import { CartProvider } from "@/components/cart/cart-provider";
import { Toaster } from "sonner";
import FullScreenApp from "@/components/navbar/fullSize/full-size";
export const runtime = 'edge';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All Novu Tienda",
  description: "La mejor tienda en electrodomésticos en Latino América",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <CartProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </CartProvider>
        <Toaster position="top-center" richColors />
        <FullScreenApp />
        {/* <IdlePromotionCarousel /> */}
      </body>
    </html>
  );
}
