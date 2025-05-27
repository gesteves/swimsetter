import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import Analytics from './components/Analytics';

export const metadata = {
  title: "SwimSetter · Given to Tri",
  description: "Track your Endless Pool swim workouts by time and pace.",
};

export const viewport = {
  width: "device-width",
  minimumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <Analytics />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
