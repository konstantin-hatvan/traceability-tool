import fs from 'fs';
import readdirRecursive from '../../Shared/readdirRecursive';
import { requirementAnnotation } from '../../Shared/constants';

/**
 * Check if a file contains a requirement annotation
 * @param location The location of the file
 */
const fileHasRequirementAnnotation = (location: string): boolean => {
    const content = fs.readFileSync(location);
    return content.indexOf(requirementAnnotation) >= 0;
};

/**
 * Collect all implementation files with a requirement annotation within the startingpoint directory
 * @param startingpoint The startingpoint directory for the recursive search
 */
const collect = (startingpoint: string): string[] => {
    return readdirRecursive(startingpoint).filter(fileHasRequirementAnnotation);
};

const ImplementationCollector = {
    collect,
};

export default ImplementationCollector;
