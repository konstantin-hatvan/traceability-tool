#!/usr/bin/env node

import { Configuration } from './Shared/types';
import { Service as TraceLinkService } from './TraceLink';
import { Mutations as RequirementMutations, Service as RequirementService } from './Requirement';
import { Service as AnnotationService } from './Annotation';
import merge from 'lodash.merge';
import * as path from 'path';

/**
 * Merge the user configuration with the default configuration
 */
const loadConfiguration = () => {
    const result = require(path.resolve(process.cwd(), 'tracey.config.js'));

    const defaultConfiguration: Configuration = {
        annotation: {
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
 * @param configuration The configuration
 */
const main = async (configuration: Configuration) => {
    const requirements = RequirementService.list(configuration.requirement);
    const annotations = await AnnotationService.list(configuration.annotation);
    const traceLinks = await TraceLinkService.list(requirements, annotations);

    requirements.forEach(requirement => {
        const linkedTraceLinks = traceLinks.filter(traceLink => traceLink.destination === requirement);
        const updatedRequirement = RequirementMutations.updateTraceLinks(requirement, linkedTraceLinks);
        RequirementService.persist(updatedRequirement);
    });
};

main(loadConfiguration()).then(() => {
    console.log('Process finished');
});
