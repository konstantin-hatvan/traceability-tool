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
        annotation: '@requirement',
        excludes: [],
    },
    requirement: {
        excludes: [],
        startingpoint: '.'
    },
};

const configuration: Configuration = merge(defaultConfiguration, result);

Application.main(configuration).then(() => {
    console.log('Process finished');
});
