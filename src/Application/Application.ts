#!/usr/bin/env node

import * as Requirement from 'Requirement';
import * as Implementation from 'Implementation';
import { TraceLink, Configuration } from '../Shared/types';

export const main = async (configuration: Configuration) => {
    // Gather Requirements and Implementations
    const requirements = Requirement.list(configuration.requirement);
    const implementations = await Implementation.list(configuration.implementation);

    // Update Requirements
    requirements.forEach(async requirement => {
        const linkedImplementations = implementations.filter(implementation => implementation.requirement === requirement.id);
        const traceLinks: TraceLink[] = linkedImplementations.map(implementation => ({
            origin: requirement,
            destination: implementation,
        }));

        Requirement.update(requirement, traceLinks);
    });
};
