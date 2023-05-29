import PlausibleProvider from "next-plausible";
import { Public_Sans } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";

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
  };
  return (
    <html lang="en">
      <body
        className={`${dark ? "dark-theme" : "light-theme"} ${
          publicSans.className
        } text-lg flex flex-col`}
      >
        <Header />
        <main id="main" role="main" className="main flex flex-col items-center">{children}</main>
        <PlausibleProvider
          domain="dgrebb.com"
          trackOutboundLinks={true}
        />
      </body>
    </html>
  );
}
