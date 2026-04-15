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
  description: "is a privacy-first web app that empowers users to monitor their digital footprint. Scan the internet for traces of your email, visualize your online presence, and use AI to manage or request deletion of your data—securely and on your terms.",
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
