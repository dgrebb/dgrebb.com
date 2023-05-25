import React from "react";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "./sty.css";

import Links from "./components/Links";
import fetchContent from "./_utils/fetch-content";

export default async function Home() {
  const content = await fetchContent(`${process.env.API_HOME}?populate=*`);
  const { headshot, headline, intro, links } = content.attributes;
  const image = headshot?.data?.attributes || false;

  return (
    <>
      <section className="bio text-center max-w-[533px]">
        {image ? (
          <Image
            src={image.url}
            alt={image.alternativeText}
            title="Hi!"
            width={150}
            height={150}
            className="m-auto rounded-full"
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
