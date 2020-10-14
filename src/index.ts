#!/usr/bin/env node

import { Configuration } from './Shared/types';
import { Service as TraceLocationService } from './TraceLocation';
import { Service as TraceLinkService } from './TraceLink';
import { Mutations as RequirementMutations, Service as RequirementService } from './TraceLocation/Requirement'
import { Requirement } from './TraceLocation/types';
import merge from 'lodash.merge';
import * as path from 'path';

const loadConfiguration = () => {
    const result = require(path.resolve(process.cwd(), 'tracey.config.js'));

    const defaultConfiguration: Configuration = {
        implementation: {
            excludes: [], /** @requirement #[ Implementation/Collector ]# #( Implementation files can be excluded in the configuration )# */
            startingpoints: [
                '.', /** @requirement #[ Implementation/Collector ]# #( Implementation files will be collected from the file system starting at the configured startingpoint )# */
            ],
        },
        requirement: {
            excludes: [], /** @requirement #[ Requirement/Collector ]# #( Requirements can be excluded in the configuration )# */
            startingpoints: [
                '.', /** @requirement #[ Requirement/Collector ]# #( Requirements will be collected from the file system starting at the configured startingpoint )# */
            ],
        },
    };

    return merge(defaultConfiguration, result);
}

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
