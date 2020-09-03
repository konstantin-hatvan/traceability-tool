#!/usr/bin/env node

import { cosmiconfigSync } from 'cosmiconfig';
import { createTraceyBlock } from "../Markdown/Tracey";
import * as Requirement from '../Requirement';
import * as Implementation from '../Implementation';
import { TraceabilityLink, Configuration } from '../Shared/types';
import { getIncidentLinks } from '../Traceability/TraceabilityGraph';

const main = async (configuration: Configuration) => {
    // Gather Requirements and Implementations
    const requirements = Requirement.list(configuration.requirement);
    const implementations = await Implementation.list(configuration.implementation);

    // Build Traceability Graph
    const locations = [...requirements, ...implementations];
    const links: TraceabilityLink[] = requirements.flatMap(requirement => implementations.flatMap(implementation => implementation.requirement === requirement.id ? [{ origin: requirement, destination: implementation }] : []));
    const graph = { locations, links };

    // Update Requirements
    requirements.forEach(requirement => {
        const traceabilityLinks = getIncidentLinks(graph, requirement);
        const traceyBlock = createTraceyBlock(traceabilityLinks);
        Requirement.update(requirement, traceyBlock);
    })
};

const explorer = cosmiconfigSync('tracey');
const result = <Configuration>explorer.search()?.config;

main(result).then(() => {
    console.log('Process finished');
});
