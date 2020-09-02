#!/usr/bin/env node

import { cosmiconfigSync } from 'cosmiconfig';
import { createText, createLink, createTable, createTableCell, createTableRow, createTraceyBlock } from '../Markdown/Markdown';
import * as Requirement from '../Requirement';
import * as Implementation from '../Implementation';
import { TraceabilityLink, Configuration } from '../Shared/types';
import { getIncidentLinks } from '../Traceability/TraceabilityGraph';
import { toRelativeLink } from '../Traceability/TraceabilityLink';
import { TableCell } from 'mdast';

const main = async (configuration: Configuration) => {
    // Gather Requirements and Implementations
    const requirements = Requirement.list(configuration.requirement);
    const implementations = await Implementation.list(configuration.implementation);

    // Build Traceability Graph
    const locations = [...requirements, ...implementations];
    const links: TraceabilityLink[] = requirements.flatMap(requirement => implementations.flatMap(implementation => implementation.requirement === requirement.id ? [{ origin: requirement, destination: implementation }] : []));
    const graph = { locations, links };

    requirements.forEach(requirement => {
        // Group Requirements and TraceabilityLinks
        const links = getIncidentLinks(graph, requirement)
            .reduce((result: TableCell[][], link) => ([
                ...result,
                [
                    createTableCell(createLink(link.destination.file, toRelativeLink(link))),
                    createTableCell(createText(link.destination.line.toString())),
                ],
            ]), []);

        const traceabilityInformation = createTraceyBlock(createTable(links.map(createTableRow)));

        // Update Requirements
        Requirement.update(requirement, traceabilityInformation);
    })
};

const explorer = cosmiconfigSync('tracey');
const result = <Configuration>explorer.search()?.config;

main(result).then(() => {
    console.log('Process finished');
});
