[![A circuit board with plants and flowers growing from its silicon.](https://user-images.githubusercontent.com/445891/266865099-66b83d03-7f59-4705-8a8b-3647f227d46a.jpg)](https://www.dgrebb.com)

<!-- omit in toc -->
# [dgrebb.com](https://www.dgrebb.com)

[![🚜 Build, Deploy, and Test](https://github.com/dgrebb/dgrebb.com/actions/workflows/bdt-fe.yml/badge.svg)](https://github.com/dgrebb/dgrebb.com/actions/workflows/bdt-fe.yml)

Welcome to the repository for dgrebb.com, your resource for accessing the source code and assets of my personal website. This platform serves as a hub for those interested in exploring the site's architecture or contributing to its development.

- [Wiki](#wiki)
- [Features](#features)
- [Stack](#stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [CI/CD](#cicd)
  - [Analysis and Testing](#analysis-and-testing)
- [Companion Sites](#companion-sites)
- [License](#license)

## Wiki

The wiki is in progress, but provides comprehensive documentation on design, architecture, application lifecycle management (ALM), frontend and backend development, testing, regression, utilities, and various other components of the site. Detailed information can be found at the [wiki](https://github.com/dgrebb/dgrebb.com/wiki).

## Features

dgrebb.com is equipped with the following features:

- [x] Posts: The website hosts a range of articles authored by me, covering diverse topics and sharing insights, opinions, and expert analysis.
  - [x] Categories
  - [ ] Comments: Plans to introduce a commenting system with moderation capabilities. Anonymity will be permitted, subject to review prior to publication.
- [x] CV/Portfolio: A dedicated section showcasing my professional projects and accomplishments, offering a detailed view of my career trajectory and skills.
- [ ] Contact Form: An integrated contact form for streamlined communication, enabling direct inquiries and interactions.

## Stack

### Backend

- [AWS](https://aws.amazon.com/) ECS, ALB, CloudFront, RDS (Postgres), Secrets Manager
- [Docker](https://www.docker.com/)
- [Strapi CMS](https://github.com/strapi/strapi/) (Content API)

### Frontend

- JavaScript, [Svelte](https://github.com/sveltejs/svelte)/[SvelteKit](https://github.com/sveltejs/kit)
  - [@iconify-json](https://github.com/iconify/icon-sets/blob/master/readme.md#iconify-icon-sets-in-json-format)
  - [marked](https://github.com/markedjs/marked)
  - [svelte-highlight](https://github.com/metonym/svelte-highlight)
  - [svelte-meta-tags](https://github.com/oekazuma/svelte-meta-tags)
  - [svelte-plausible-analytics](https://github.com/accuser/svelte-plausible-analytics/)
- SSG with forward-facing SSR architecture
- Vanilla CSS with some PostCSS/Sass Syntactical Sugar
- [Vite](https://vitejs.dev/), [Rollup](https://rollupjs.org/), [Bundle Stats](https://github.com/relative-ci/bundle-stats/tree/master/packages/rollup-plugin), [Visualizer](https://github.com/btd/rollup-plugin-visualizer)

### CI/CD

- [BackstopJS](https://github.com/garris/BackstopJS) - Visual Regression Suite
- [GitHub Actions](https://github.com/features/actions) - Build, Deploy, and Test Automation
- [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse) - Performance Testing
- [PageSpeed Insights CLI](https://github.com/GoogleChromeLabs/psi) - Performance Testing
- [Pass](https://www.passwordstore.org/) - Local Secrets Management

### Analysis and Testing

- [Axe](https://github.com/dequelabs/axe-core) - Accessibility (a11y) Testing
- [cspell](https://cspell.org/) - Spell Checking
- [gramma](https://github.com/caderek/gramma) - Grammar Sanity
- [NVDA](https://www.nvaccess.org/about-nvda/) - a11y Testing
- [Prettier](https://prettier.io/)/[ESLint](https://eslint.org/) - Code Formatting and Analysis
- [SiteOne Crawler Desktop](https://github.com/janreges/siteone-crawler-gui) (Written in Svelte!) - SEO, a11y, HTTP, Security, Headers, and much more.
- [Wallace](https://www.projectwallace.com/) - CSS Analyzer

## Companion Sites

- [p.dgrebb.com](https://p.dgrebb.com/) - Public Analytics
- [reports.dgrebb.com](https://reports.dgrebb.com/) - CI/CD Reporting and Tests

## License

The code in this repository is licensed under the MIT License, allowing for free use, modification, and distribution. Note that website content, including blog posts and portfolio items, may be subject to different licensing terms.