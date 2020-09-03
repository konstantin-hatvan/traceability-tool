/**
 * @requirement ImplementationCollector
 */

import fs from 'fs';
import readdirRecursive from '../Shared/readdirRecursive';
import { ImplementationConfiguration } from '../Shared/types';

/**
 * Check if the provided file has a requirement annotation
 * @param file The file name
 */
const hasRequirementAnnotation = (file: string, configuration: ImplementationConfiguration): boolean => {
    const content = fs.readFileSync(file);
    return content.indexOf(configuration.annotation) >= 0;
};

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 */
const isNotExcluded = (file: string, configuration: ImplementationConfiguration) => configuration.excludes
    .map(exclude => new RegExp(exclude))
    .every(exclude => !exclude.test(file));

/**
 * Collection of all rules that have to be passed
 */
const rules = [
    hasRequirementAnnotation,
    isNotExcluded,
];

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (configuration: ImplementationConfiguration) => (file: string) => rules.every(rule => rule(file, configuration));

/**
 * Collect implementation files
 * @param startingpoint The directory startingpoint
 * @param excludes A collection of regular expressions to exclude
 */
export const collect = (configuration: ImplementationConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
