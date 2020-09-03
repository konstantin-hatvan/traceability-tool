#!/usr/bin/env node

import { cosmiconfigSync } from 'cosmiconfig';
import { Configuration } from './Shared/types';
import * as Application from './Application';

const explorer = cosmiconfigSync('tracey');
const result = <Configuration>explorer.search()?.config;

Application.main(result).then(() => {
    console.log('Process finished');
})
