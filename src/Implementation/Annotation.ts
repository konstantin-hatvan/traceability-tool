/**
 * @requirement ImplementationAnnotation
 */

/**
 * Remove any characters before the requirement annotation from the given string
 * @param str A string
 */
const stripComment = (str: string, annotation: string): string => str.substring(str.indexOf(annotation)).trim();

/**
 * Remove the requirement annotation from the given string
 * @param str A string
 */
const stripAnnotation = (str: string, annotation: string): string => str.substring(annotation.length).trim();

/**
 * Remove any whitespace from the given string
 * @param str A string
 */
const stripWhitespace = (str: string): string => str.replace(/\s*/g, '');

/**
 * A collection of sanitizers to perform on a string
 */
const sanitizers = [
    stripComment,
    stripAnnotation,
    stripWhitespace,
];

/**
 * Sanitize the given string
 * @param lineWithAnnotation A string containing a requirement annotation
 */
const sanitize = (lineWithAnnotation: string, annotation: string): string => sanitizers.reduce((result, sanitizer) => sanitizer(result, annotation), lineWithAnnotation);

/**
 * Parse the given requirement annotation into a list of requirement identifiers
 * @param lineWithAnnotation A string containing a requirement annotation
 */
export const parse = (lineWithAnnotation: string, annotation: string): string[] => sanitize(lineWithAnnotation, annotation).split(',');
