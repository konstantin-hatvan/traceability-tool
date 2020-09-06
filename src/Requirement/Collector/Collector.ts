/** @requirement [RequirementCollector] (Implement requirements for collecting requirement files) */
import readdirRecursive from '../../Shared/readdirRecursive';
import { RequirementConfiguration } from '../../Shared/types';
import { isMarkdownFile, isNotExcluded, hasFrontmatterIdentifier } from './Conditions';

/**
 * Collection of all rules that have to be passed
 */
const rules = [
    isMarkdownFile,
    isNotExcluded,
    hasFrontmatterIdentifier,
];

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (configuration: RequirementConfiguration) => (file: string) => rules.every(rule => rule(file, configuration));

/**
 * Collect requirement files
 * @param configuration The configuration object
 */
export const collect = (configuration: RequirementConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
