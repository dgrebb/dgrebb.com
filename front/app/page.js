import fetchContent from "./_utils/fetch-content";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Links from "./components/Links";
import Loading from "./loading";

const homeAPI = `${process.env.API_URL}/home`;

export default async function Home() {
  const content = await fetchContent(`${homeAPI}?populate=*`);
  const { headshot, headline, intro, links } = content.attributes;
  const image = headshot?.data?.attributes || false;

  return (
    <>
      <section className="bio text-center">
        {image ? (
          <Image
            src={image.url}
            alt={image.alternativeText}
            title="Hi!"
            width={120}
            height={120}
            className="m-auto rounded-full"
            aria-hidden="true"
          />
        ) : null}
        <h1 className="headline">{headline}</h1>
        <ReactMarkdown>{intro}</ReactMarkdown>
      </section>
      {links.length ? (
        <section className="links">
          <Links links={links} />
        </section>
      ) : null}
    </>
  );
}
