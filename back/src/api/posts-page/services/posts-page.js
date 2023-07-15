'use strict';

/**
 * posts-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::posts-page.posts-page');
