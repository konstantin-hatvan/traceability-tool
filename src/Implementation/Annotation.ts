/**
 * @requirement [ImplementationAnnotation] (Implement annotation requirements)
 */

import { ImplementationAnnotation } from "../Shared/types";

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

const preprocessors = [
    stripComment,
    stripAnnotation,
];

const preprocess = (lineWithAnnotation: string, annotation: string): string => preprocessors.reduce((result, preprocessor) => preprocessor(result, annotation), lineWithAnnotation);

const sliceBetween = (str: string, begin: string, end: string): string => str.slice(str.indexOf(begin), str.indexOf(end))

const splitProperties = (lineWithAnnotation: string) => {
    const descriptionData = sliceBetween(lineWithAnnotation, '(', ')');
    const requirementsData = sliceBetween(lineWithAnnotation, '[', ']');

    return {
        descriptionData,
        requirementsData,
    };
};

const removeWrapper = (wrappedString: string): string => wrappedString.slice(1, wrappedString.length);

const processDescription = (rawDescription: string): string => removeWrapper(rawDescription).trim();

const processRequirements = (rawRequirements: string): string[] => removeWrapper(rawRequirements).split(',').map(requirement => requirement.trim());

const processProperties = ({ descriptionData, requirementsData }: { descriptionData: string, requirementsData: string }): ImplementationAnnotation => {
    const description = processDescription(descriptionData);
    const requirements = processRequirements(requirementsData);

    return {
        description,
        requirements,
    };
};

const process = (lineWithAnnotation: string): ImplementationAnnotation => processProperties(splitProperties(lineWithAnnotation));

export const parse = (lineWithAnnotation: string, annotation: string): ImplementationAnnotation => {
    const sanitizedLineWithAnnotation = preprocess(lineWithAnnotation, annotation);
    const { description, requirements } = process(sanitizedLineWithAnnotation);

    return {
        description,
        requirements,
    };
};
