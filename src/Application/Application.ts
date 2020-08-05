import { Link } from 'mdast';
import { createLink, createTable, createTableCell, createTableRow, createTraceyBlock } from '../Markdown/Markdown';
import * as Requirement from '../Requirement';
import * as Implementation from '../Implementation';
import { Requirement as RequirementType, TraceabilityGraph, TraceabilityLink, Configuration } from '../Shared/types';
import { getIncidentLinks, getLocationsByType } from '../Traceability/TraceabilityGraph';
import { toRelativeLink } from '../Traceability/TraceabilityLink';

export const updateRequirements = (graph: TraceabilityGraph) => {
    // Get all requirements
    let requirements = <RequirementType[]>getLocationsByType(graph, 'requirement');

    // Group Traceability Links by requirement
    const groupedRequirements = requirements.map(requirement => {
        const traceabilityLinks = getIncidentLinks(graph, requirement);
        return {
            requirement,
            traceabilityLinks,
        };
    });

    // Transform Traceability Links into Markdown Table AST
    return groupedRequirements.map(({ requirement, traceabilityLinks }): RequirementType => {
        const links: Link[] = traceabilityLinks.reduce((result: Link[], link: TraceabilityLink) => {
            const relativeLink = toRelativeLink(link);
            const linkContent = link.destination.file;
            const linkNode = createLink(linkContent, relativeLink);

            return [
                ...result,
                linkNode,
            ]
        }, []);

        const tableCells = links.map(createTableCell);
        const tableRows = tableCells.map(createTableRow);
        const table = createTable(tableRows);
        const traceabilityInformation = createTraceyBlock(table);

        // Update Requirement AST and add traceability information
        return Requirement.update(requirement, traceabilityInformation);
    });
};

const main = async (configuration: Configuration) => {
    // Gather Requirements and Implementations
    const requirements = Requirement.list(configuration.requirement.startingpoint);
    const implementations = await Implementation.list(configuration.implementation.startingpoint);

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
        const updatedRequirement = Requirement.update(requirement, traceabilityInformation);

        // Write Requirements
        Requirement.save(updatedRequirement);
    })
};
