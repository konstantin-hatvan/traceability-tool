/** @requirement [ Implementation/Annotation ] ( Preprocess the raw annotation ) */

type StringAnnotationTransformer = (str: string, annotation: string) => string;

/**
 * Remove any characters before the requirement annotation from the given string
 * @param str A string
 */
const stripComment: StringAnnotationTransformer = (str, annotation) => str.substring(str.indexOf(annotation)).trim();

/**
 * Remove the requirement annotation from the given string
 * @param str A string
 */
const stripAnnotation: StringAnnotationTransformer = (str, annotation) => str.substring(annotation.length).trim();

/**
 * Pipeline for preprocessing the annotation
 */
const preprocessors: StringAnnotationTransformer[] = [
    stripComment,
    stripAnnotation,
];

/**
 * Preprocess the annotation
 * @param preprocessors A collection of preprocessors
 */
const pipeline = (preprocessors: StringAnnotationTransformer[]) => (lineWithAnnotation: string, annotation: string): string => preprocessors.reduce((result, preprocessor) => preprocessor(result, annotation), lineWithAnnotation);

const preprocess = pipeline(preprocessors);

export { preprocess };
