'use strict';

/**
 * cv service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cv.cv');
