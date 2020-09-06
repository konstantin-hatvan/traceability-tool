/** @requirement [ImplementationCollector] (Implement requirements for collecting implementation files) */
import readdirRecursive from '../../Shared/readdirRecursive';
import { ImplementationConfiguration } from '../../Shared/types';
import { hasRequirementAnnotation, isNotExcluded } from './Conditions';

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
 * @param configuration The configuration object
 */
export const collect = (configuration: ImplementationConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
