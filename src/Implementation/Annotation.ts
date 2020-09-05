/**
 * @requirement [ImplementationAnnotation] (Implement annotation requirements)
 */

import { ImplementationAnnotation } from "../Shared/types";

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
const preprocess = (preprocessors: StringAnnotationTransformer[]) => (lineWithAnnotation: string, annotation: string): string => preprocessors.reduce((result, preprocessor) => preprocessor(result, annotation), lineWithAnnotation);

/**
 * Slice a substring in between begin and end characters
 * @param str A string
 * @param begin The starting character
 * @param end The end character
 */
const sliceBetween = (str: string, begin: string, end: string): string => str.slice(str.indexOf(begin), str.indexOf(end))

/**
 * Split the provided line into properties
 * @param lineWithAnnotation A string with an annotation
 */
const splitProperties = (lineWithAnnotation: string) => {
    const descriptionData = sliceBetween(lineWithAnnotation, '(', ')');
    const requirementsData = sliceBetween(lineWithAnnotation, '[', ']');

    return {
        descriptionData,
        requirementsData,
    };
};

/**
 * Remove delimitors of a wrapped string
 * @param wrappedString A string wrapped with delimitors
 */
const removeWrapper = (wrappedString: string): string => wrappedString.slice(1, wrappedString.length);

/**
 * Process the unprocessed description string
 * @param rawDescription The unprocessed description string
 */
const processDescription = (rawDescription: string): string => removeWrapper(rawDescription).trim();

/**
 * Process the unprocessed requirements string
 * @param rawRequirements The unprocessed requirements string
 */
const processRequirements = (rawRequirements: string): string[] => removeWrapper(rawRequirements).split(',').map(requirement => requirement.trim());

/**
 * Process the unprocessed annotation properties
 */
const processProperties = ({ descriptionData, requirementsData }: { descriptionData: string, requirementsData: string }): ImplementationAnnotation => {
    const description = processDescription(descriptionData);
    const requirements = processRequirements(requirementsData);

    return {
        description,
        requirements,
    };
};

/**
 * Process the unprocessed annotation string
 * @param lineWithAnnotation A string with an annotation
 */
const process = (lineWithAnnotation: string): ImplementationAnnotation => processProperties(splitProperties(lineWithAnnotation));

/**
 * Parse the provided annotation string into its properties
 * @param lineWithAnnotation A string with an annotation
 * @param annotation The configured annotation marker
 */
export const parse = (lineWithAnnotation: string, annotation: string): ImplementationAnnotation => {
    const sanitizedLineWithAnnotation = preprocess(preprocessors)(lineWithAnnotation, annotation);
    const { description, requirements } = process(sanitizedLineWithAnnotation);

    return {
        description,
        requirements,
    };
};
