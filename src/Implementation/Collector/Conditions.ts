import fs from 'fs';
import { ImplementationConfiguration } from '../../Shared/types';

/**
 * Check if the provided file has a requirement annotation
 * @param file The file name
 * @requirement #[ Implementation/Collector ]# #( Implementation files must have a requirement annotation )#
 */
export const hasRequirementAnnotation = (file: string, configuration: ImplementationConfiguration): boolean => {
    const content = fs.readFileSync(file);
    return content.indexOf(configuration.annotation) >= 0;
};

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 * @requirement #[ Implementation/Collector ]# #( Implementation files can be excluded using regular expressions )#
 */
export const isNotExcluded = (file: string, configuration: ImplementationConfiguration) => configuration.excludes
    .map(exclude => new RegExp(exclude))
    .every(exclude => !exclude.test(file));
