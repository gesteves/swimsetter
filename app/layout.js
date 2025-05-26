import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Endless Pool Set Tracker",
  description: "Track your Endless Pool swim workouts by time and pace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.className} min-h-[100dvh] max-w-full`}>
      <body className="min-h-[100dvh] max-w-full">
        {children}
      </body>
    </html>
  );
}
