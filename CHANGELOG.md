# Changelog

All notable changes to this project will be documented in this file.

## [3.1.0] - 2023-10-07

### 💡 Features

- ***(front)*** Introduces the all categories page, tags, api, and interaction

### 🐛 Bug Fixes

- ***(ci)*** Adjusts bump prompt and command order for restoring and cutting release
- ***(front)*** Adjusts category tag breakpoints/margins when multiple rows
- ***(front)*** Adjusts category page redirect and updates sitemap configuration

### ♻️  Refactor

- ***(front)*** Refactors mini-nav toggle padding; post preview image hover effect
- ***(front)*** Moves tag styling to anchor

### ✅ Testing

- ***(backstop)*** Update naming and add production backstop refs (#761)

### ⚙️  Miscellaneous Tasks

- ***(ci)*** Removes node package files from commitizen bump
- ***(ci)*** Includes lockfiles in bump
- ***(ci)*** Adjusts bump.sh and .cz.json `bump` and `changelog` patterns
- ***(ci)*** Adjusts bump.sh to only apply file changes, not tag
- ***(front)*** Adjusts server api response naming for category pages

## [3.0.2] - 2023-10-06

### ⚙️  Miscellaneous Tasks

- ***(back)*** Backend dependency refresh
- ***(backstop)*** Updates gh-stg backstop refs
- ***(ci)*** Updates all github workflows' node-version to 18.18.0
- ***(front)*** Updates frontend deps
- ***(release)*** Downmerge main to develop

## [3.0.1] - 2023-10-04

### 🐛 Bug Fixes

- ***(front)*** Content padding/margin adjustments (#732/#721)

## [3.0.0] - 2023-10-01

### 💡 Features

- ***(back)*** Adds footnotes component to post content-type
- ***(back)*** Adds category slug field and changes displayName to plural
- ***(back)*** Adds fields for author/link when using opensource images
- ***(back)*** Adds Post content components, fields, relations, and custom findBySlug controller
- ***(backstop)*** Adjusts backstop runner config for gh environment; adds backstop reference workflow
- ***(backstop)*** Adds ref generation workflow and updates s3 sync
- ***(backstop)*** Upgrades backstop fork to 0.0.4
- ***(backstop)*** Adds environment support for local/stg/prod
- ***(backstop)*** Adds all backstopjs page scenarios/states and their reference images
- ***(backstop)*** Adds `watch` directorys: `scenarios`/`bd/engine_scripts` to `remote` pm2 configuration
- ***(backstop)*** Updates forked backstopjs package
- ***(backstop)*** Switches to playwright as testing engine; adds configs, including `colorScheme` script
- ***(backstop)*** Adds testing button to backstop report ui
- ***(backstop)*** Adds dynamic grouping of tests; updates utils
- ***(ci)*** Adds grammar and spell checking for code/content tests (#701)
- ***(ci)*** Adds linting workflow on pull, push, and dispatch
- ***(ci)*** Adds pagespeed insights workflow
- ***(ci)*** Sets `max-age=287712` `cache-control` for static frontend files
- ***(front)*** Disables page transitions if `prefers-reduced-motion` (#698)
- ***(front)*** Refactors day/night theme colors and layout
- ***(front)*** Introduces css color palette vars, `theme.css`
- ***(front)*** Adds published/updated times to post component
- ***(front)*** Adds sentry preconnect entry and adds cross-origin to plausible connection
- ***(front)*** Converts bio photo to `data`, inlines, and adds `BioBitmap.svelte`
- ***(front)*** Adds styles for post blockquotes
- ***(front)*** Adds `colors.css` for forthcoming retheme
- ***(front)*** Generates a `sitemap.xml` from frontend using `postbuild`
- ***(front)*** Adds html-minifier to server hooks; updates `dg f s` helper with `http-server`
- ***(front)*** Patches @sveltejs/kit chunks, assets, and entry output names via rollupConfig
- ***(front)*** Enhances Code copy button, animations, and icon handling
- ***(front)*** Adds creative commons license and adjusts footer component
- ***(front)*** Adds seo and fallbacks to category page; dynamically refreshes `MetaTags`
- ***(front)*** [**breaking**] Upgrades to svelte@4 and migrates page transitions
- ***(front)*** Adds styles and animation for in-page category transitions
- ***(front)*** Creates and utilizes PostHero component
- ***(front)*** Refactors post page with `PageNav`; adjusts interactivity
- ***(front)*** Adds mini nav styles, interactivity, and transitoins to category page
- ***(front)*** Adds page transitions and layout for category page
- ***(front)*** Adds post heading links, summary styles, and conditionally displays footnotes
- ***(front)*** Adds mini `PostNav` functionality, component changes, and styles
- ***(front)*** Adds `PostNav` component and navigation
- ***(front)*** Adds html content block
- ***(front)*** Adds Code component, styles, and content
- ***(front)*** Adds category listing page
- ***(front)*** Adds standard and opengraph/twitter meta from seo component
- ***(front)*** Adds seo to posts, post, and privacy pages
- ***(front)*** Adds pageMeta store
- ***(front)*** Sets and gets theme preference in `localStorage`
- ***(front)*** Proxies plausible script/api through p.dgrebb.com
- ***(front)*** Adds custom events and page props for Plausible Analytics
- ***(front)*** Adds lazyloading to post(s) page images
- ***(front)*** Adds post heading renderer and table of contents component
- ***(front)*** Adds post heading renderer and table of contents component
- ***(front)*** Adds navigation component, styles, and breakpoint states
- ***(front)*** Adds animation to theme toggle
- ***(github)*** Syncs backstop report to s3
- ***(perf)*** Adds lighthouse browser perfomance testing
- ***(project)*** Adds auto-assign PR config
- ***(strapi)*** Updates to and patches strapi 4.13.2
- ***(strapi)*** Updates to and patches strapi@4.13.1
- ***(strapi)*** Updates to and patches strapi 4.12.7
- ***(strapi)*** Further customizes the strapi admin dashboard
- ***(strapi)*** Upgrades strapi to 4.12.1
- ***(strapi)*** Adds @strapi/plugin-open-ai, sets api key in .env via secrets, starts patching plugin
- ***(strapi)*** Adds line number highlighting to code component
- ***(terraform)*** Adds configuration for reports cdn/record/bucket/etc.
- ***(testing)*** Adds warmup script and executes in gh testing workflow
- ***(testing)*** Introduces reports.dgrebb.com infrastructure
- ***(testing)*** Adds backstop failure summary and artifact upload
- ***(testing)*** Adds backstop failure summary and artifact upload
- ***(testing)*** Adds backstopjs to checks and updates progress
- ***(testing)*** Introduces testing workflow with backstop to start
- ***(testing)*** Adds backstop environment confirugation and utils
- ***(utils)*** Adds command to update, install, patch, and run strapi

### 🐛 Bug Fixes

- ***(back)*** Patches `@strapi/plugin-upload` `new URL` issue
- ***(backstop)*** Moves `overrideCSS` to `onReady`; one-lines css; reverts css injection method changes
- ***(ci)*** Fixes typo in workflow file
- ***(ci)*** Explicity sets `UPLOAD_SOURCEMAPS` to `true` and removes `sparse-checkout`
- ***(ci)*** Changes directory before running lint
- ***(ci)*** Adds  as required secret for called test workflows
- ***(ci)*** Fixes incorrect secret key name
- ***(ci)*** Uninstalls webpagetest bc vulnerabilities abound and who needs webpagetest anyway
- ***(docker)*** Updates path to prod ecr uri secret
- ***(docker)*** Changes pass path for aws region
- ***(front)*** Addresses a11y focus outlines and interactivity for `PageNav`
- ***(front)*** Adds  styles and html for post hero image fallback (#704)
- ***(front)*** Adds background color to privacy, post page; reduce marg… (#702)
- ***(front)*** Applies prettier fixes; adds  for
- ***(front)*** Adjusts initial-letter hack for safari
- ***(front)*** Adds `inline-block` to footer links; preventing ugly linebreak on privacy policy link
- ***(front)*** Removes exta space, all breakpoints, from post-article bottom
- ***(front)*** Adjusts scroll-top margin/hover
- ***(front)*** Adjusts pagenav link and heading text opacity
- ***(front)*** Prevents effective date text break on privacy policy
- ***(front)*** Adjusts padding/breakpoint styles around `@supports not initial-letter`
- ***(front)*** Adds `SvelteMarkdown` wrapper to TOC component links
- ***(front)*** Removes sentry debug in production/staging
- ***(front)*** Fixes path aliases for IDE via `jsconfig.json`
- ***(front)*** Adjusts padding on Code component
- ***(front)*** Removes a few incorrect or false-positive a11y `role` attributes
- ***(front)*** Adjusts @sveltejs/kit patch allowing `entry` chunks to remain named
- ***(front)*** Adjusts nav layout and fixes post margin
- ***(front)*** Removes Code lang span; gives title span default text
- ***(front)*** Gives first posts-grid item a min—instead of set—height
- ***(front)*** Fixes post anchor link active onload
- ***(front)*** Fixes postcss config with plugin array and imports
- ***(front)*** Adds `patch-package` to `devDependencies`
- ***(front)*** General performance improvements and reduction in layout shift on initial page transition
- ***(front)*** Removes css comment
- ***(front)*** Adds `postinstall` `patch-package` for frontend
- ***(front)*** Fixes line number highlight implementation; general style fixes
- ***(front)*** Uses correct `header` element
- ***(front)*** Removes copy button on Code component for noscript view
- ***(front)*** Fixes prettier. again
- ***(front)*** Adjusts footnotes indentation and adds nofollow/noreferrer/target=_blank to links
- ***(front)*** Resolves bad dependency issues between prettier/svelte plugin
- ***(front)*** Adds a bonus fix for flex-grow on `.main` and `.main-secondary`
- ***(front)*** Improves checks for aside content before including `PageNav` on pages
- ***(front)*** Adds `scrollTop` to `PageTransition` component
- ***(front)*** Sets max-height on `page-navigation-list` to unblock clicks on posts
- ***(front)*** Cleans up page transitions with bg color set to vh instead of %
- ***(front)*** Adds nullish checks for `miniPostNav` and `postNavCheckbox`
- ***(front)*** Adjusts padding on `Code` component
- ***(front)*** Adjusts background transitions and post page layout
- ***(front)*** Fixes post page transitions and postnav interactivity `onclick` events
- ***(front)*** Removes unused `crypto` import
- ***(front)*** Removes `PUBLIC_MEDIA_URL` import
- ***(front)*** Adds missing classes to `noscript.css`
- ***(front)*** Fixes import spacing
- ***(front)*** Adds local-specific Vite configuration; updates utils and scripts
- ***(front)*** Fixes `grid-template-rows` typo and undefined `highlightedLines` var
- ***(front)*** Hushes apple's whining about touch icons
- ***(front)*** Adds text-accent color, updates link styles, and updates transitions
- ***(front)*** Fixes full-height background gradient on touch devices
- ***(front)*** Adds proper error handling on post 404s
- ***(front)*** Returns false if active nav route check is null
- ***(front)*** Protects from errors if Sentry is blocked
- ***(front)*** Adds trailingslash to custom 404 page
- ***(front)*** Fixes destructuring of pathname
- ***(front)*** Improves scrollbar/overflow experience for touch devices
- ***(front)*** Fixes missing #main link on category page
- ***(front)*** Fixes missing #main link on 404 page
- ***(front)*** Fixes z-index on post-main and post-header
- ***(front)*** Uses inline css rules (instead of custom classes) for not-found.css
- ***(front)*** Updates vite and peers
- ***(front)*** Strictly sets `vite@4.3.9` dependency
- ***(front)*** Removes breaking font-mono reference and configures prettier and postcss-import
- ***(front)*** Decreases flourish transition time
- ***(front)*** Fixes layout shift on page transition
- ***(github)*** Adjusts env var setting to top of job
- ***(github)*** Adjusts format/use of vars in workflow summary
- ***(github)*** Space
- ***(github)*** Changes erroneous workflow vars accessors
- ***(perf)*** Uninstalls psi to address security alerts from dependabot
- ***(project)*** Removes PRs from workflow dispatch
- ***(strapi)*** Updates footnotes schema to require title
- ***(strapi)*** Applies patch for component config endpoint
- ***(terraform)*** Updates target healthcheck and link var replacement
- ***(testing)*** Adds permissions for check runs
- ***(utils)*** Includes `DEPLOY_ENV` in local frontend build script

### 📜 Documentation

- ***(backstop)*** Updates test images
- ***(project)*** Updates privacy policy anticipating video embeds (and cookies) from third-party content embeds
- ***(utils)*** Removes inaccurate comment now that svelte runs on port 443 locally

### ⚡️ Performance

- ***(front)*** Refactors sentry configuration and logging
- ***(front)*** Inlines css and adds `svelte-check`

### ♻️  Refactor

- ***(backstop)*** Refactors backstop utils/npm scripts to use env vars from `dg` scripts
- ***(backstop)*** Moves vars file and updates scenarios
- ***(front)*** Updates breakpoint padding, font-sizes, and a11y issues (#714)
- ***(front)*** Refactors categories heading treatment, aside and po… (#709)
- ***(front)*** Removes front dockerfile and vars
- ***(front)*** Moves transition styles and updates bio bitmap onload animation
- ***(front)*** Refactors naming and exports of uiHelpers
- ***(front)*** Moves post heading-hash links to margin
- ***(front)*** Refactors category page transition
- ***(front)*** Refactors PageTransition, `scrollTop`, and related styles
- ***(front)*** Refactors styles for category singleton headline and PageNav changes
- ***(front)*** Refactors PageNav and related components/routes
- ***(front)*** Refactors category page content and includes singleton data
- ***(front)*** Refactors primary/secondary page layouts; begins splitting styles
- ***(front)*** Refactors PageTransition component with `transitionKey` instead of only `pathname`
- ***(front)*** Improves logging, adds null chaining, sets more defaults
- ***(front)*** Refactors pages and ssr moving data population server side
- ***(front)*** Refactors post page and adds components
- ***(front)*** Refactors a handful of global styles
- ***(front)*** Refactors the privacy page
- ***(front)*** Refactors post page layout
- ***(front)*** Adds svelte 404 page, updates logging, adds styles for static 404.html
- ***(project)*** Refactors resolution of local images and removes `PUBLIC_MEDIA_URL`
- ***(terraform)*** Adds custom 404 page path

### 💚 Continuous Integration

- ***(back)*** Adds path to cms update utility script for easy opening
- ***(back)*** Adds strapi `.backups` to `.dockerignore`
- ***(backstop)*** Adjusts title of backstopjs workflow
- ***(backstop)*** Uploads report artifact if visual regressions are detected
- ***(backstop)*** Adds `post_anchor_active_aside` test, refs, and onready helper
- ***(backstop)*** Adds `post_aside_anchor_click` scenario and test refs
- ***(backstop)*** Adds importable viewport collection vars
- ***(backstop)*** Adds navigation from posts->post scenario and test refs
- ***(backstop)*** Adds `--font-render-hinting=none` flag for puppeteer
- ***(backstop)*** Extends wait period after posts-grid hover; updates test refs
- ***(backstop)*** Adds posts `onReady` script, tests, and updates/adds test references
- ***(backstop)*** Updates test refs
- ***(backstop)*** Adds CSS overrides and increases delay before test
- ***(backstop)*** Swaps out python for node http-server
- ***(backstop)*** Updates tests with higher threshold and resets references
- ***(backstop)*** Configures utils, packages, testing environment, and tests for backstop
- ***(backstop)*** Updates backstop bitmaps
- ***(backstop)*** Refactors backstopjs configuration and tests/utils
- ***(front)*** Adds `DEPLOY_ENV` and `deploy` to Vite Sentry pluginconfigs; includes in summary and workflow
- ***(front)*** Updates github workflow summary with link to sentry release
- ***(front)*** Adds `pull_request` trigger for PRs to `main` or `develop`
- ***(front)*** Updates github workflow dispatch rules
- ***(github)*** Adds push to BD&T workflow
- ***(github)*** Uses reports domain from github environment variable instead of secret
- ***(github)*** Reuses backstop test workflow in main bdt workflow
- ***(github)*** Conditionally sets `run-name` and adds PR details to summary
- ***(github)*** Uses outputs directly instead of by reference
- ***(github)*** Updates outputs and use of
- ***(github)*** Moves summary into separate job and passes outputs to build/deploy
- ***(github)*** Dynamically sets workflow `run-name` based on git ref
- ***(github)*** Reorders final workflow summary
- ***(github)*** Reduces complexity, order, and adds changes to workflow summary
- ***(github)*** Lists PR files changes in workflow summary
- ***(github)*** Refactors summary step into its own job
- ***(github)*** Summarizes job in multiline conditionally including PR link
- ***(github)*** Adds and includes `vars.ENV_NAME` in sentry release and job summary
- ***(github)*** Improves workflow job summary details
- ***(github)*** Updates summary with variables and sets friendly environment name
- ***(github)*** Fixes sentry configuration and logging across svelte vs. static pages
- ***(github)*** Adjusts overall configuration for sentry; both local and gh workflow
- ***(github)*** Sets up initial sourcemap/release configuration for gh workflow
- ***(github)*** Moves permissions object
- ***(github)*** Adds issues permission to workflow
- ***(github)*** Adds approval step to cms dispatch listener
- ***(github)*** Adds main branch to CMS dispatch listener
- ***(github)*** Adds main branch to B&D Front End
- ***(github)*** Uses filename instead of workflow_id
- ***(github)*** Updates workflow dispatch and names
- ***(github)*** Renames dispatch listener workflows
- ***(github)*** Adjusts step names and separation
- ***(github)*** Refactors npm ci and build step
- ***(github)*** Changes path before `npm run build`
- ***(github)*** Adds caching and splits up B&D FE workflow
- ***(project)*** Introduces vscode-commit-prompt and configuration
- ***(project)*** Sneaks in some workflow changes for PR dispatch
- ***(project)*** Adds pull_request to workflow dispatch
- ***(project)*** Adds category env vars to github workflow
- ***(project)*** Adds posts/post env vars to github workflow
- ***(utils/github)*** Updates `front.sh` server util; refactors bd-fe.yml workflow

### 🪮  Styling

- ***(front)*** Formats all svelte files with prettier plugin
- ***(front)*** Formatting
- ***(front)*** Removes unused Image component import
- ***(front)*** Improves aria-roles
- ***(front)*** Changes how the transition flourish transitions
- ***(front)*** Adjusts `body` radial gradient
- ***(front)*** Restructures frontend code, adds aliases, and refactors imports
- ***(front)*** Refactors for api/data shape, overall code elegance, and performance
- ***(front)*** Elegantly refactors additional routes and components
- ***(front)*** Simplifies Links.svelte implementation
- ***(front)*** Refactors `{#each}` blocks with destructuring
- ***(front)*** Elegantly refactors layout.svelte
- ***(project)*** Updates commitizen and commit prompt configs
- ***(utils)*** Includes a message with environment when running backstop remote utils

### ✅ Testing

- ***(backstop)*** Updates gh-stg ref bitmaps for posts sortby publishedOn
- ***(backstop)*** Updates gh-stg ref bitmaps for post date ui change
- ***(backstop)*** Updates backstop gh-stg bitmap ref
- ***(backstop)*** Updates post page ref bitmap
- ***(backstop)*** Sets all tests to ignore dimension differences
- ***(backstop)*** Bumps the wait time on page navigate tests
- ***(backstop)*** Renames test refs for gh environment
- ***(backstop)*** Adds github-speecific test refs
- ***(backstop)*** Updates reference bitmaps for stg
- ***(backstop)*** Updates reference images for all scenarios
- ***(front)*** Updates backstop ref bitmaps
- ***(github)*** Updates backstop refs for github environment

### ⚙️  Miscellaneous Tasks

- ***(back)*** Removes the wicked-annoying survey from `@strapi/admin`
- ***(back)*** Upgrades to and patches strapi@4.13.6
- ***(back)*** Updates to and patches strapi@4.13.5; removes `@strapi/plugin-upload` patch
- ***(back)*** Upgrades to `patch-package@8.0.0` and `strapi@4.13.4`; patches strapi
- ***(front)*** Updates and patches frontend dependencies (#697)
- ***(front)*** Updates non-patched/forked dpendencies
- ***(project)*** Creates chore issue template
- ***(strapi)*** Updates to and patches strapi@4.14.0 (#708)
- ***(strapi)*** Updates to and patches strapi@4.13.7

## [2.5.1] - 2023-07-09

### 🐛 Bug Fixes

- ***(front)*** Fixes viewport meta on subroutes

## [2.5.0] - 2023-07-02

### 💡 Features

- ***(front)*** Adds scroll-behavior to body
- ***(front)*** Adds page transitions
- ***(testing)*** Adds dg commands for visual regression tests

### 🐛 Bug Fixes

- ***(front)*** Adds tailwind breakpoint and applies smaller padding
- ***(front)*** Fixes PageTransition container flex layout
- ***(front)*** Adds width fix to PageTransition and posts/privacy
- ***(front)*** Reduces sentry tracing/replay to 0 in < production
- ***(front)*** Fixes links section display
- ***(front)*** Fixes bad ariaHidden prop name

### 👷 Build

- ***(front)*** Removes unnecessary ThemeToggle classList toggles
- ***(testing)*** Renames lt_sm scenario to xs
- ***(testing)*** Adds backstop reference script and reference images
- ***(testing)*** Initializes backstop project
- ***(testing)*** Adds backstopjs to project
- ***(testing)*** Adds backstop reports and test images to .gitignore

### 💚 Continuous Integration

- ***(project)*** Adds release automation on bump and push

## [2.4.0] - 2023-06-29

### 💡 Features

- ***(docker)*** Adds patch-package step and improves caching
- ***(strapi)*** Upgrades strapi to v4.11.3
- ***(strapi)*** Adds plausible analytics dashboard to strapi
- ***(utils)*** Adds back/front package version bumps to bump script

### 🐛 Bug Fixes

- ***(front)*** Adjusts padding for `p`s and `h*`s

### 👷 Build

- ***(project)*** Updates package.json file versions and names
- ***(strapi)*** Upgrades patches for strapi 4.11.3
- ***(strapi)*** Uninstalls postinstall-postinstall
- ***(utils)*** Renames cdcms to cdback

## [2.3.1] - 2023-06-27

### 🐛 Bug Fixes

- ***(front)*** Fixes a silly leftover test
- ***(front)*** Adjusts logic for external link detection
- ***(terraform)*** Applies unique names to security and management resources

## [2.3.0] - 2023-06-26

### 💡 Features

- ***(front)*** Adds ScrollTop component, functionality, and styles
- ***(front)*** Adds trailingSlash to svelte config
- ***(strapi)*** Adds custom analytics dashboard, middleware, and patch for strapi
- ***(strapi)*** Adds custom webhook body and patch for strapi
- ***(utils)*** Adds webhook token to envVar config for local dev

### 🐛 Bug Fixes

- ***(front)*** Adjusts error logging for api failures
- ***(front)*** Adds trailingSlash option to render index.html files instead of [routeName].html
- ***(front)*** Removes characters from api endpoint
- ***(front)*** Adds some defensive content and logs errors for failures
- ***(front)*** Adjusts scrollbar-gutter and header padding

### 👷 Build

- ***(front)*** Sets max-width on layout
- ***(strapi)*** Renames github dispatch token var

## [2.2.0] - 2023-06-24

### 💡 Features

- ***(front)*** Adds italic to h6 and sets text-base for h5/6
- ***(front)*** Adds scrollbar behavior and style enhancements
- ***(front)*** Adds more mobile-first style enhancements
- ***(front)*** Adjustments to font-size, margin, and padding
- ***(front)*** Adjusts Code component scrollbar
- ***(front)*** Refactor file structure and import paths
- ***(front)*** Refactors ThemeToggle component
- ***(front)*** Adds global mobile styles
- ***(front)*** Adds mobile styles for and refactors Code component
- ***(front)*** Adds mobile styles for posts/privacy
- ***(front)*** Adds mobile styles for and refactors Image component
- ***(front)*** Updates flourish component styles
- ***(front)*** Moves body classes and adds mobile text size
- ***(front)*** Uses privacy updatedAt time for effective date
- ***(front)*** Moves and adjusts styles for code in posts
- ***(front)*** Adds syntax highlighter styles and loads based on theme
- ***(front)*** Adds Code component as a markdown renderer
- ***(front)*** Adds event listener to system color and toggles theme
- ***(front)*** Installs svelte-highlight
- ***(front)*** Refactors tailwind classes with @apply in css
- ***(front)*** Adds Flourish component and sets z-index for media elements
- ***(front)*** Deletes user.ip from Sentry log events
- ***(front)*** Adds privacy route, new (and updated) styles
- ***(strapi)*** Updates strapi to v4.11.2
- ***(strapi)*** Installs and configures sentry for strapi
- ***(strapi)*** Adds privacy singleton and api
- ***(utils)*** Adds supporting sentry env vars to backend

### 🐛 Bug Fixes

- ***(front)*** Removes unused ThemeToggle vars in Header
- ***(front)*** Fixes @apply class error when importing css directly
- ***(front)*** Removes crypto and uuid from client logging
- ***(front)*** Fixes Link component for anchor, mailto, and tel variants
- ***(front)*** Fixes closing Sentry.init() bracket
- ***(front)*** Refactor beforeSend scrub conditionals
- ***(front)*** Uses theme colors for pre tag on privacy page
- ***(front)*** Refactors for and uses noscript styles
- ***(front)*** Installs, uses, and refactors for unplugin-icons and inanimate svgs
- ***(front)*** Adds error message to layout server

### 📜 Documentation

- ***(project)*** Updates privacy policy
- ***(project)*** Updates privacy policy
- ***(project)*** Updates privacy policy
- ***(project)*** Adds PRIVACY.md

### 👷 Build

- ***(back)*** Reinstalls @strapi/plugin-seo after flexbox PR merged
- ***(front)*** Removes unused crypto import
- ***(front)*** Removes server_name from sentry events
- ***(front)*** Adds exception for intentional link to 404 page
- ***(front)*** Bumps sentry to latest version
- ***(utils)*** Adds expose host to svelte-kit preview
- ***(utils)*** Adds PUBLIC_API_PATH_PRIVACY env var to setup script

### 💚 Continuous Integration

- ***(front)*** Updates dispatch workflow to use workflow id/endpoint
- ***(front)*** Adds privacy api endpoint to workflow
- ***(project)*** Double quotes github var in payload
- ***(project)*** Move testing steps out of github workflow file
- ***(project)*** Adds and updates test configuration for workflow_dispatch
- ***(project)*** Removes echo
- ***(project)*** Uses github.ref_name for contitional and also logs the ref_name for testing
- ***(project)*** Uses github.ref as environment conditional
- ***(project)*** Removes colon
- ***(project)*** Removes event types from workflow_dispatch
- ***(project)*** Sets local environment to "development" in sentry logging
- ***(project)*** Removes repository_dispatch while testing
- ***(project)*** Removes unused steps and adjusts order
- ***(project)*** Uses DEPLOYMENT_BRANCH instead of github.ref in robots step
- ***(utils)*** Uses workflow_dispatch in act script

### 🪮  Styling

- ***(front)*** Removes extra line
- ***(front)*** Formats markdown component
- ***(front)*** Touches up css refactor
- ***(front)*** Changes linkedin svg
- ***(front)*** Moves font classes
- ***(front)*** Refactors styles for privacy policy; makes footer link brighter
- ***(front)*** Self-closes span

## [2.1.1] - 2023-06-19

### 🐛 Bug Fixes

- ***(ci)*** Updates gh workflow with working branch conditional

## [2.1.0] - 2023-06-19

### 💡 Features

- ***(front)*** Adds Link renderer to include target/rel attrs for external links

### ♻️  Refactor

- ***(docker)*** Refactors dockerfile for better caching
- ***(terraform)*** Removes global tags to prevent environment resource conflicts

### 👷 Build

- ***(front)*** Comments frontend service out
- ***(front/back)*** Runs compression on and adds optimized images
- ***(project)*** Updates feature template
- ***(strapi)*** Removes example webpack config
- ***(utils)*** Updates utils for docker changes

### 💚 Continuous Integration

- ***(project)*** Removes local package install step, replaced by custom act image
- ***(project)*** Adds custom `act` image for local testing

## [2.0.0] - 2023-06-18

### 💡 Features

- ***(back/front)*** Adds catchafire icon; adjusts links section styles
- ***(back/front)*** Adds pinboard to cms and frontend
- ***(back/front)*** Adds pinboard to cms and frontend
- ***(front)*** Adds fixed height/width to prevent image loader from causing CLS
- ***(front)*** Adds shingle for maintenance mode
- ***(front)*** Uses seo data from cms; adds media url for dev env
- ***(front)*** Adds strapi seo plugin and components
- ***(front)*** Adds robots.txt
- ***(front)*** Adds sentry logging for broken images
- ***(front)*** Adds MetaTags and Head component defaults
- ***(front)*** Adds svelte-meta-tags
- ***(front)*** Adds custom static 404 page
- ***(front)*** Adds and configures plausible analytics
- ***(front)*** Adds compression and error page for ssg cloudfront fallback
- ***(front)*** Adds svelte ssg adapter and configuration
- ***(front)*** Adds and updates favicon
- ***(front)*** Adds sentry to 404 page
- ***(front)*** Adds server/client hooks for sentry
- ***(front)*** Adds sentry packages and updates env vars
- ***(front)*** Adds svelte-blurhash component
- ***(front)*** Adds base svelte install
- ***(front)*** Adds error, global-error, adjusts not-found, and adds styles
- ***(strapi)*** Updates strapi to v4.11.0
- ***(strapi)*** Adds blurhash plugin to strapi
- ***(terraform)*** Adds www_record overwrite var and sets up prod main.tf
- ***(utils)*** Adjusts local frontend dev utils to pass environment as an argument
- ***(utils)*** Adds preview and start commands

### 🐛 Bug Fixes

- ***(front)*** Adjusts sentry logging and sets environment for client
- ***(front)*** Cleans up css and adds flourish to load effect
- ***(front)*** Removes duplicate css rule
- ***(front)*** Removes temporary margin adjustment
- ***(front)*** Refactors border flourish to prevent skip-to-content layout shift
- ***(front)*** Fixes sentry configuration for svelte
- ***(front)*** Updates packages to complete initial security fix from dependabot
- ***(front)*** Add rel="noopener noreferrer" to external links
- ***(front)*** Add rel="noopener noreferrer" to external links
- ***(front)*** Fixes environment declaration in sentry initialization
- ***(front)*** Removes svelte fallback 404 config
- ***(front)*** Adds styles and ready class with useEffect
- ***(project)*** Uses empty string for media url
- ***(project)*** Adds quotes around api path vars
- ***(project)*** Writes media url to env file
- ***(project)*** Adds media url env var to gh workflow
- ***(project)*** Adds missing vars for gh workflow
- ***(project)*** Uses checkout in dispatch workflow
- ***(project)*** Update format of interpreted outputs
- ***(project)*** Updates act utils with options for job selection
- ***(strapi)*** Uses dgrebb/strapi-plugin-seo while PR in review
- ***(strapi)*** Removes airtable and replaces with new strapi market assets
- ***(strapi)*** Fixes database configuration and adjusts s3 bucket setting
- ***(utils)*** Fixes incorrectly set env and puts stg in development mode

### ♻️  Refactor

- ***(front)*** Removes nextjs project and reference to next
- ***(front)*** Refactors custom tailwind classes and imports
- ***(front)*** [**breaking**] Refactors project with Svelte
- ***(front)*** Moves globals, renames styles directory, and adjusts imports
- ***(strapi)*** [**breaking**] Renames strapi project directory
- ***(terraform)*** Adds configuration for publicly accessing rds instance from one ip address
- ***(terraform)*** Adds configuration for publicly accessing rds instance from one ip address
- ***(terraform)*** Adds configuration for public access to rds
- ***(terraform)*** Adds configuration for public access to rds
- ***(terraform)*** Refactors storage defaults to only run for uploads bucket
- ***(terraform)*** Modularizes storage/cdn/network for svelte static cdn
- ***(utils)*** Adds args for local development pointing to stg database
- ***(utils)*** Adds args for local development pointing to stg database
- ***(utils)*** Refactors prep-build script for Svelte

### 👷 Build

- ***(back)*** Uses local uploads directory when in dev mode
- ***(back)*** Adds .dockerignore to backend directory
- ***(deps-dev)*** Bump @sveltejs/kit from 1.12.0 to 1.15.2 in /front
- ***(front)*** Throws error if nav or footer apis fail
- ***(front)*** Adds logging to server console
- ***(front)*** Adds local backup image
- ***(front)*** Moves static 404 page
- ***(front)*** Removes prerender from client layout
- ***(project)*** Removes skip-ci from cz bump message
- ***(strapi)*** Updates strapi to v4.11.1
- ***(terraform)*** Adds final prd terraform config
- ***(terraform)*** Removes api module and references
- ***(utils)*** Adds separate admin dev command
- ***(utils)*** Adds --watch-admin flag for local development
- ***(utils)*** Adjusts environment scripts with more back/front specificity
- ***(utils)*** Modifies frontend dev args for local setup
- ***(utils)*** Adds -- --host option to expose for local hosts domain
- ***(utils)*** Moves bump command into a script
- ***(utils)*** Adds commands to open github repo and project in browser
- ***(utils)*** Adjusts front start command to copy standalone files for server
- ***(utils/front)*** Moves api paths into env vars

### 💚 Continuous Integration

- ***(ci)*** Refactors workflow names and adds colors
- ***(front)*** Uncomments build script
- ***(front)*** Updates build script and cleans up Node packages
- ***(front)*** Adds robots.txt replacement and renames frontend workflow
- ***(front)*** Adjusts path for push trigger
- ***(front)*** Adds push trigger for front directory
- ***(front)*** Capitalizes github dispatch type
- ***(front)*** Removes trial and error echo statements
- ***(front)*** Adds dynamic vars and echoes context
- ***(front)*** Fixes name of secret
- ***(front)*** Removes gh run cancel
- ***(front)*** Adds id to build step
- ***(front)*** Adds github token and renames local install step
- ***(front)*** Adds deployment branch as variable
- ***(front)*** Polishes off github actions, including local act conditional setup
- ***(front)*** Adds build script for github action
- ***(project)*** Adds main branch to ci workflow
- ***(project)*** Sets up testing for gh workflow var issues
- ***(project)*** Adds workflow_dispatch to frontend workflow
- ***(project)*** Changes names of build workflows
- ***(project)*** Adjusts outputs to match changes step id
- ***(project)*** Moves jobs and runs on condition of changes in front or backend
- ***(project)*** Adjust github actions utils for local dispatch testing
- ***(project)*** Adds workflow for backend and push dispatch
- ***(project)*** Updates utils and github build and deploy action
- ***(project)*** Adds s3 action to github workflow
- ***(project)*** Switches github workflow to static .env variables
- ***(project)*** Adds github dispatch proxy server
- ***(project)*** Adds build and deploy github workflow
- ***(terraform)*** Updates infrastructure for svelte configuration
- ***(utils)*** Adds act command and script

### 🪮  Styling

- ***(front)*** Adjusts padding for moon icon
- ***(front)*** Adds a little padding to the moon icon
- ***(front)*** Adjusts meta description text
- ***(strapi)*** Adds some welcome page customization
- ***(strapi)*** Customizes dashboard

### ⚙️  Miscellaneous Tasks

- ***(project)*** Removes readmes

## [1.1.1] - 2023-06-03

### ♻️  Refactor

- ***(terraform)*** Updates prod database infrastructure

## [1.1.0] - 2023-06-03

### 💡 Features

- ***(front)*** Adds initial suspense implementation for home
- ***(front)*** Adds an overflow overlay effect on the body
- ***(utils)*** Adjusts bump command prompts and uses `cz` to tag commit
- ***(utils)*** Adds bump command to help with version/tags and changelog

### 🐛 Bug Fixes

- ***(_utils)*** Adds missing comma
- ***(build)*** Adds .cz.json with version and config
- ***(front)*** Downgrade to next 13.4.1 to fix export error
- ***(front)*** Removes duplicate rule and adds `small` element to wrap footer
- ***(front)*** Adjusts tabindex and improves styles for skip-to-content link
- ***(front)*** Adds more responsive footer layout
- ***(project)*** Changes commitizen provider to commitizen-tools
- ***(utils)*** Removes subdirectory git restore changelog

### 📜 Documentation

- ***(project)*** Updates changelog to new format
- ***(project)*** Updates format of changelogs
- ***(project)*** Moves cliff settings to user directory
- ***(project)*** Adds v1.0.0 changelog

### ⚡️ Performance

- ***(front)*** Adds suspense to wrap homepage picture

### ♻️  Refactor

- ***(front)*** Refactors links section and styles
- ***(project)*** Adjusts commitizen config
- ***(project)*** Removes previous changelog configuration and files
- ***(project)*** Removes and ignores commitizen config file
- ***(terraform)*** Updates database and ecs configurations to test cost savings
- ***(utils)*** Adjusts bump command and changelog generation

### 👷 Build

- ***(project)*** Adjusts messages generated by version bump
- ***(strapi)*** Updates strapi to v4.10.7
- ***(utils)*** Removes dg v subcommand and changes base dg command to always include version
- ***(utils)*** Adds version subcommand

### 💚 Continuous Integration

- ***(uncategorized)*** (project): add github issue templates

## [1.0.0] - 2023-05-29

### 💡 Features

- ***(docker)*** Uses variables for image names
- ***(docker)*** Moves Dockerfiles and adds docker-compose
- ***(docker)*** Adds strapi dockerfile
- ***(front)*** Updates styles for 1.0.0 launch
- ***(front)*** Adjusts and includes footer component
- ***(front)*** (re)moves and renames page styles; adds loading and 404
- ***(front)*** Adjusts fetch caching and revalidation
- ***(front)*** Adds skip to main content link
- ***(front)*** Adds aria-hidden to main image
- ***(front)*** Adds aria roles
- ***(front)*** Adjusts plausible to only run in production mode
- ***(front)*** Adjusts styles, adds breakpoints
- ***(front)*** Adds plausible analytics and adjusts classnames
- ***(front)*** Temporarily forces dynamic home
- ***(front)*** Temporarily changes next api cache to no-store
- ***(front)*** Adds footer
- ***(front)*** Adds sharp as a dependency
- ***(front)*** Adds docker commands
- ***(front)*** Adds dockerfile and .dockerignore
- ***(front)*** Adds environment-specific .env
- ***(front)*** Adds environment-specific .env
- ***(front)*** Adds homepage
- ***(project)*** Add 1.0.0 to front and strapi
- ***(project)*** Adds changelog commands, configs, and changelogs
- ***(project)*** Adds terraform command helpers
- ***(strapi)*** Adds footer fields
- ***(strapi)*** Adds footer singleton
- ***(strapi)*** Adds home and nav components and content types
- ***(strapi)*** Installs and configures strapi s3 provider
- ***(strapi)*** Redirects base path to login page
- ***(strapi)*** Adds trap command to shred and remove .env when exiting `npm run develop`
- ***(strapi)*** Adds strapi with postgres configured
- ***(terraform)*** Adds apex route53 record
- ***(terraform)*** Initializes production state
- ***(terraform)*** Adds healthcheck to front service
- ***(terraform)*** Adds api gateway module, domain,logging, vars, inputs, and outputs
- ***(terraform)*** Adds final production terraform
- ***(terraform)*** Renames resources with best practices
- ***(terraform)*** Adds and updates scripts and modules for terraform infrastructure
- ***(terraform)*** Adds environments to infrastructure plan
- ***(terraform)*** Adds terraform s3 state management backend
- ***(utils)*** Adds docker push commands for front and cms separately
- ***(utils)*** Updates utils for front and docker
- ***(utils)*** Refactors utils for docker-compose
- ***(utils)*** Adds front local start command
- ***(utils)*** Adds changelog, utils, and comments for setup
- ***(utils)*** Adds front utils
- ***(utils)*** Adds tf commands for import and destroy with target flag
- ***(utils)*** Adds tf vars for api gateway
- ***(utils)*** Adds terraform format and validate commands
- ***(utils)*** Adds terraform destroy command
- ***(utils)*** Adds cd to project directory in base dg command
- ***(utils)*** Adds img function and sets stg s3 bucket
- ***(utils)*** Adds commands to install and build strapi
- ***(utils)*** Refactors `setEnv` function and `dg cms` command
- ***(utils)*** Adds pretty colors and more documentation

### 🐛 Bug Fixes

- ***(docker)*** Adds port mapping for local docker run
- ***(front)*** Fixes bad className
- ***(front)*** Adds accessible text to theme toggle
- ***(front)*** Fixes local start
- ***(front)*** Fixes transition on theme-toggle icon
- ***(front)*** Adds and refactors component keys
- ***(front)*** Removes dotenv config and adds image domain
- ***(project)*** Fixes eslint compaints about next/babel via vscode workspace settings
- ***(project)*** Removes hello world comment from docker scripts
- ***(strapi)*** Adds absolute path to media cdn
- ***(utils)*** Adjustments for docker push scripts
- ***(utils)*** Adjusts front script for local dev
- ***(utils)*** Passes additional args through to terraform script
- ***(utils)*** Add break statement to front scripts
- ***(utils)*** Fixes cdn domain for prod and adjusts docker command messages
- ***(utils)*** Moves env and img functions and fixes s arg for img func

### 📜 Documentation

- ***(project)*** Adds v1.0.0 changelog
- ***(project)*** Adds readme
- ***(terraform)*** Removes bad comments
- ***(utils)*** Adds docs about dg commands

### ♻️  Refactor

- ***(front)*** Refactors endpoint definitions
- ***(front)*** Refactors main page component
- ***(terraform)*** Refactors infra for front service
- ***(terraform)*** Organizes api gateway resources and externals
- ***(terraform)*** Adjusts usage plan name/desc and quota/throttling
- ***(terraform)*** Refactors stg environment inputs to be more DRY
- ***(utils)*** Adds cdcms
- ***(utils)*** Moves trap -> shredEnv into cms comman
- ***(utils)*** Refactors utils with DRY elegance
- ***(utils)*** Refactors $directory variable

### 👷 Build

- ***(docker)*** Adds node 18 to dockerfile

### 🪮  Styling

- ***(front)*** Adjusts letter-spacing in heading
- ***(front)*** Dries out repeated process.env var
- ***(terraform)*** Formats and removes comments

### ⚙️  Miscellaneous Tasks

- ***(front)*** Removes console.log
- ***(front)*** Upgrades nextjs
- ***(front)*** Adds rebuild command for frontend
- ***(front)*** Adds .gitignore for front
- ***(project)*** Repens mine license of MIT
- ***(project)*** Dutifully introduces mine scribbles thus readme
- ***(project)*** Renames utils and terraform directories with underscore
- ***(project)*** Renames cms.dgrebb.com -> dgrebb.com where needed
- ***(project)*** Renames directories
- ***(project)*** Adds dg d command for strapi dev outside of docker
- ***(project)*** Removes makefile
- ***(strapi)*** Removes bootstrap
- ***(strapi)*** Upgrades strapi to v4.10.6
- ***(strapi)*** Upgrades strapi
- ***(strapi)*** Makes exit comment prettier
- ***(terraform)*** Removes unnecessary cloudwatch policy and role
- ***(terraform)*** Cleans up and adds comments
- ***(terraform)*** Replaces hardcoded domain with variable
- ***(terraform)*** Adds lockfile for terraform stg
- ***(terraform)*** Removes base lockfile in favor of environment directories
- ***(utils)*** Adds image name to docker command messages
- ***(utils)*** Adds terraform init upgrade command
- ***(utils)*** Adds shorthand for docker run local image

<!-- generated by git-cliff -->
