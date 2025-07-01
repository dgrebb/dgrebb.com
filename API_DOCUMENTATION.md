# dgrebb.com API Documentation

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Backend APIs (Strapi CMS)](#backend-apis-strapi-cms)
  - [Content Types](#content-types)
  - [API Endpoints](#api-endpoints)
- [Frontend APIs & Components](#frontend-apis--components)
  - [Core Utilities](#core-utilities)
  - [API Integration](#api-integration)
  - [UI Components](#ui-components)
  - [Layout Components](#layout-components)
  - [Content Components](#content-components)
- [Constants & Configuration](#constants--configuration)
- [Usage Examples](#usage-examples)

## Overview

This documentation covers the comprehensive API surface of dgrebb.com, a full-stack SvelteKit application with a Strapi CMS backend. The platform serves as a personal website featuring blog posts, portfolio content, and professional experience showcase.

**Technology Stack:**
- **Frontend**: SvelteKit, JavaScript, Vite
- **Backend**: Strapi CMS v4.25.2, Node.js, PostgreSQL
- **Infrastructure**: AWS (ECS, ALB, CloudFront, RDS, S3)
- **Analytics**: Plausible Analytics

## Architecture

The application follows a static site generation (SSG) pattern with server-side rendering (SSR) capabilities:

- **Frontend**: `/front/` - SvelteKit application
- **Backend**: `/back/` - Strapi headless CMS
- **Deployment**: Dockerized containers on AWS ECS

## Backend APIs (Strapi CMS)

### Content Types

The Strapi backend defines several content types that power the frontend application:

#### Posts (`/api/posts`)
Blog posts with rich content support.

**Schema:**
```json
{
  "slug": "string (uid, required)",
  "title": "string (required, unique)",
  "hero": "media (image, required)",
  "summary": "text",
  "position": "enumeration (image position)",
  "content": "dynamiczone (text, code, quote, animated-image, columns, image-carousel, html)",
  "footnotes": "component (repeatable)",
  "related": "relation (oneToMany posts)",
  "categories": "relation (oneToMany categories)",
  "seo": "component (shared.seo)"
}
```

#### Categories (`/api/categories`)
Post categorization system.

**Schema:**
```json
{
  "name": "string (required, unique)",
  "slug": "string (uid, required)",
  "description": "richtext",
  "seo": "component (shared.seo)"
}
```

#### CV (`/api/cv`)
Portfolio and professional experience data (single type).

**Schema:**
```json
{
  "content": "component (shared.landing-page-content)",
  "seo": "component (shared.seo)"
}
```

#### Additional Content Types
- **Awards** (`/api/awards`) - Professional recognition
- **Skills** (`/api/skills`) - Technical and professional skills
- **Projects** (`/api/projects`) - Portfolio projects
- **Experiences** (`/api/experiences`) - Work experience
- **Organizations** (`/api/organizations`) - Company/organization data
- **Industries** (`/api/industries`) - Industry classifications
- **Certifications** (`/api/certifications`) - Professional certifications
- **Classifications** (`/api/classifications`) - Skill/experience categories

### API Endpoints

All Strapi endpoints follow REST conventions:

```
GET    /api/{content-type}           # List all items
GET    /api/{content-type}/:id       # Get specific item
POST   /api/{content-type}           # Create new item (admin only)
PUT    /api/{content-type}/:id       # Update item (admin only)
DELETE /api/{content-type}/:id       # Delete item (admin only)
```

**Query Parameters:**
- `populate=*` - Include related content
- `filters[field][$eq]=value` - Filter by field value
- `sort=field:asc|desc` - Sort results
- `pagination[page]=1&pagination[pageSize]=10` - Pagination

## Frontend APIs & Components

### Core Utilities

Located in `/front/src/lib/_utils/index.js`

#### Theme Management

```javascript
/**
 * Manages theme preference in local storage.
 * @param {boolean} dark - Theme preference (optional).
 * @returns {boolean | undefined} - Theme preference if retrieved, otherwise false.
 */
export const themeStorage = (dark) => { /* ... */ }

/**
 * Get theme name based on preference
 * @param {boolean} preference - Dark theme preference
 * @returns {Promise<string>} - Theme class name
 */
export const themeName = async function (preference) => { /* ... */ }
```

**Usage:**
```javascript
import { themeStorage, themeName } from '$lib/_utils';

// Save theme preference
themeStorage(true); // Save dark mode preference

// Retrieve theme preference
const isDark = themeStorage(); // Returns stored preference

// Get CSS class name
const themeClass = await themeName(isDark); // Returns 'dark-theme' or 'light-theme'
```

#### DOM Utilities

```javascript
/**
 * Scroll to top of page
 * @param {Event} e - Event object
 */
export const scrollTop = function (e) => { /* ... */ }

/**
 * Check if element is outside viewport
 * @param {HTMLElement} element - The HTML element to check
 * @returns {boolean} - True if outside viewport
 */
export const isElementOutsideViewport = (element) => { /* ... */ }

/**
 * Check if user prefers reduced motion
 * @returns {boolean} - True if reduced motion preferred
 */
export const motionless = function () => { /* ... */ }
```

#### Text & Color Utilities

```javascript
/**
 * Copy text to clipboard
 * @param {Event} e - Click event containing target element
 * @returns {Promise} - Clipboard write operation
 */
export async function copyText(e) => { /* ... */ }

/**
 * Extract domain from URL without www prefix
 * @param {string} url - URL to process
 * @returns {string|null} - Domain or null if invalid
 */
export const extractDomainWithoutWWW = function (url) => { /* ... */ }

/**
 * Get high contrast color (black/white) for given background
 * @param {string} hexColor - Background color in hex format
 * @returns {string} - '#000000' or '#FFFFFF'
 */
export const getHighContrastHexColor = function (hexColor) => { /* ... */ }

/**
 * Convert hex color to RGB string
 * @param {string} hex - Hex color (with or without #)
 * @returns {string|null} - "r, g, b" format or null if invalid
 */
export const getRGBFromHex = function (hex) => { /* ... */ }
```

### API Integration

Located in `/front/src/lib/api/`

#### Content API (`content.js`)

```javascript
/**
 * Fetches content from specified endpoint
 * @param {string} endpoint - API endpoint URL
 * @returns {Promise<Array|Object>} - Content data or error object
 */
export default async function content(endpoint) => { /* ... */ }
```

**Usage:**
```javascript
import content from '$lib/api';

// Fetch all posts
const posts = await content('/api/posts?populate=*');

// Fetch specific post
const post = await content('/api/posts/1?populate=*');

// Handle errors
const result = await content('/api/posts');
if (result.error) {
  console.error('Failed to fetch:', result.error);
}
```

#### Category API (`category.js`)

```javascript
/**
 * Fetch category data from endpoint
 * @param {string} endpoint - Category API endpoint
 * @returns {Promise<Object>} - First category object or error
 */
export async function categoryAPI(endpoint) => { /* ... */ }
```

**Usage:**
```javascript
import { categoryAPI } from '$lib/api';

const category = await categoryAPI('/api/categories?filters[slug][$eq]=tech');
```

### UI Components

#### General Components (`/front/src/lib/components/general/`)

##### Image Component
```svelte
<!-- Image.svelte -->
<script>
  export let src;          // Image source URL
  export let alt;          // Alt text
  export let width = null; // Optional width
  export let height = null;// Optional height
  export let loading = 'lazy'; // Loading strategy
</script>

<img {src} {alt} {width} {height} {loading} />
```

**Usage:**
```svelte
<script>
  import Image from '$lib/components/general/Image.svelte';
</script>

<Image 
  src="/images/hero.jpg" 
  alt="Hero image" 
  width={800} 
  height={400} 
/>
```

##### Links Component
```svelte
<!-- Links.svelte -->
<script>
  export let links = [];   // Array of link objects
  export let external = false; // Open in new tab
</script>
```

**Usage:**
```svelte
<script>
  import Links from '$lib/components/general/Links.svelte';
  
  const socialLinks = [
    { url: 'https://github.com/dgrebb', text: 'GitHub' },
    { url: 'https://linkedin.com/in/dgrebb', text: 'LinkedIn' }
  ];
</script>

<Links links={socialLinks} external={true} />
```

##### Loader Components
```svelte
<!-- Loader.svelte - Animated loading indicator -->
<script>
  export let size = 'medium'; // 'small', 'medium', 'large'
  export let color = 'primary'; // Color theme
</script>

<!-- Loading.svelte - Simple loading text -->
<script>
  export let text = 'Loading...';
</script>
```

##### Meta Components

```svelte
<!-- Meta.svelte - Basic meta tags -->
<script>
  export let title;
  export let description;
  export let canonical;
</script>

<!-- MetaTags.svelte - Comprehensive SEO meta tags -->
<script>
  export let title;
  export let description;
  export let canonical;
  export let ogTitle;
  export let ogDescription;
  export let ogImage;
  export let twitterCard = 'summary_large_image';
</script>
```

**Usage:**
```svelte
<script>
  import { MetaTags } from '$lib/components/general/MetaTags.svelte';
</script>

<MetaTags 
  title="Page Title"
  description="Page description for SEO"
  canonical="https://www.dgrebb.com/page"
  ogImage="/images/og-image.jpg"
/>
```

##### Navigation Components

```svelte
<!-- NavToggle.svelte - Mobile navigation toggle -->
<script>
  export let isOpen = false;
  export let toggleFunction;
</script>

<!-- Popover.svelte - Contextual popup content -->
<script>
  export let trigger;      // Trigger element selector
  export let content;      // Popover content
  export let position = 'bottom'; // Position relative to trigger
</script>
```

##### Transition Components

```svelte
<!-- PageTransition.svelte - Page transition effects -->
<script>
  export let duration = 300;
  export let easing = 'ease-out';
</script>

<!-- TransitionElasticFly.svelte - Elastic fly animation -->
<script>
  export let y = 200;
  export let duration = 600;
  export let elasticity = 0.5;
</script>

<!-- TransitionFade.svelte - Fade in/out animation -->
<script>
  export let duration = 300;
  export let delay = 0;
</script>
```

#### Content Components

##### Posts Components (`/front/src/lib/components/posts/`)

```svelte
<!-- Post.svelte - Individual post display -->
<script>
  export let post;         // Post data object
  export let showHero = true; // Show hero image
  export let showMeta = true; // Show metadata
</script>

<!-- PostHero.svelte - Post hero image -->
<script>
  export let hero;         // Hero image data
  export let title;        // Post title
  export let position = 'center center'; // Image position
</script>

<!-- PostsGrid.svelte - Grid layout for posts -->
<script>
  export let posts = [];   // Array of post objects
  export let columns = 3;  // Grid columns
</script>

<!-- PostsGridItem.svelte - Individual grid item -->
<script>
  export let post;         // Post data
  export let showSummary = true;
</script>

<!-- TableOfContents.svelte - TOC for posts -->
<script>
  export let headings = []; // Array of heading objects
  export let activeId = ''; // Currently active heading
</script>
```

**Usage:**
```svelte
<script>
  import { Post, PostsGrid } from '$lib/components/posts';
  
  export let data; // From page load function
</script>

<!-- Display single post -->
<Post post={data.post} />

<!-- Display posts grid -->
<PostsGrid posts={data.posts} columns={2} />
```

##### CV Components (`/front/src/lib/components/cv/`)

```svelte
<!-- Timeline.svelte - Experience timeline -->
<script>
  export let experiences = []; // Experience data
  export let orientation = 'vertical'; // Layout orientation
</script>

<!-- Skill.svelte - Skill display component -->
<script>
  export let skill;        // Skill data object
  export let showLevel = true; // Show proficiency level
  export let showCategory = true; // Show skill category
</script>

<!-- Project.svelte - Project showcase -->
<script>
  export let project;      // Project data
  export let showTech = true; // Show technologies used
  export let showLinks = true; // Show project links
</script>

<!-- Experience.svelte - Work experience item -->
<script>
  export let experience;   // Experience data
  export let showDuration = true;
  export let showDescription = true;
</script>
```

### Layout Components

#### Page Navigation (`/front/src/lib/components/general/PageNav/`)

The PageNav component provides pagination functionality:

```svelte
<!-- Usage in a posts listing page -->
<script>
  import PageNav from '$lib/components/general/PageNav/PageNav.svelte';
  
  export let currentPage = 1;
  export let totalPages = 10;
  export let baseUrl = '/posts';
</script>

<PageNav 
  {currentPage} 
  {totalPages} 
  {baseUrl}
  showFirstLast={true}
  showPrevNext={true}
/>
```

### Constants & Configuration

#### Application Constants (`/front/src/lib/CONSTANTS.js`)

```javascript
export const URIS = {
  cdn: 'https://s.dgrebb.com',      // CDN endpoint
  www: 'https://www.dgrebb.com',    // Production URL
  stg: 'https://stg.dgrebb.com',    // Staging URL
  math: 'https://p.dgrebb.com',     // Analytics URL
};

export const PATHS = {
  one: {
    post: '/post',                   // Single post path
    category: '/posts/category',     // Category path
    experience: '/cv/experience',    // Experience path
    // ... other single item paths
  },
  many: {
    posts: '/posts',                 // Posts listing
    categories: '/posts/category',   // Categories listing
    experiences: '/cv/experiences',  // Experiences listing
    // ... other collection paths
  },
  landing: {
    home: '/',                       // Homepage
    cv: '/cv',                       // CV page
    privacy: '/privacy',             // Privacy policy
    rss: '/RSS.xml',                 // RSS feed
    fof: '/404',                     // 404 page
  },
};
```

**Usage:**
```javascript
import { URIS, PATHS } from '$lib/CONSTANTS';

// Build URLs
const cdnImage = `${URIS.cdn}/images/hero.jpg`;
const postUrl = `${PATHS.one.post}/${slug}`;
```

#### API Constants (`/front/src/lib/api/CONSTANTS.js`)

```javascript
export const OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  // Add authentication headers as needed
};
```

## Usage Examples

### Fetching and Displaying Posts

```svelte
<!-- routes/posts/+page.svelte -->
<script>
  import { PostsGrid, MetaTags } from '$lib/components';
  import { PATHS } from '$lib/CONSTANTS';
  
  export let data;
</script>

<MetaTags 
  title="Blog Posts"
  description="Latest blog posts and articles"
  canonical="{PATHS.many.posts}"
/>

<main>
  <h1>Latest Posts</h1>
  <PostsGrid posts={data.posts} />
</main>
```

```javascript
// routes/posts/+page.server.js
import content from '$lib/api';

export async function load() {
  const posts = await content('/api/posts?populate=*&sort=publishedAt:desc');
  
  return {
    posts: posts.error ? [] : posts
  };
}
```

### Creating a Custom Component

```svelte
<!-- lib/components/custom/FeatureCard.svelte -->
<script>
  import { Image, Links } from '$lib/components/general';
  
  export let title;
  export let description;
  export let image;
  export let links = [];
  export let variant = 'default'; // 'default', 'highlighted', 'minimal'
</script>

<article class="feature-card feature-card--{variant}">
  {#if image}
    <div class="feature-card__image">
      <Image src={image.url} alt={image.alt || title} />
    </div>
  {/if}
  
  <div class="feature-card__content">
    <h3 class="feature-card__title">{title}</h3>
    <p class="feature-card__description">{description}</p>
    
    {#if links.length > 0}
      <div class="feature-card__links">
        <Links {links} external={true} />
      </div>
    {/if}
  </div>
</article>

<style>
  .feature-card {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: transform 0.2s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-2px);
  }
  
  .feature-card--highlighted {
    border-color: var(--color-primary);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .feature-card__content {
    padding: 1rem;
  }
  
  .feature-card__title {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .feature-card__description {
    margin: 0 0 1rem 0;
    color: var(--color-text-secondary);
  }
</style>
```

### Advanced API Usage with Error Handling

```javascript
// lib/api/enhanced-content.js
import content from './content.js';

/**
 * Enhanced content fetcher with caching and retry logic
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} - Enhanced response with metadata
 */
export async function enhancedContent(endpoint, options = {}) {
  const {
    cache = true,
    retries = 3,
    timeout = 5000,
    transform = null
  } = options;
  
  // Cache key for client-side caching
  const cacheKey = `content_${btoa(endpoint)}`;
  
  // Check cache first
  if (cache && typeof window !== 'undefined') {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < 300000) { // 5 minutes
          return { data: data.content, cached: true };
        }
      } catch (e) {
        sessionStorage.removeItem(cacheKey);
      }
    }
  }
  
  // Retry logic
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await Promise.race([
        content(endpoint),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        )
      ]);
      
      if (result.error) {
        if (attempt === retries) {
          throw new Error(result.error.message || 'API Error');
        }
        continue;
      }
      
      // Transform data if function provided
      const transformedData = transform ? transform(result) : result;
      
      // Cache successful result
      if (cache && typeof window !== 'undefined') {
        sessionStorage.setItem(cacheKey, JSON.stringify({
          content: transformedData,
          timestamp: Date.now()
        }));
      }
      
      return { 
        data: transformedData, 
        cached: false,
        attempt 
      };
      
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}
```

**Usage:**
```javascript
import { enhancedContent } from '$lib/api/enhanced-content.js';

// Basic usage
const { data: posts } = await enhancedContent('/api/posts?populate=*');

// With transformation
const { data: postsWithUrls } = await enhancedContent('/api/posts?populate=*', {
  transform: (posts) => posts.map(post => ({
    ...post,
    url: `/post/${post.slug}`
  }))
});

// With custom options
const { data: categories, cached } = await enhancedContent('/api/categories', {
  cache: true,
  retries: 5,
  timeout: 10000
});
```

### Form Handling Example

```svelte
<!-- lib/components/forms/ContactForm.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let formData = {
    name: '',
    email: '',
    message: ''
  };
  
  let errors = {};
  let isSubmitting = false;
  let isSuccess = false;
  
  function validateForm() {
    errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  async function handleSubmit() {
    if (!validateForm()) return;
    
    isSubmitting = true;
    
    try {
      // This would typically post to your backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        isSuccess = true;
        formData = { name: '', email: '', message: '' };
        dispatch('success', { message: 'Form submitted successfully' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      dispatch('error', { message: error.message });
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="contact-form">
  <div class="field">
    <label for="name">Name</label>
    <input 
      id="name"
      type="text" 
      bind:value={formData.name}
      class:error={errors.name}
      disabled={isSubmitting}
    />
    {#if errors.name}
      <span class="error-message">{errors.name}</span>
    {/if}
  </div>
  
  <div class="field">
    <label for="email">Email</label>
    <input 
      id="email"
      type="email" 
      bind:value={formData.email}
      class:error={errors.email}
      disabled={isSubmitting}
    />
    {#if errors.email}
      <span class="error-message">{errors.email}</span>
    {/if}
  </div>
  
  <div class="field">
    <label for="message">Message</label>
    <textarea 
      id="message"
      bind:value={formData.message}
      class:error={errors.message}
      disabled={isSubmitting}
      rows="5"
    ></textarea>
    {#if errors.message}
      <span class="error-message">{errors.message}</span>
    {/if}
  </div>
  
  <button 
    type="submit" 
    disabled={isSubmitting}
    class="submit-button"
  >
    {#if isSubmitting}
      Submitting...
    {:else}
      Send Message
    {/if}
  </button>
  
  {#if isSuccess}
    <div class="success-message">
      Thank you! Your message has been sent.
    </div>
  {/if}
</form>

<style>
  .contact-form {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .field {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-family: inherit;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: var(--color-primary);
  }
  
  .error {
    border-color: var(--color-error);
  }
  
  .error-message {
    display: block;
    color: var(--color-error);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .submit-button {
    width: 100%;
    padding: 1rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .submit-button:hover:not(:disabled) {
    background: var(--color-primary-dark);
  }
  
  .submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .success-message {
    margin-top: 1rem;
    padding: 1rem;
    background: var(--color-success-bg);
    color: var(--color-success);
    border-radius: 4px;
    text-align: center;
  }
</style>
```

This comprehensive documentation covers all major public APIs, components, and functions in the dgrebb.com codebase. The examples demonstrate real-world usage patterns and best practices for extending the application.