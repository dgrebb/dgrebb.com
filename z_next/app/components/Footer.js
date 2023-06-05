import fetchContent from "../_utils/fetch-content";

const footerAPI = `${process.env.API_URL}/footer`;

export default async function Footer() {
  const content = await fetchContent(`${footerAPI}?populate=*`);
  const { copyleft, copyright } = content.attributes;
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo" className="footer">
      <small>{copyleft ? ( `${copyleft} ${year} A.D. ${copyright}` ) : null}</small>
    </footer>
  );
}
