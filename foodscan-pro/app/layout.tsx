import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodScan Pro - Analyse nutritionnelle intelligente",
  description: "Application de scan de codes-barres et d'analyse nutritionnelle par IA pour les sportifs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <footer className="bg-white dark:bg-gray-900 shadow mt-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 md:flex md:items-center md:justify-between">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; 2024 FoodScan Pro. Tous droits réservés.
            </div>
            <div className="mt-4 flex justify-center space-x-6 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                Confidentialité
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                Conditions
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 