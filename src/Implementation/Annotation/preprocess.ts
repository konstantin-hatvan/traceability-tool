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
 * Preprocess the raw annotation
 * @param lineWithAnnotation The raw annotation
 * @param annotation The configured annotation marker
 * @requirement #[ Implementation/Annotation ]# #( Preprocess the raw annotation )#
 */
export const preprocess = (lineWithAnnotation: string, annotation: string): string => stripAnnotation(stripComment(lineWithAnnotation, annotation), annotation);
