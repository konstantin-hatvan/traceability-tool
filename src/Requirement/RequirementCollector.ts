/**
 * @requirement RequirementCollector
 */

import path from 'path';
import readdirRecursive from '../Shared/readdirRecursive';

/**
 * Check if the provided file is a markdown file
 * @param file The file name
 */
const isMarkdownFile = (file: string): boolean => path.parse(file).ext === '.md';

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 */
const isNotExcluded = (file: string, excludes: string[]): boolean => excludes
    .map(exclude => new RegExp(exclude))
    .every(exclude => !exclude.test(file));

/**
 * Collection of all rules that have to be passed
 */
const rules = [
    isMarkdownFile,
    isNotExcluded,
];

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (excludes: string[]) => (file: string) => rules.every(rule => rule(file, excludes));

/**
 * Collect requirement files
 * @param startingpoint The directory startingpoint
 * @param excludes A collection of regular expressions to exclude
 */
export const collect = (startingpoint: string, excludes: string[]): string[] => readdirRecursive(startingpoint).filter(shouldCollect(excludes));
