'use strict';

/**
 * award service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::award.award');
