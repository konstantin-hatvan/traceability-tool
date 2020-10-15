import * as path from 'path';
import { TraceLink } from './types';

/**
 * Generate a relative link between two files
 * @param traceLink A tracelink
 */
const generateRelativeLink = (traceLink: TraceLink): string => {
    return path.relative(path.parse(traceLink.destination.file).dir, traceLink.annotation.file);
}

/**
 * Generate a relative link with a line number
 * @param traceLink A tracelink
 * @requirement #[ Requirement.TraceTable ]# #( Tracelinks are transformed to relative links that contain a line number )#
 */
export const toRelativeLink = (traceLink: TraceLink): string => `${generateRelativeLink(traceLink)}#L${traceLink.annotation.line}`;
