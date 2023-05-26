import {
  FaFacebook,
  FaFlickr,
  FaGithub,
  FaGoodreads,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaMastodon,
  FaSoundcloud,
  FaStackOverflow,
  FaTwitter,
} from "react-icons/fa";

const Icons = {
  GitHub: FaGithub,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  SoundCloud: FaSoundcloud,
  StackOverflow: FaStackOverflow,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  Mastodon: FaMastodon,
  Flickr: FaFlickr,
  Goodreads: FaGoodreads,
  Link: FaLink,
};

import React from "react";

export default function Links({ links }) {
  return (
    <div className="flex-row h-8">
      {links.map((link, k) => {
        return (
          <a
            href={link.url}
            title={link.title}
            target="_blank"
            className="links inline-block h-full p-1"
            key={k}
          >
            {React.createElement(Icons[link.icon], { size: "100%" })}
          </a>
        );
      })}
    </div>
  );
}
