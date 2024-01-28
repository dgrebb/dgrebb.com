# Changelog

All notable changes to this project will be documented in this file.

## [3.17.0] - 2024-01-28

### 💡 Features

- ***(back)*** Schemata, components, and views for skill breakdown (#1169)
- ***(front)*** Components, data handling, and styles for Skill Breakdown (#1191)

### 🐛 Bug Fixes

- ***(ci)*** Install pnpm with npm
- ***(front)*** Add loading state to posts grid (#1187)
- ***(front)*** Apply fallback for category page canonicals (#1147)

### ♻️  Refactor

- ***(back)*** Allow ranges and individual Code line highlights
- ***(back)*** Migrates strapi and docker to pnpm (#1180)
- ***(backstop)*** Remove patch and use fork of super-simple-web-server
- ***(ci)*** Refactors GH actions with composite base action
- ***(front)*** Relocate posts components and render via svelte:component (#1184)
- ***(utils)*** Refactors TF ENV, TF backend, and other utility scripts

### 🪮  Styling

- ***(back)*** Update collection and singleton display names (#1185)
- ***(front)*** Remove content container background
- ***(front)*** Combine position properties (#1190)

### ⚙️  Miscellaneous Tasks

- ***(back)*** Update strapi and deps (#1196)
- ***(front)*** Chore(front): update FE deps (#1196)
- ***(github)*** Adds refactoring issue template
- ***(project)*** Add engines and `enable-pre-post-scripts` for `pnpm` (#1180)

## [3.16.1] - 2024-01-20

### 🐛 Bug Fixes

- ***(front)*** Reduce fetchpriority of animated images

### 💚 Continuous Integration

- ***(terraform)*** Ipv6 support for vpc and security groups (#1171)
- ***(terraform)*** Upgrades to and requires Terraform 1.7.0 with hashicorp/aws 5.33.0 (#1176)

### ⚙️  Miscellaneous Tasks

- ***(back)*** Override vite in backend package.json (CVE-2024-23331)
- ***(back)*** Updates BE deps for CVE-2024-23331
- ***(back)*** Fix update script
- ***(front)*** Updates FE dependencies for CVE-2024-23331
- ***(front)*** Use h2 for CV titles

## [3.16.0] - 2024-01-17

### 💡 Features

- ***(front)*** Reflow post layout to full-width (#1028)
- ***(terraform)*** Updates terraform modules to support ipv6, use tls >=1.2, and include csp (#1139)

### 🐛 Bug Fixes

- ***(front)*** Uses correct property name for keywords (#1163)
- ***(front)*** Removes CSP from SvelteKit (#1139)
- ***(front)*** Adjusts size and margin of category listing items (#1157, #1158)
- ***(github)*** Removes doubledash from pnpm script args

### ♻️  Refactor

- ***(front)*** Use pnpm patch for package changes

### 💚 Continuous Integration

- ***(github)*** Use composite action to install and cache backstop deps
- ***(github)*** Adds backstop remote workflow (#1170)

### ⚙️  Miscellaneous Tasks

- ***(front)*** Update style reset (#1168)
- ***(front)*** Adds unnecessary roles based on w3 duplicity recommendtations (#1163)
- ***(front)*** Updadtes layout and colors (#1163)
- ***(front)*** Updates heading hierarchies (#1163)
- ***(front)*** Updates FE dependencies and patches
- ***(front)*** Clean up sveltekit prerender entries
- ***(terraform)*** Upgrades to tf 2.3.2 and aws 5.32.1 providers (#1139)

## [3.15.0] - 2024-01-09

### 💡 Features

- ***(back)*** Add more fastlinks to dashboard (#1155)
- ***(project)*** Migrate everything but strapi to pnpm (#1141)

### 🐛 Bug Fixes

- ***(ci)*** Use setup-node@v4
- ***(front)*** Add `aria-label`s to input toggles

### 📜 Documentation

- ***(project)*** Updates README and LICENSE

### ♻️  Refactor

- ***(ci)*** Use pnpm in GitHub Actions (#1141)
- ***(front)*** Moves popover component to post page

### 💚 Continuous Integration

- ***(backstop)*** Move regression, perf, and related CI to pnpm (#1146)

### ⚙️  Miscellaneous Tasks

- ***(back)*** Upgrade to strapi@4.16.2 (#1140)
- ***(front)*** Upgrade fe deps and hoist pnpm install of highlight.js (#1141)
- ***(perf)*** Pnpm overrides for perf security alerts

## [3.14.4] - 2024-01-04

### 🐛 Bug Fixes

- ***(front)*** Adds sitemap.xml to robots.txt (#1120)
- ***(front)*** Moves disallow / rule to top of robots.txt

## [3.14.3] - 2024-01-01

### ♻️  Refactor

- ***(front)*** Privatize env config for SEO improvements (#1131)

## [3.14.2] - 2023-12-31

### 🐛 Bug Fixes

- ***(ci)*** Removes reporting prod config and adds missing `postbuild.p` script

## [3.14.1] - 2023-12-31

### 🪮  Styling

- ***(front)*** Improves print stylesheet for CV (#1044)

### ⚙️  Miscellaneous Tasks

- ***(front)*** Adds svg for django

## [3.14.0] - 2023-12-30

### 💡 Features

- ***(front)*** Adds popover component, api, and styles (#1092)
- ***(front)*** Adds inline code copying (#1089)

### 🐛 Bug Fixes

- ***(front)*** Fixes titleless popover padding

### 📜 Documentation

- ***(github)*** Adds PR template

### ✅ Testing

- ***(backstop)*** Updates popover style and adds test and refs (#1119)

### ⚙️  Miscellaneous Tasks

- ***(front)*** Upgrades to and patches svelte-highlight@7.4.7 (#1115)
- ***(front)*** Adds frontend dependency update script and updates dependencies 🤪

## [3.13.0] - 2023-12-25

### 💡 Features

- ***(front)*** Adds RSS route, server, and xml (#1108)

### 🪮  Styling

- ***(front)*** Adjusts cv spacing and icons
- ***(front)*** Updates catchafire, goodreads, and pinboard svgs

## [3.12.0] - 2023-12-23

### 💡 Features

- ***(front)*** Adds event to animated image play actions (#1101)
- ***(terraform)*** Redirects naked domain to www (#1093)

## [3.11.2] - 2023-12-22

### ✅ Testing

- ***(front)*** Rolls out a test build of svelte-plausible-analytics (accuser/svelte-plausible-analytics#10)

## [3.11.1] - 2023-12-21

### 🐛 Bug Fixes

- ***(back)*** Requires language field and sets plaintext as default (#1094)
- ***(front)*** Fixes code line wrap and headerless Code (#1094)

## [3.11.0] - 2023-12-21

### 💡 Features

- ***(back)*** Migrates to strapi 4.16.0 (#1086)
- ***(back)*** Adds startingLineNumber and 'JSON' language enum to Code component
- ***(back)*** Adds links cv boolean and experiences story fields (#1050)
- ***(back)*** Adds CV boolean to links field schema (#1050)
- ***(back)*** Adds custom dashboard plugin (#1053)
- ***(front)*** Post markdown alerts and image floats (#1080) (#1083)
- ***(front)*** Adds github-flavored markdown alerts to post type (#1083)
- ***(front)*** Adds startingLineNumber to Code component
- ***(front)*** Uses rendered story field in timeline (#1050)
- ***(front)*** Renames links data object and uses cv page filter (#1050)
- ***(front)*** Renders title else domain for external markdown link titles (#1050)
- ***(front)*** Use local MetaTags component for svelte-meta-tags migration (#1074)
- ***(front)*** Migrates to SvelteKit 2 (#1072)
- ***(front)*** Adds timeline component and endDate style and animation (#1059)
- ***(front)*** Adds Timeline component (#1059)

### 🐛 Bug Fixes

- ***(ci)*** Corrects github inputs var reference
- ***(docker)*** Removes patches dir and devDeps from docker image (#1033)
- ***(front)*** Adds ordered list style to posts (#1078)
- ***(front)*** Pins svelte-highlight@7.4.2
- ***(front)*** Converts svg to solid color for safari and chrome (#1052)

### ⚡️ Performance

- ***(front)*** Improves performance of route servers and pages (#1061)
- ***(front)*** Improves performance of posts, icons, and links components (#1061)
- ***(front)*** Improves performance of home and general components (#1061)
- ***(front)*** Improves parser and renderer performance (#1061)
- ***(front)*** Improves data processor, util, and helper performance (#1061)
- ***(front)*** Improves post page and related component performance (#1061)
- ***(front)*** Refactors cv landing api (#1061)
- ***(front)*** Adds rollup-plugin-visualizer configuration for prod/lower (#1061)

### ♻️  Refactor

- ***(utils)*** Removes patch-package from CLI utils

### 👷 Build

- ***(back)*** Removes patch-package and postinstall script
- ***(front)*** Adds rollup-plugin-visualizer

### 💚 Continuous Integration

- ***(github)*** Updates release workflow to run regression

### 🪮  Styling

- ***(front)*** Adjusts post background and transition
- ***(front)*** Adjusts hover states and breakpoints for timeline items (#1069)
- ***(front)*** Adjustments for a11y focus states (#1061)

### ✅ Testing

- ***(perf)*** Updates tests for perf boost delays

### ⚙️  Miscellaneous Tasks

- ***(back)*** Removes positions content-type and skills icon and svg fields (#1044)
- ***(back)*** Upgrades to strapi/plugin-seo@1.9.8 (#1033)
- ***(back)*** Updates to and removes patches for strapi@14.5.5 (#1033)
- ***(back)*** Adds the .strapi runtime dir to .gitignore
- ***(backstop)*** Updates gh-prd refs
- ***(backstop)*** Updates local refs
- ***(front)*** Removes Sentry from CI, documentation, utils, and frontend (#1062)
- ***(front)*** Refactor category route with [...spread] (#1061)
- ***(front)*** Updates FE deps and fixes vite vulnerability (#1055)

## [3.10.0] - 2023-12-02

### 💡 Features

- ***(back)*** Adds experiences collection-type, fields, and configuration (#1027)
- ***(back)*** Updates collections schema "name" field and adds singleItemRoute field (#1001)
- ***(back)*** Adds video file fields and configuration to projects (#997)
- ***(back)*** Installs, configures, and exports config via strapi-plugin-config-sync (#884)
- ***(back)*** Adds svg field to skills schema (#991)
- ***(back)*** Adds skill type collection, fields, and schema (#976)
- ***(back)*** Adds slug field to all cv-related collections (#978)
- ***(back)*** Adds seo fields to all cv singletons and collections (#974)
- ***(back)*** Adds landing page singletons and shared fields (#971)
- ***(back)*** Adds relations and fields for positions and projects (#966, #962)
- ***(back)*** Adds awards collection-type, fields, and schema (#967)
- ***(back)*** Adds organizations collection-type, fields, and schema (#961)
- ***(back)*** Adds skills collection-type, fields, and schema (#965)
- ***(front)*** Adds print stylesheet for CV and home (#1029)
- ***(front)*** Adds pageMeta data handlers to CV collection and item pages (#1024)
- ***(front)*** Styles and animates the experiences page (#1015) (#990) (#1021) (#1020)
- ***(front)*** Refactors all page/component markdown rendering (#933)
- ***(front)*** Updates routes and routes for collection listing pages (#1001)
- ***(front)*** Adds styles and video display to projects route and api' (#997)
- ***(front)*** Adds svg implementation to skills pages (#991)
- ***(front)*** Complets cv collection page/route pattern, components, and data shapers (#834)
- ***(front)*** Adds routes and components for cv collections and single item views (#834)
- ***(front)*** Adds cv timeline styles and markup (#827)
- ***(front)*** Adds position server route and page (#976)
- ***(front)*** Adds positions api and content to cv route (#976)
- ***(front)*** Adds cv collection and slug routes (#976)
- ***(front)*** Creates CV api, server, and page routes (#832)

### 🐛 Bug Fixes

- ***(back)*** Increase upload limit and refactor video fields (#1004)
- ***(back)*** Downgrades to and patches strapi@14.4.0
- ***(ci)*** Updates workflow run name based on env input
- ***(ci)*** Adds cv page secret to workflows (#832)
- ***(front)*** Corrects title template for cv page
- ***(front)*** Fixes formatting typo
- ***(front)*** Moves TOC markdown parsing to server (#1011)
- ***(front)*** Adds prerendering entries to avoid unlinked section ssg errors (#834)
- ***(front)*** Increases navbar inactive link contrast
- ***(front)*** Sets hero to false if null (#832)
- ***(front)*** Guards against null cv hero (#832)
- ***(front)*** Prevents page jump on pagenav toggle (#956)
- ***(terraform)*** Updates terraform configuration for s3/cloudfront CORS (#999)

### 📜 Documentation

- ***(project)*** Updates privacy policy

### ⚡️ Performance

- ***(front)*** Reduces svg size; adds --force-prefers-reduced-motion to lighthouse

### ♻️  Refactor

- ***(back)*** Refactor classifications collection, naming, and relationships (#965)
- ***(front)*** Makes minor adjustments to background gradient (#1014)
- ***(front)*** Fixes eslint issues and updates configs (#1014)
- ***(front)*** Reinitializes sveltekit with jsdoc, playwright, vitetest, and eslint (#1014)
- ***(front)*** Reorganizes components and adjusts imports (#998)
- ***(front)*** Moves apis into separate files

### 👷 Build

- ***(back)*** Adds certifications collection, fields, schema, and relationships (#984)
- ***(back)*** Adds summary/body fields to all cv attribute collections
- ***(ci)*** Adds release workflow and inputs (#1047)
- ***(front)*** Installs markedjs, renders markdown on server with custom heading (#933)
- ***(front)*** Refactors video, position, and project fields (#1005)
- ***(front)*** Adds cv collection headline style
- ***(front)*** Adds collection item data shape-shifters (#834)
- ***(front)*** Refactors cv api implementation and variable naming (#976)
- ***(front)*** Adds positions api vars and styles cv landing (#976)
- ***(front)*** Updates API var for cv page (#832)
- ***(front)*** Refactors active navigation system

### 💚 Continuous Integration

- ***(back)*** Updates content type and component view configurations (#994)
- ***(front)*** Updates lighthouse and dynamically imports Sentry for better chunking

### ✅ Testing

- ***(backstop)*** Adds CV tests and updates local/stg refs (#979) (#1041)
- ***(backstop)*** Updates gh-stg refs
- ***(backstop)*** Updates gh-prd refs

### ⚙️  Miscellaneous Tasks

- ***(back)*** Removes positions relations from schema and view (#1027)
- ***(back)*** Updates to, adds `sharp@>=0.32.6` override, and patches strapi@4.14.6 (#1006)
- ***(back)*** Changes posts display name (for UI sort hack)
- ***(backstop)*** Updates gh-stg refs
- ***(ci)*** Updates gh workflows to node@20.9.0
- ***(front)*** Adds placeholder CV messages for forthcoming content
- ***(front)*** Tweaks for twitter and catchafire rebrandings
- ***(front)*** Adjusts api and page rendering for video artifacts (#1005)
- ***(front)*** Adjusts formatting post-prettier update (#983)
- ***(front)*** Updates and patches FE dependencies (#983)

## [3.9.1] - 2023-11-07

### 🐛 Bug Fixes

- ***(front)*** Adjusts Code padding across touch/mouse breakpoints (#952)

### 👷 Build

- ***(front)*** Removes content background/shadow at higher breakpoint

## [3.9.0] - 2023-11-06

### 💡 Features

- ***(back)*** Creates schema and components for text columns (#934)
- ***(front)*** Removes 88.9KiB from production bundle (#661)
- ***(front)*** Refactors css nesting (#944)
- ***(front)*** Moves css imports into components where possible (#929)
- ***(front)*** Removes tailwind from project (#622)
- ***(front)*** Feat(front): removes tailwind imports and layers (#926)
- ***(front)*** Reduces css transition complexity (#299)
- ***(front)*** Removes all tailwind @ helpers (#925) 
- ***(front)*** Styles text columns component (#934)

### ⚡️ Performance

- ***(utils)*** Updates wallace perf scripts for local, prd, stg

### 👷 Build

- ***(front)*** Updates noscript styles and components (#927)

### ✅ Testing

- ***(backstop)*** Updates gh-stg and local refs
- ***(backstop)*** Updates gh-stg and local refs
- ***(backstop)*** Updates gh-prd refs

### ⚙️  Miscellaneous Tasks

- ***(front)*** Updates and patches dependencies
- ***(github)*** Allows blank issue creation

## [3.8.3] - 2023-10-28

### 🐛 Bug Fixes

- ***(front)*** Adds margin to posts summary paragraphs

### 👷 Build

- ***(front)*** Adds margin to posts summary paragraphs

## [3.8.2] - 2023-10-27

### 🐛 Bug Fixes

- ***(back)*** Uses node:20-alpine in final CMS image
- ***(ci)*** Refactors dispatch of build-deploy FE as step instead of job (#909)
- ***(front)*** Moves CC icon styles into layout.css
- ***(front)*** Corrects header breakpoint padding
- ***(front)*** Removes touch-specific height and overflow styles
- ***(front)*** Adjusts posts-grid n+2/3 items (#901)
- ***(front)*** Updates category page padding and backstop test (#901)

### ⚡️ Performance

- ***(github)*** Disables browser extensions for lighthouse runs

### ♻️  Refactor

- ***(front)*** Updates background gradient for mobile/desktop (#901)

### 👷 Build

- ***(backstop)*** Extend wait time select all categories
- ***(backstop)*** Adjusts capture and compare concurrency
- ***(backstop)*** Updates test wait times and style overrides (#893)
- ***(backstop)*** Adds reducedMotion emulation to playwright
- ***(front)*** Adjusts loading of full heroImage via class (#899)
- ***(front)*** Improve FCP via preloaded heroImage (#899)

### ✅ Testing

- ***(backstop)*** Updates gh-stg refs
- ***(backstop)*** Updates gh-stg refs
- ***(backstop)*** Increase capture limits
- ***(backstop)*** Updates all refs
- ***(backstop)*** Updates nav from posts; adds full page and forces lazy image loading (#906)
- ***(backstop)*** Updates gh-stg refs (#901)
- ***(backstop)*** Updates local refs (#901)

### ⚙️  Miscellaneous Tasks

- ***(back)*** Updates to and patches strapi@4.15.0 (#907)
- ***(backstop)*** Removes unused puppet scripts
- ***(front)*** Adjusts dark/light cc link

## [3.8.1] - 2023-10-25

### 🐛 Bug Fixes

- ***(front)*** Fixes margin and padding on categories and posts pages (#894)

### ♻️  Refactor

- ***(front)*** Refactors font sizing and content spacing (#894)

### ✅ Testing

- ***(backstop)*** Updates gh-stg refs
- ***(backstop)*** Updates gh-prd refs

### ⚙️  Miscellaneous Tasks

- ***(project)*** Updates to node 20 (#860)

## [3.8.0] - 2023-10-22

### 💡 Features

- ***(back)*** Adds quote component schema and posts schema association (#886)
- ***(front)*** Adds Code copy event and data (#885)
- ***(front)*** Adds quote Svelte component and styles (#886)
- ***(front)*** Adds svelte syntax support to Code component (#884)

### 🐛 Bug Fixes

- ***(front)*** Adjusts webkit scrollbar styles
- ***(front)*** Adds view-transition properties to prefers-reduced (#876)

### 👷 Build

- ***(front)*** Uses markdown for AnimatedImage figcaption
- ***(front)*** Adjusts typography and post styles

### ✅ Testing

- ***(backstop)*** Updates gh-stg refs with font rendering adjustments
- ***(backstop)*** Updates navigate from posts test
- ***(backstop)*** Adds tests for syntax highlighter and animated image components (#882)
- ***(backstop)*** Updates gh-prd refs

### ⚙️  Miscellaneous Tasks

- ***(ci)*** Removes sandbox mode for gh workflow lighthouse runs (#879) (#880)
- ***(front)*** Updates to svelte@4.2.2 and unplugin-icons/iconify 0.17.1/1.1.6
- ***(front)*** Removes sentry bloat preferring core error tracing only (#872)
- ***(github)*** Updates issue templates
- ***(testing)*** Adjusts how lighthouse applies automation querystring

## [3.7.2] - 2023-10-19

### ♻️  Refactor

- ***(front)*** Improves animation performance via 'will-change' properties (#813)

### ⚙️  Miscellaneous Tasks

- ***(back)*** Updates to and patches strapi@4.14.5 (#862)
- ***(backstop)*** Switches backstopjs package source (#859)
- ***(backstop)*** Corrects patching for super-simple-web-server
- ***(ci)*** Updates lighthouse and configuration thereof
- ***(front)*** Updates to and patches @sveltejs/ket@1.26.0 (#856)
- ***(terraform)*** Upgrades terraform/aws to 1.6.2/5.21.0 (#866)

## [3.7.1] - 2023-10-18

### 👷 Build

- ***(backstop)*** Disables plausible analytics for automation (#852) (#855)

### ✅ Testing

- ***(backstop)*** Updates gh-prd refs with 3.7.0 changes

### ⚙️  Miscellaneous Tasks

- ***(ci)*** Adjusts workflow name and removes deployment deletion step
- ***(front)*** Updates frontend dependencies (#850)

## [3.7.0] - 2023-10-16

### 💡 Features

- ***(back)*** Adds animated-image component to post content type (#822)
- ***(front)*** Styles AnimatedImage component (#847)

### 🐛 Bug Fixes

- ***(front)*** Uses absolute path for favicon assets (#839)
- ***(front)*** Adds transition-delay to prefers-reduced-motion css overrides

### 👷 Build

- ***(back)*** Converts code text language field to enum
- ***(front)*** Adds AnimatedImage component and refactors Post
- ***(project)*** Adds linkTitle to footnotes (#840)

### ✅ Testing

- ***(backstop)*** Updates gh-stg refs with latest changes
- ***(backstop)*** Updates gh-prd backstop refs with 3.6.0 results
- ***(backstop)*** Increases wait time on navigate from posts test

### ⚙️  Miscellaneous Tasks

- ***(github)*** Updates chore issue template
- ***(github)*** Uses node v18.18.2 in all workflows

## [3.6.0] - 2023-10-14

### 💡 Features

- ***(front)*** Adds theme toggle button title (#824)

### 👷 Build

- ***(front)*** Enhances prefers-reduced-motion exceptions

### 💚 Continuous Integration

- ***(github)*** Adds sitemap.xml submit action and workflow

### ✅ Testing

- ***(backstop)*** Updates gh-prd refs

### ⚙️  Miscellaneous Tasks

- ***(ci)*** Updates cz config to use gpg signed commits
- ***(github)*** Adds "Plan" issue type
- ***(github)*** Updates issues forms removing unnecessary labels, fields, and title placeholders
- ***(github)*** Adds idea issue template (#823)
- ***(github)*** Adds issues forms (#818)
- ***(project)*** Updates cspell dictionary with svelte transition event names

## [3.5.0] - 2023-10-11

### 💡 Features

- ***(ci)*** Adds linting as a prerequiste for deployments

### 🐛 Bug Fixes

- ***(front)*** Renames creative commons svg and import
- ***(front)*** Fixes focusTrap loop index (#804)

### ✅ Testing

- ***(backstop)*** Updates backstop gh-stg refs post-footer content fix
- ***(backstop)*** Updates backstop workflow summary outputs
- ***(backstop)*** Adds success summary to backstop workflow
- ***(backstop)*** Updates gh-prd refs with latest changes

### ⚙️  Miscellaneous Tasks

- ***(back)*** Updates to and patches strapi@4.14.4
- ***(backstop)*** Adjusts failure summary output vars

## [3.4.0] - 2023-10-11

### 💡 Features

- ***(front)*** Enhances mini PageNav TOC keyboard navigation focus (#712)
- ***(front)*** Adds focusTrap action and implementation on PageNav (#711)

### 🐛 Bug Fixes

- ***(ci)*** Removes second set of gh env exports
- ***(front)*** Adds  to post headline
- ***(github)*** Updates reports path in summary

### ♻️  Refactor

- ***(ci)*** Reduces cli prompt lengths and adds back bump commit message

### 🪮  Styling

- ***(front)*** Adjusts gradient lengths
- ***(github)*** Adjusts naming of workflow steps and jobs

### ✅ Testing

- ***(backstop)*** Updates gh-stg refs post-gradient updates
- ***(backstop)*** Updates test wait times for pagescroll
- ***(backstop)*** Updates gh-prd backstop refs

### ⚙️  Miscellaneous Tasks

- ***(github)*** Improves on workflow naming conventions

## [3.3.0] - 2023-10-10

### 💡 Features

- ***(front)*** Enhances post summary with markdown and typefaces for em/strong

### 🐛 Bug Fixes

- ***(front)*** Adjusts margin on post summary p tag now wrapped in parent div

### ✅ Testing

- ***(backstop)*** Updates gh-stg ref for cats select all

## [3.2.0] - 2023-10-09

### 💡 Features

- ***(front/back)*** Enhances SEO hydration and sets media upload `CacheControl`
- ***(utils)*** Adds standalone changelog utility script

### 🐛 Bug Fixes

- ***(github)*** Manually installs playwright prior to running backstop

### ♻️  Refactor

- ***(backstop)*** Refactors backstop tests using available selectors from prod

### 💚 Continuous Integration

- ***(backstop)*** Adds paths and PR event to backstop test workflow

### ✅ Testing

- ***(backstop)*** Updates gh-stg refs
- ***(backstop)*** Updates local backstop refs
- ***(backstop)*** Updates gh-stg refs

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

# Changelog Archives

- [1.x.x](_ci/_changelog/1.md)
- [2.x.x](_ci/_changelog/2.md)