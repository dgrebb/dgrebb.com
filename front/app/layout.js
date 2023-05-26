import { Public_Sans } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const publicSans = Public_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Dan Grebb",
  description:
    "Dan Grebb is a software engineer from Philadelphia, Pennsylvania.",
};

export default function RootLayout({ children }) {
  const dark = () => {
    window.matchMedia("(prefers-color-scheme: dark)");
  }
  return (
    <html lang="en">
      <body className={`${dark ? "dark-theme" : "light-theme"} ${publicSans.className} text-lg`}>
        <Header />
        <main className="flex flex-col items-center p-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
