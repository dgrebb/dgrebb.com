import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Dan Grebb",
  description: "Dan Grebb is a software engineer from Philadelphia, Pennsylvania.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
