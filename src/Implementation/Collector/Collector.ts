import fs from 'fs';
import readdirRecursive from '../../Shared/readdirRecursive';
import { ImplementationConfiguration } from '../../Shared/types';

interface ImplementationCollectorCondition {
    (file: string, configuration: ImplementationConfiguration): boolean
}

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 * @requirement #[ Implementation/Collector ]# #( Implementation files can be excluded using regular expressions )#
 */
const isNotExcluded: ImplementationCollectorCondition = (file, configuration) => configuration.excludes
    .map(exclude => new RegExp(exclude))
    .every(exclude => !exclude.test(file));

/**
 * Check if the provided file has a requirement annotation
 * @param file The file name
 * @requirement #[ Implementation/Collector ]# #( Implementation files must have a requirement annotation )#
 */
const hasRequirementAnnotation: ImplementationCollectorCondition = (file, configuration) => {
    const content = fs.readFileSync(file);
    return content.indexOf(configuration.annotation) >= 0;
};

const conditions: ImplementationCollectorCondition[] = [
    isNotExcluded,
    hasRequirementAnnotation,
];

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (configuration: ImplementationConfiguration) => (file: string) => conditions.every(condition => condition(file, configuration));

/**
 * Collect implementation files
 * @param configuration The configuration object
 * @requirement #[ Implementation/Collector ]# #( Implementation files will be collected from the file system starting at the configured startingpoint )#
 */
export const collect = (configuration: ImplementationConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
