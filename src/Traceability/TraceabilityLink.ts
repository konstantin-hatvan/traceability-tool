import path from 'path';
import { TraceabilityLink, TraceabilityLocation } from '../Shared/types';

export const toRelativeLink = (traceabilityLink: TraceabilityLink): string => {
    const relativeLink = path.relative(traceabilityLink.origin.file, traceabilityLink.destination.file);
    const lineNumber = traceabilityLink.destination.line;
    const file = traceabilityLink.destination.file;

    return `${relativeLink}#L${lineNumber}`;
};

export const getEndpoints = (traceabilityLink: TraceabilityLink): TraceabilityLocation[] => ([traceabilityLink.origin, traceabilityLink.destination]);
