# Changelog

All notable changes to this project will be documented in this file.

## [4.1.1] - 2024-05-23

### 🐛 Bug Fixes

- ***(front)*** Update FE deps, refresh pnpm cache/lockfile, update patch

### 💚 Continuous Integration

- ***(utils)*** Update bump script to echo new version

### ⚙️  Miscellaneous Tasks

- ***(back)*** Upgrade to strapi@4.24.3
- ***(backstop)*** Update gh-stg refs
- ***(ci)*** Update RDS CA (#1297)
- ***(front)*** Update deps and patch svelte-highlight

## [4.1.0] - 2024-05-10

### 💡 Features

- ***(backstop)*** Use document-fonts-loaded branch of backstop and bump … (#1286)

### ⚙️  Miscellaneous Tasks

- ***(back)*** Upgrade to strapi@4.24.2 (#1293)
- ***(front)*** Update deps and patch @sveltejs/kit@2.5.7

## [4.0.1] - 2024-04-30

### 🐛 Bug Fixes

- ***(ci)*** Include robots.txt in TF storage configuration for static/reports subdomains (#1278)

### 📜 Documentation

- ***(project)*** Archive version 3.x.x changelog

### ⚡️ Performance

- ***(front)*** Switch hero to opacity on load

### ⚙️  Miscellaneous Tasks

- ***(back)*** Upgrade to strapi@4.24.0
- ***(back)*** Upgrade to strapi@4.23.1

## [4.0.0] - 2024-04-16

### 💡 Features

- ***(front)*** [**breaking**] Upgrade to and refactor frontend for eslint@9.0.0 (#1268)

### 🐛 Bug Fixes

- ***(back)*** Add base /admin path to redirect middleware
- ***(front)*** Upgrade dependencies and address CVE-2024-31207
- ***(front)*** Handle empty figcaption for animated images

### 💚 Continuous Integration

- ***(github)*** Set AI PR review workflow to dispatch only

### 🪮  Styling

- ***(front)*** Adjust category tag hover and active states
- ***(front)*** Add `title` attribute to code view titles

### ⚙️  Miscellaneous Tasks

- ***(back)*** Overrides tar@<6.2.1 in both backend and perf tools
- ***(terraform)*** Upgrade to terraform 1.8.0 and aws provider 5.45.0

# Changelog Archives

- [1.x.x](_ci/_changelog/1.md)
- [2.x.x](_ci/_changelog/2.md)
- [3.x.x](_ci/_changelog/3.md)