/**
 * @requirement ImplementationCollector
 */

import fs from 'fs';
import { constants } from '../Shared/constants';
import readdirRecursive from '../Shared/readdirRecursive';

/**
 * Check if the provided file has a requirement annotation
 * @param file The file name
 */
const hasRequirementAnnotation = (file: string): boolean => {
    const content = fs.readFileSync(file);
    return content.indexOf(constants.requirement.annotation) >= 0;
};

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 */
const isNotExcluded = (file: string, excludes: string[]) => excludes
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
const shouldCollect = (excludes: string[]) => (file: string) => rules.every(rule => rule(file, excludes));

export const collect = (startingpoint: string, excludes: string[]): string[] => readdirRecursive(startingpoint).filter(shouldCollect(excludes));
