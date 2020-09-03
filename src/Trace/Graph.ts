import { TraceLink, TraceLocation, TraceLocationType, TraceGraph } from '../Shared/types';
import { getEndpoints } from './Link';

export const getLocationsByType = (graph: TraceGraph, type: TraceLocationType): TraceLocation[] => graph.locations.filter(location => location.type === type);

export const getIncidentLinks = (graph: TraceGraph, traceabilityLocation: TraceLocation): TraceLink[] => graph.links.filter(link => getEndpoints(link).indexOf(traceabilityLocation) >= 0);
