import path from 'path';
import { TraceabilityLink, TraceabilityLocation } from '../Shared/types';

/**
 * @requirement TraceLink
 */
export const toRelativeLink = (traceabilityLink: TraceabilityLink): string => {
    const relativeLink = path.relative(path.parse(traceabilityLink.origin.file).dir, traceabilityLink.destination.file);
    const lineNumber = traceabilityLink.destination.line;

    return `${relativeLink}#L${lineNumber}`;
};

export const getEndpoints = (traceabilityLink: TraceabilityLink): TraceabilityLocation[] => ([traceabilityLink.origin, traceabilityLink.destination]);
