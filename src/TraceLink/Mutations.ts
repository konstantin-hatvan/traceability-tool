import * as path from 'path';
import { TraceLink } from './types';

/**
 * Generate a relative link between two files
 * @param traceLink A tracelink
 * @requirement #[ Requirement.TraceTable ]# #( Relative links between other files do not contain the line number )#
 */
const generateRelativeLink = (traceLink: TraceLink): string => {
    return path.relative(path.parse(traceLink.destination.file).dir, traceLink.annotation.location.file);
}

/**
 * Generate a relative link between a requirement file and a source file
 * @param traceLink A tracelink
 * @requirement #[ Requirement.TraceTable ]# #( Relative links between requirement files and source files contain the line number )#
 */
const generateRequirementToImplementationLink = (traceLink: TraceLink): string => {
    return `${generateRelativeLink(traceLink)}#L${traceLink.annotation.line}`;
}

/**
 * Generate a relative link
 * @param traceLink A tracelink
 * @requirement #[ Requirement.TraceTable ]# #( Tracelinks are transformed to relative links )#
 */
export const toRelativeLink = (traceLink: TraceLink): string => {
    let output = '';

    switch (traceLink.annotation.location.type) {
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
