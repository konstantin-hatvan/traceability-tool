import fs from 'fs';
import path from 'path';
import readdirRecursive from '../../Shared/readdirRecursive';
import { RequirementConfiguration } from '../../Shared/types';
import { parseFrontmatter, parse } from '../../Markdown';

interface RequirementCollectorCondition {
    (file: string, configuration: RequirementConfiguration): boolean
}

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 * @requirement #[ Requirement/Collector ]# #( Requirements can be excluded using regular expressions )#
 */
const isNotExcluded: RequirementCollectorCondition = (file, configuration) => configuration.excludes
.map(exclude => new RegExp(exclude))
.every(exclude => !exclude.test(file));

/**
 * Check if the provided file is a markdown file
 * @param file The file name
 * @requirement #[ Requirement/Collector ]# #( Requirements must be Markdown files )#
 */
const isMarkdownFile: RequirementCollectorCondition = (file) => path.parse(file).ext === '.md';

/**
 * Check if the provided markdown file has a frontmatter identifier
 * @param file The file name
 * @requirement #[ Requirement/Collector ]# #( Requirements must have a frontmatter identifier )#
 * @requirement #[ Requirement/Collector ]# #( Requirement identifiers must use the key {id} )#
 */
const hasFrontmatterIdentifier: RequirementCollectorCondition = (file) => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    const output = Boolean(parseFrontmatter(ast)?.id);

    if (!output) {
        console.log(`
WARNING: File ${file} has no frontmatter identifier
Fix this warning by adding a frontmatter identifier or excluding the file in the configuration

`);
    }

    return output;
};

const conditions: RequirementCollectorCondition[] = [
    isNotExcluded,
    isMarkdownFile,
    hasFrontmatterIdentifier,
];

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (configuration: RequirementConfiguration) => (file: string) => conditions.every(condition => condition(file, configuration));

/**
 * Collect requirement files
 * @param configuration The configuration object
 * @requirement #[ Requirement/Collector ]# #( Requirements will be collected from the file system starting at the configured startingpoint )#
 */
export const collect = (configuration: RequirementConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
