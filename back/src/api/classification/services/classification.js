'use strict';

/**
 * classification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::classification.classification');
