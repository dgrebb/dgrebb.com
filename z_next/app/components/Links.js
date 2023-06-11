import { BsLink } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaGithub,
  FaGoodreadsG,
  FaInstagram,
  FaLinkedinIn,
  FaMastodon,
  FaSoundcloud,
  FaStackOverflow,
  FaTwitter,
} from "react-icons/fa";
import { TfiFlickr } from "react-icons/tfi";

const Icons = {
  GitHub: FaGithub,
  Facebook: FaFacebookSquare,
  Instagram: FaInstagram,
  SoundCloud: FaSoundcloud,
  StackOverflow: FaStackOverflow,
  LinkedIn: FaLinkedinIn,
  Twitter: FaTwitter,
  Mastodon: FaMastodon,
  Flickr: TfiFlickr,
  Goodreads: FaGoodreadsG,
  Link: BsLink,
};

import React from "react";

export default function Links({ links }) {
  return (
    <ul
      role="complementary"
      aria-label="Links to Dan Grebb on The Internet"
      className="link-list"
    >
      {links.map((link, k) => {
        const { url, title, icon } = link;
        const linkClass = icon?.toLowerCase() || "";
        return (
          <li className="link" key={k}>
            <a
              href={url}
              title={title}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass}-icon inline-block h-full p-1`}
            >
              {React.createElement(Icons[icon ? icon : "Link"], {
                size: "100%",
              })}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
