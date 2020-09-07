import readdirRecursive from '../../Shared/readdirRecursive';
import { RequirementConfiguration } from '../../Shared/types';
import { isMarkdownFile, isNotExcluded, hasFrontmatterIdentifier } from './Conditions';

/**
 * Collection of all rules that have to be passed
 */
const rules = [
    isMarkdownFile, /** @requirement [ Requirement/Collector ] ( Requirements must be Markdown files ) */
    isNotExcluded, /** @requirement [ Requirement/Collector ] ( Requirements must not be excluded ) */
    hasFrontmatterIdentifier, /** @requirement [ Requirement/Collector ] ( Requirements must have a frontmatter identifier ) */
];

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (configuration: RequirementConfiguration) => (file: string) => rules.every(rule => rule(file, configuration));

/**
 * Collect requirement files
 * @param configuration The configuration object
 * @requirement [ Requirement/Collector ] ( Requirements will be collected from the file system starting at the configured startingpoint )
 */
export const collect = (configuration: RequirementConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
