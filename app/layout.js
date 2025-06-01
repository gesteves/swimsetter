import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata = {
  title: "SwimSetter · Given to Tri",
  description: "A workout tracker for Endless Pools and swim spas. Record swimming pace and duration of your sets, and track your total workout time and distance.",
};

export const viewport = {
  width: "device-width",
  minimumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <main className="min-h-[100dvh] p-4 text-lg flex justify-center bg-blue-50 dark:bg-gray-900 pb-[var(--bottom-padding)]">
          <div className="w-full max-w-2xl space-y-3">
           {children}
          </div>
        </main>
      </body>
    </html>
  );
}
