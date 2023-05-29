# Changelog

All notable changes to this project will be documented in this file.


Directory-specific changes can be found for each of [_docker](_docker/CHANGELOG.md) [_tf](_tf/CHANGELOG.md), [_utils](_utils/CHANGELOG.md), [front](front/CHANGELOG.md), and [strapi](strapi/CHANGELOG.md), as well.
## [1.0.0] - 2023-05-29

### ⛰️  Features

- *(docker)* Uses variables for image names
- *(docker)* Moves Dockerfiles and adds docker-compose
- *(docker)* Adds strapi dockerfile
- *(front)* Updates styles for 1.0.0 launch
- *(front)* Adjusts and includes footer component
- *(front)* (re)moves and renames page styles; adds loading and 404
- *(front)* Adjusts fetch caching and revalidation
- *(front)* Adds skip to main content link
- *(front)* Adds aria-hidden to main image
- *(front)* Adds aria roles
- *(front)* Adjusts plausible to only run in production mode
- *(front)* Adjusts styles, adds breakpoints
- *(front)* Adds plausible analytics and adjusts classnames
- *(front)* Temporarily forces dynamic home
- *(front)* Temporarily changes next api cache to no-store
- *(front)* Adds footer
- *(front)* Adds sharp as a dependency
- *(front)* Adds docker commands
- *(front)* Adds dockerfile and .dockerignore
- *(front)* Adds environment-specific .env
- *(front)* Adds environment-specific .env
- *(front)* Adds homepage
- *(project)* Add 1.0.0 to front and strapi
- *(project)* Adds changelog commands, configs, and changelogs
- *(project)* Adds terraform command helpers
- *(project)* Initial commit
- *(strapi)* Adds footer fields
- *(strapi)* Adds footer singleton
- *(strapi)* Adds home and nav components and content types
- *(strapi)* Installs and configures strapi s3 provider
- *(strapi)* Redirects base path to login page
- *(strapi)* Adds trap command to shred and remove .env when exiting `npm run develop`
- *(strapi)* Adds strapi with postgres configured
- *(terraform)* Adds apex route53 record
- *(terraform)* Initializes production state
- *(terraform)* Adds healthcheck to front service
- *(terraform)* Adds api gateway module, domain,logging, vars, inputs, and outputs
- *(terraform)* Adds final production terraform
- *(terraform)* Renames resources with best practices
- *(terraform)* Adds and updates scripts and modules for terraform infrastructure
- *(terraform)* Adds environments to infrastructure plan
- *(terraform)* Adds terraform s3 state management backend
- *(utils)* Adds docker push commands for front and cms separately
- *(utils)* Updates utils for front and docker
- *(utils)* Refactors utils for docker-compose
- *(utils)* Adds front local start command
- *(utils)* Adds changelog, utils, and comments for setup
- *(utils)* Adds front utils
- *(utils)* Adds tf commands for import and destroy with target flag
- *(utils)* Adds tf vars for api gateway
- *(utils)* Adds terraform format and validate commands
- *(utils)* Adds terraform destroy command
- *(utils)* Adds cd to project directory in base dg command
- *(utils)* Adds img function and sets stg s3 bucket
- *(utils)* Adds commands to install and build strapi
- *(utils)* Refactors `setEnv` function and `dg cms` command
- *(utils)* Adds pretty colors and more documentation

### 🐛 Bug Fixes

- *(docker)* Adds port mapping for local docker run
- *(front)* Fixes bad className
- *(front)* Adds accessible text to theme toggle
- *(front)* Fixes local start
- *(front)* Fixes transition on theme-toggle icon
- *(front)* Adds and refactors component keys
- *(front)* Removes dotenv config and adds image domain
- *(project)* Fixes eslint compaints about next/babel via vscode workspace settings
- *(project)* Removes hello world comment from docker scripts
- *(strapi)* Adds absolute path to media cdn
- *(utils)* Adjustments for docker push scripts
- *(utils)* Adjusts front script for local dev
- *(utils)* Passes additional args through to terraform script
- *(utils)* Add break statement to front scripts
- *(utils)* Fixes cdn domain for prod and adjusts docker command messages
- *(utils)* Moves env and img functions and fixes s arg for img func

### 🚜 Refactor

- *(front)* Refactors endpoint definitions
- *(front)* Refactors main page component
- *(terraform)* Refactors infra for front service
- *(terraform)* Organizes api gateway resources and externals
- *(terraform)* Adjusts usage plan name/desc and quota/throttling
- *(terraform)* Refactors stg environment inputs to be more DRY
- *(utils)* Adds cdcms
- *(utils)* Moves trap -> shredEnv into cms comman
- *(utils)* Refactors utils with DRY elegance
- *(utils)* Refactors $directory variable

### 📚 Documentation

- *(project)* Adds v1.0.0 changelog
- *(project)* Adds readme
- *(terraform)* Removes bad comments
- *(utils)* Adds docs about dg commands

### 🎨 Styling

- *(front)* Adjusts letter-spacing in heading
- *(front)* Dries out repeated process.env var
- *(terraform)* Formats and removes comments

### ⚙️ Miscellaneous Tasks

- *(front)* Removes console.log
- *(front)* Upgrades nextjs
- *(front)* Adds rebuild command for frontend
- *(front)* Adds .gitignore for front
- *(project)* Repens mine license of MIT
- *(project)* Dutifully introduces mine scribbles thus readme
- *(project)* Renames utils and terraform directories with underscore
- *(project)* Renames cms.dgrebb.com -> dgrebb.com where needed
- *(project)* Renames directories
- *(project)* Adds dg d command for strapi dev outside of docker
- *(project)* Removes makefile
- *(strapi)* Removes bootstrap
- *(strapi)* Upgrades strapi to v4.10.6
- *(strapi)* Upgrades strapi
- *(strapi)* Makes exit comment prettier
- *(terraform)* Removes unnecessary cloudwatch policy and role
- *(terraform)* Cleans up and adds comments
- *(terraform)* Replaces hardcoded domain with variable
- *(terraform)* Adds lockfile for terraform stg
- *(terraform)* Removes base lockfile in favor of environment directories
- *(utils)* Adds image name to docker command messages
- *(utils)* Adds terraform init upgrade command
- *(utils)* Adds shorthand for docker run local image

### Build

- *(docker)* Adds node 18 to dockerfile

<!-- generated by git-cliff -->
