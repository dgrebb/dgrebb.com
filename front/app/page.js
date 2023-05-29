import fetchContent from "./_utils/fetch-content";
import "./sty.css";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Links from "./components/Links";

export const dynamic = "force-dynamic";
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
            width={150}
            height={150}
            className="m-auto rounded-full"
            aria-hidden="true"
          />
        ) : null}
        <h1 className="text-4xl font-bold brightness-125 py-3">{headline}</h1>
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
