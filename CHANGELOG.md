# Changelog

All notable changes to this project will be documented in this file.

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
