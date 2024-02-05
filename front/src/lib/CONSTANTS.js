export const URIS = {
  cdn: 'https://s.dgrebb.com',
  www: 'https://www.dgrebb.com',
  stg: 'https://stg.dgrebb.com',
  math: 'https://p.dgrebb.com',
};

export const PATHS = {
  one: {
    post: '/post',
    category: '/posts/category',
    experience: '/cv/experience',
    skill: '/cv/skill',
    organization: '/cv/organization',
    project: '/cv/project',
    industry: '/cv/industry',
    award: '/cv/award',
    certification: '/cv/certification',
    classification: '/cv/classification',
  },
  many: {
    posts: '/posts',
    categories: '/posts/category',
    experiences: '/cv/experiences',
    skills: '/cv/skills',
    organizations: '/cv/organizations',
    projects: '/cv/projects',
    certifications: '/cv/certifications',
    classifications: '/cv/classifications',
  },
  landing: {
    home: '/',
    cv: '/cv',
    experiences: '/cv/experiences',
    categories: '/posts/category',
    privacy: '/privacy',
    rss: '/RSS.xml',
    fof: '/404',
  },
};

export default {
  URIS,
  PATHS,
};
