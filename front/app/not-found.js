import Link from "next/link";

export const metadata = {
  title: "404. Oh noes!",
  description: "Couldn't find anything here!",
};

export default function NotFound() {
  return (
    <>
      <img
        src="https://s.dgrebb.com/404.gif"
        alt="404 animation"
        aria-hidden="true"
      />
      <p>404! Nothing to be found here.</p>
      <Link href="/">Go Home</Link>
    </>
  );
}
