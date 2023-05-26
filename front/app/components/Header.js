import fetchContent from "../_utils/fetch-content";
import NavBar from "./NavBar";
import NavHome from "./NavHome";

const navAPI = process.env.API_NAVIGATION;

export default async function Header() {
  const navContent = await fetchContent(`${navAPI}?populate=*`);
  const { navHeading, navItems } = navContent.attributes;

  return (
    <header className="nav flex items-center mx-24 my-11">
      <div className="title flex flex-grow">
        <NavHome navHeading={navHeading} />
      </div>
      {navItems.length ? <NavBar navItems={navItems} /> : null}
    </header>
  );
}
