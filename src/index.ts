#!/usr/bin/env node

import { Configuration } from './Shared/types';
import { Service as TraceLocationService } from './TraceLocation';
import { Service as TraceLinkService } from './TraceLink';
import { Mutations as RequirementMutations, Service as RequirementService } from './TraceLocation/Requirement'
import { Requirement } from './TraceLocation/types';
import merge from 'lodash.merge';
import * as path from 'path';

/**
 * Merge the user configuration with the default configuration
 */
const loadConfiguration = () => {
    const result = require(path.resolve(process.cwd(), 'tracey.config.js'));

    const defaultConfiguration: Configuration = {
        implementation: {
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
    const traceLocations = TraceLocationService.list(configuration);
    const traceLinks = await TraceLinkService.list(traceLocations);
    const requirements = <Requirement[]>traceLocations.filter(traceLocation => traceLocation.type === 'requirement');

    requirements.forEach(requirement => {
        const linkedTraceLinks = traceLinks.filter(traceLink => traceLink.destination === requirement);
        const updatedRequirement = RequirementMutations.updateTraceLinks(requirement, linkedTraceLinks);
        RequirementService.persist(updatedRequirement);
    });
};

main(loadConfiguration()).then(() => {
    console.log('Process finished');
});
