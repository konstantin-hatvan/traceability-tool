import { cosmiconfigSync } from 'cosmiconfig';
import { Link } from 'mdast';
import { createLink, createTable, createTableCell, createTableRow, createTraceyBlock } from '../Markdown/Markdown';
import * as Requirement from '../Requirement';
import * as Implementation from '../Implementation';
import { TraceabilityLink, Configuration } from '../Shared/types';
import { getIncidentLinks } from '../Traceability/TraceabilityGraph';
import { toRelativeLink } from '../Traceability/TraceabilityLink';

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
            .reduce((result: Link[], link) => ([
                ...result,
                createLink(link.destination.file, toRelativeLink(link)),
            ]), []);

        const traceabilityInformation = createTraceyBlock(createTable(links.map(createTableCell).map(createTableRow)));

        // Update Requirements
        Requirement.update(requirement, traceabilityInformation);
    })
};

const explorer = cosmiconfigSync('tracey');
const result = <Configuration>explorer.search()?.config;

main(result).then(() => {
    console.log('Process finished');
});
