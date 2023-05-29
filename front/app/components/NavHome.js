"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

export default function NavHome({ navHeading }) {
  const dark = "dark-theme";
  const light = "light-theme";
  const [darkTheme, setDarkTheme] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)")
      ? setDarkTheme(true)
      : setDarkTheme(false);
    setVisible(true);
  }, []);

  function toggleTheme(e) {
    const bodyClasses = document.body.classList;
    e.currentTarget.blur();
    setDarkTheme((curr) => !curr);
    bodyClasses.toggle(dark);
    bodyClasses.toggle(light);
  }

  return (
    <>
      <Link className="nav-home font-black text-2xl leading-none" href="/">
        <h1>{navHeading}</h1>
      </Link>
      <button
        className={`theme-toggle ml-2 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={toggleTheme}
      >
        <ThemeToggle darkTheme={darkTheme} visible={visible} />
      </button>
    </>
  );
}
