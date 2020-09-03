import { TraceLink, TraceLocation, TraceGraph } from '../Shared/types';
import { getEndpoints } from './Link';

export const getIncidentLinks = (graph: TraceGraph, traceabilityLocation: TraceLocation): TraceLink[] => graph.links.filter(link => getEndpoints(link).indexOf(traceabilityLocation) >= 0);
