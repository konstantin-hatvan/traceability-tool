import { ImplementationAnnotation } from "../../Shared/types";
import { sliceBetween, unWrap } from "../../Shared/String";

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
 * Process the unprocessed description string
 * @param rawDescription The unprocessed description string
 */
const processDescription = (rawDescription: string): string => unWrap(rawDescription).trim();

/**
 * Process the unprocessed requirements string
 * @param rawRequirements The unprocessed requirements string
 */
const processRequirements = (rawRequirements: string): string[] => unWrap(rawRequirements).split(',').map(requirement => requirement.trim());

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
export const process = (lineWithAnnotation: string): ImplementationAnnotation => processProperties(splitProperties(lineWithAnnotation));
