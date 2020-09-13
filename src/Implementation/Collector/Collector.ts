import fs from 'fs';
import readdirRecursive from '../../Shared/readdirRecursive';
import { ImplementationConfiguration } from '../../Shared/types';

/**
 * Check if the provided file has a requirement annotation
 * @param file The file name
 * @requirement #[ Implementation/Collector ]# #( Implementation files must have a requirement annotation )#
 */
const hasRequirementAnnotation = (file: string, configuration: ImplementationConfiguration): boolean => {
    const content = fs.readFileSync(file);
    return content.indexOf(configuration.annotation) >= 0;
};

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 * @requirement #[ Implementation/Collector ]# #( Implementation files can be excluded using regular expressions )#
 */
const isNotExcluded = (file: string, configuration: ImplementationConfiguration) => configuration.excludes
    .map(exclude => new RegExp(exclude))
    .every(exclude => !exclude.test(file));

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (configuration: ImplementationConfiguration) => (file: string) => hasRequirementAnnotation(file, configuration) && isNotExcluded(file, configuration);

/**
 * Collect implementation files
 * @param configuration The configuration object
 * @requirement #[ Implementation/Collector ]# #( Implementation files will be collected from the file system starting at the configured startingpoint )#
 */
export const collect = (configuration: ImplementationConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
