import { ImplementationAnnotation } from '../../Shared/types';
import { sliceBetween } from '../../Shared/String';

/**
 * Extract the description from a raw annotation
 * @param lineWithAnnotation The raw annotation
 * @requirement #[ Implementation/Annotation ]# #( The description is delimited by #( )#
 */
const extractDescription = (lineWithAnnotation: string) => sliceBetween(lineWithAnnotation, '#(', ')#').trim();

/**
 * Extract requirement identifiers from a raw annotation
 * @param lineWithAnnotation The raw annotatoin
 * @requirement #[ Implementation/Annotation ]# #( Requirement identifiers are delimited by #[ )#
 * @requirement #[ Implementation/Annotation ]# #( Multiple requirement identifiers are listed in a comma separated list )#
 */
const extractRequirements = (lineWithAnnotation: string) => sliceBetween(lineWithAnnotation, '#[', ']#')
    .split(',')
    .map(token => token.trim());

/**
 * Process the unprocessed annotation string
 * @param lineWithAnnotation A string with an annotation
 */
export const process = (lineWithAnnotation: string): ImplementationAnnotation => ({
    description: extractDescription(lineWithAnnotation),
    requirements: extractRequirements(lineWithAnnotation),
});
