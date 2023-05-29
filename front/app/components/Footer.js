import fetchContent from "../_utils/fetch-content";

const footerAPI = `${process.env.API_URL}/footer`;

export default async function Footer() {
  const content = await fetchContent(`${footerAPI}?populate=*`);
  const { copyright } = content.attributes;
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo" className="footer">
      {copyright ? ( `Copyright © ${year} ${copyright}` ) : null}
    </footer>
  );
}
