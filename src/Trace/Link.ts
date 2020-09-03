import path from 'path';
import { TraceLink, TraceLocation } from '../Shared/types';

/**
 * @requirement TraceLink
 */
export const toRelativeLink = (traceabilityLink: TraceLink): string => {
    const relativeLink = path.relative(path.parse(traceabilityLink.origin.file).dir, traceabilityLink.destination.file);
    const lineNumber = traceabilityLink.destination.line;

    return `${relativeLink}#L${lineNumber}`;
};

export const getEndpoints = (traceabilityLink: TraceLink): TraceLocation[] => ([traceabilityLink.origin, traceabilityLink.destination]);
