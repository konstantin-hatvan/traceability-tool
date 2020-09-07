/** @requirement [Implementation/Collector] (Implement requirements for collecting implementation files) */
import readdirRecursive from '../../Shared/readdirRecursive';
import { ImplementationConfiguration } from '../../Shared/types';
import { hasRequirementAnnotation, isNotExcluded } from './Conditions';

/**
 * Collection of all rules that have to be passed
 */
const rules = [
    hasRequirementAnnotation, /** @requirement [ Implementation/Collector ] ( Implementation files must have a requirement annotation ) */
    isNotExcluded, /** @requirement [ Implementation/Collector ] ( Implementation files must not be excluded ) */
];

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (configuration: ImplementationConfiguration) => (file: string) => rules.every(rule => rule(file, configuration));

/**
 * Collect implementation files
 * @param configuration The configuration object
 * @requirement [ Implementation/Collector ] ( Implementation files will be collected from the file system starting at the configured startingpoint )
 */
export const collect = (configuration: ImplementationConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
