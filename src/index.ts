#!/usr/bin/env node

import * as Application from './Application';

Application.run().then(() => {
    console.log('Process finished');
});
