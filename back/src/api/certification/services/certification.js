'use strict';

/**
 * certification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::certification.certification');
