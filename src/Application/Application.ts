#!/usr/bin/env node

import * as Requirement from '../Requirement';
import * as Implementation from '../Implementation';
import { TraceLink, Configuration } from '../Shared/types';
import { getIncidentLinks } from '../Trace';

export const main = async (configuration: Configuration) => {
    // Gather Requirements and Implementations
    const requirements = Requirement.list(configuration.requirement);
    const implementations = await Implementation.list(configuration.implementation);

    // Build Traceability Graph
    const locations = [...requirements, ...implementations];
    const links: TraceLink[] = requirements.flatMap(requirement => implementations.flatMap(implementation => implementation.requirement === requirement.id ? [{ origin: requirement, destination: implementation }] : []));
    const graph = { locations, links };

    // Update Requirements
    requirements.forEach(requirement => {
        const traceLinks = getIncidentLinks(graph, requirement);
        Requirement.update(requirement, traceLinks);
    });

    // Generate overview
    // Requirement.Overview.generate(requirements, configuration.requirement);
};
