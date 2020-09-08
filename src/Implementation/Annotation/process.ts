import { ImplementationAnnotation } from '../../Shared/types';
import { unWrap, sliceBetween } from '../../Shared/String';

/**
 * Extract the description from a raw annotation
 * @param lineWithAnnotation The raw annotation
 * @requirement [ Implementation/Annotation ] ( The description is listed in round parenthesis )
 */
const extractDescription = (lineWithAnnotation: string) => unWrap(sliceBetween(lineWithAnnotation, '(', ')')).trim();

/**
 * Extract requirement identifiers from a raw annotation
 * @param lineWithAnnotation The raw annotatoin
 * @requirement [ Implementation/Annotation ] ( Requirement identifiers are listed in square brackets )
 */
const extractRequirements = (lineWithAnnotation: string) => unWrap(sliceBetween(lineWithAnnotation, '[', ']'))
    /** @requirement [ Implementation/Annotation ] ( Multiple requirement identifiers are listed in a comma separated list ) */
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
