#!/usr/bin/env node

import { Configuration } from './Shared/types';
import { Service as TraceLinkService } from './TraceLink';
import { Mutations as RequirementMutations, Service as RequirementService } from './Requirement'
import merge from 'lodash.merge';
import * as path from 'path';

/**
 * Merge the user configuration with the default configuration
 */
const loadConfiguration = () => {
    const result = require(path.resolve(process.cwd(), 'tracey.config.js'));

    const defaultConfiguration: Configuration = {
        tracelink: {
            excludes: [],
            startingpoints: [
                '.',
            ],
        },
        requirement: {
            excludes: [],
            startingpoints: [
                '.',
            ],
        },
    };

    return merge(defaultConfiguration, result);
}

/**
 * Run the program
 * @param configuration The configuratio
 */
const main = async (configuration: Configuration) => {
    const requirements = RequirementService.list(configuration.requirement);
    const traceLinks = await TraceLinkService.list(configuration.tracelink, requirements);

    requirements.forEach(requirement => {
        const linkedTraceLinks = traceLinks.filter(traceLink => traceLink.destination === requirement);
        const updatedRequirement = RequirementMutations.updateTraceLinks(requirement, linkedTraceLinks);
        RequirementService.persist(updatedRequirement);
    });
};

main(loadConfiguration()).then(() => {
    console.log('Process finished');
});
