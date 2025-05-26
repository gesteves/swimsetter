import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";


export const metadata = {
  title: "Endless Pool Set Tracker",
  description: "Track your Endless Pool swim workouts by time and pace",
  viewport: {
    width: "device-width",
    minimumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
