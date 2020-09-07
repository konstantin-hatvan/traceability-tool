#!/usr/bin/env node

import { cosmiconfigSync } from 'cosmiconfig';
import { Configuration } from './Shared/types';
import * as Application from './Application';
import merge from 'lodash.merge';

const explorer = cosmiconfigSync('tracey');
const result = <Configuration>explorer.search()?.config;

const defaultConfiguration: Configuration = {
    implementation: {
        startingpoint: '.',
        annotation: '@requirement', /** @requirement [ Implementation/Annotation ] ( The annotation uses a default property ) */
        excludes: [],
    },
    requirement: {
        excludes: [], /** @requirement [ Requirement/Collector ] ( Requirements can be excluded in the configuration ) */
        startingpoint: '.' /** @requirement [ Requirement/Collector ] ( Requirements will be collected from the file system starting at the configured startingpoint ) */
    },
};

/** @requirement [ Implementation/Annotation ] ( The annotation property is configurable ) */
const configuration: Configuration = merge(defaultConfiguration, result);

Application.main(configuration).then(() => {
    console.log('Process finished');
});
