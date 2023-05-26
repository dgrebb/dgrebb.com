import Link from "next/link";

export default async function NavBar({ navItems }) {
  return (
    <nav className="nav-bar flex-shrink">
      <ul className="justify-end">
        {navItems.map((navItem, k) => {
          return (
            <li key={k} className="inline mx-3 last:mr-0">
              <Link
                className="btn font-semibold py-2 px-4 rounded shadow align-text-bottom"
                href={navItem.href}
              >
                {navItem.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
