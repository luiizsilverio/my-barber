import type { Metadata } from "next";
import AuthProvider from "./_providers/auth";
import { Inter } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";

import Footer from "./_components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Barber",
  description: "Desenvolvido durante a Full Stack Week #3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {children}
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
