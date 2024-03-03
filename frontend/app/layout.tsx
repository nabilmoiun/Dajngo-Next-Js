import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

import Breadcumb from "./_components/Breadcrumb";


const meriwheather = Merriweather({
  weight: "400",
  style: "normal",
  subsets: ["latin", ]
})

export const metadata: Metadata = {
  title: "Storage",
  description: "Storage Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = [
    {title: "Home", link: '/'},
    {title: "File", link: "#"}
]
  return (
    <html lang="en">
      <body className={meriwheather.className}>
        <div className="container mx-auto">
          <main className="wrapper">
            {children}
          </main>
        </div>
        </body>
    </html>
  );
}
