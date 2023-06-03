import "./c/not-found.css";

export const metadata = {
  title: "404. Oh noes!",
  description: "Couldn't find anything here!",
};

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Nothing found here.</p>
      <a href="/">Go Home</a>
    </section>
  );
}
