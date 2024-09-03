import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Provider } from "../utils/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://next-cms-blog-ce.vercel.app/"),
  title: {
    default: "DevBlog - Professional Insights",
    template: '%s | DevBlog'
  },
  description: "A professional blog for developers",
  openGraph: {
    title: "DevBlog - Professional Insights",
    description: "A professional blog for developers",
    type: "website",
    locale: "en_US",
    url: "https://next-cms-blog-ce.vercel.app/",
    siteName: "DevBlog"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <Provider>
          <Navbar />
          <main className="h-full mx-auto max-w-4xl px-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
