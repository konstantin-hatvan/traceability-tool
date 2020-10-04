#!/usr/bin/env node

import { Configuration } from './Shared/types';
import * as Application from './Application';
import merge from 'lodash.merge';
import * as path from 'path';

const loadConfiguration = () => {
    const result = require(path.resolve(process.cwd(), 'tracey.config.js'));

    const defaultConfiguration: Configuration = {
        implementation: {
            annotation: '@requirement', /** @requirement #[ Implementation/Annotation ]# #( The annotation uses a default property )# */
            excludes: [], /** @requirement #[ Implementation/Collector ]# #( Implementation files can be excluded in the configuration )# */
            startingpoint: '.', /** @requirement #[ Imlementation/Collector ]# #( Implementation files will be collected from the file system starting at the configured startingpoint )# */
        },
        requirement: {
            excludes: [], /** @requirement #[ Requirement/Collector ]# #( Requirements can be excluded in the configuration )# */
            startingpoint: '.' /** @requirement #[ Requirement/Collector ]# #( Requirements will be collected from the file system starting at the configured startingpoint )# */
        },
    };

    return merge(defaultConfiguration, result);
}

Application.main(loadConfiguration()).then(() => {
    console.log('Process finished');
});
