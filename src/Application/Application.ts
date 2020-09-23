#!/usr/bin/env node

import * as Requirement from '../Requirement';
import * as Implementation from '../Implementation';
import { TraceLink, Configuration } from '../Shared/types';

export const main = async (configuration: Configuration) => {
    // Gather Requirements and Implementations
    const requirements = Requirement.list(configuration.requirement);

    // Update Requirements
    requirements.forEach(async requirement => {
        const implementations = await Implementation.listWithRequirement(configuration.implementation, requirement.id);
        const traceLinks: TraceLink[] = implementations.map(implementation => ({
            origin: requirement,
            destination: implementation,
        }));

        Requirement.update(requirement, traceLinks);
    });
};
