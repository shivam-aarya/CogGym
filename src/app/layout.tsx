import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/layout/providers'
import { Navbar } from '@/components/layout/navbar'

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CogGym - AI Meets Cognitive Science",
  description: "A large-scale, collaborative platform where artificial intelligence meets cognitive science. Providing a unified benchmark for comparing human and machine intelligence through curated experiments from leading research labs.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
