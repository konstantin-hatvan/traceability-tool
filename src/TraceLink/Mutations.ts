import * as path from 'path';
import { TraceLink } from './types';

const generateRelativeLink = (traceLink: TraceLink): string => {
    return path.relative(path.parse(traceLink.destination.file).dir, traceLink.annotation.location.file);
}

const generateRequirementToImplementationLink = (traceLink: TraceLink): string => {
    return `${generateRelativeLink(traceLink)}#L${traceLink.annotation.line}`;
}

export const toRelativeLink = (traceLink: TraceLink): string => {
    let output = '';

    switch (traceLink.annotation.location.type) {
        case 'requirement': {
            output = generateRelativeLink(traceLink);
            break;
        }
        case 'implementation': {
            output = generateRequirementToImplementationLink(traceLink);
            break;
        }
        default: {
            output = generateRelativeLink(traceLink);
            break;
        }
    }

    return output;
};
