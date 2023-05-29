import fetchContent from "../_utils/fetch-content";
import NavBar from "./NavBar";
import NavHome from "./NavHome";

const navigationAPI = `${process.env.API_URL}/navigation`;

export default async function Header() {
  const navContent = await fetchContent(`${navigationAPI}?populate=*`);
  const { navHeading, navItems } = navContent.attributes;

  return (
    <header role="navigation" className="header flex items-center">
      <a href="#main" className="btn skip-to-content">Skip to Main Content</a>
      <div className="title flex flex-grow">
        <NavHome navHeading={navHeading} />
      </div>
      {navItems.length ? <NavBar navItems={navItems} /> : null}
    </header>
  );
}
