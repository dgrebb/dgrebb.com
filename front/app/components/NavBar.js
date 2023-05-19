import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center m-auto w-2/3">
      <h1 className="flex-grow w-full">
        <Link href="/">
          Dan Grebb
        </Link>
      </h1>
      <ul>
        <li>
          <Link href="/posts">
            Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
}
