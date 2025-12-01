import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Raleway } from "next/font/google";
import "./globals.css";


export const dynamic = 'force-dynamic'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '700']
})

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['100','400', '700']
})
export const metadata: Metadata = {
  title: "DogoTracker",
  description: "Track smarter. Stay safer. Built with end-to-end encryption at its core.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.className} ${orbitron.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
