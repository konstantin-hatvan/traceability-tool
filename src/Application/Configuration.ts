import { Configuration } from '../types';
import merge from 'lodash.merge';
import * as path from 'path';

/**
 * Merge the user configuration with the default configuration
 */
export const getConfiguration = () => {
    const result = require(path.resolve('tracey.config.js'));

    const defaultConfiguration: Configuration = {
        annotation: {
            excludes: [],
            startingpoints: [
                '**',
            ],
        },
        requirement: {
            excludes: [],
            startingpoints: [
                '**',
            ],
        },
        plugins: [],
    };

    return merge(defaultConfiguration, result);
}
