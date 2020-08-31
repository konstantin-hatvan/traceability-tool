import { Configuration, TraceabilityLink, TraceabilityLocation, TraceabilityLocationType, TraceabilityGraph, Requirement, Implementation } from '../Shared/types';
import * as Requirements from '../Requirement/Requirement';
import * as Implementations from '../Implementation/Implementation';
import { getEndpoints } from './TraceabilityLink';

export const buildTraceabilityLinks = (requirements: Requirement[], implementations: Implementation[]): TraceabilityLink[] => {
    return requirements.reduce((result: TraceabilityLink[], requirement: Requirement) => {
        const links = implementations
            .filter((implementation: Implementation) => implementation.requirement === requirement.id)
            .map(implementation => ({
                origin: requirement,
                destination: implementation,
            }));

        return [
            ...result,
            ...links,
        ];
    }, []);
};

export const buildGraph = async (configuration: Configuration): Promise<TraceabilityGraph> => {
    const requirements = Requirements.list(configuration.requirement);
    const implementations = await Implementations.list(configuration.implementation);
    const traceabilityLinks = buildTraceabilityLinks(requirements, implementations);
    const traceabilityLocations = [
        ...requirements,
        ...implementations,
    ];

    return {
        locations: traceabilityLocations,
        links: traceabilityLinks,
    };
};

export const create = (locations: TraceabilityLocation[], links: TraceabilityLink[]): TraceabilityGraph => ({
    locations,
    links,
});

export const getLocationsByType = (graph: TraceabilityGraph, type: TraceabilityLocationType): TraceabilityLocation[] => graph.locations.filter(location => location.type === type);

export const getIncidentLinks = (graph: TraceabilityGraph, traceabilityLocation: TraceabilityLocation): TraceabilityLink[] => graph.links.filter(link => getEndpoints(link).indexOf(traceabilityLocation) >= 0);
