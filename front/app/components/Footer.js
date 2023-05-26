import fetchContent from "../_utils/fetch-content";

const footerAPI = process.env.API_FOOTER;

export default async function Footer() {
  const content = await fetchContent(`${footerAPI}?populate=*`);
  const { copyright } = content.attributes;
  const year = new Date().getFullYear();
  return (
    <footer className="flex-col text-center mx-24 my-11 opacity-20">
      {copyright ? ( `${copyright} ${year}` ) : null}
    </footer>
  );
}
