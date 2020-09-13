import fs from 'fs';
import path from 'path';
import readdirRecursive from '../../Shared/readdirRecursive';
import { RequirementConfiguration } from '../../Shared/types';
import { parseFrontmatter, parse } from '../../Markdown';

/**
 * Check if the provided file is a markdown file
 * @param file The file name
 * @requirement #[ Requirement/Collector ]# #( Requirements must be Markdown files )#
 */
const isMarkdownFile = (file: string): boolean => path.parse(file).ext === '.md';

/**
 * Check if the provided markdown file has a frontmatter identifier
 * @param file The file name
 * @requirement #[ Requirement/Collector ]# #( Requirements must have a frontmatter identifier )#
 * @requirement #[ Requirement/Collector ]# #( Requirement identifiers must use the key {id} )#
 */
const hasFrontmatterIdentifier = (file: string): boolean => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    return Boolean(parseFrontmatter(ast)?.id);
};

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 * @requirement #[ Requirement/Collector ]# #( Requirements can be excluded using regular expressions )#
 */
const isNotExcluded = (file: string, configuration: RequirementConfiguration): boolean => configuration.excludes
.map(exclude => new RegExp(exclude))
.every(exclude => !exclude.test(file));

/**
 * Check if the provided file should be collected
 * @param excludes A collection of regular expressions to exclude
 */
const shouldCollect = (configuration: RequirementConfiguration) => (file: string) => isMarkdownFile(file) && hasFrontmatterIdentifier(file) && isNotExcluded(file, configuration);

/**
 * Collect requirement files
 * @param configuration The configuration object
 * @requirement #[ Requirement/Collector ]# #( Requirements will be collected from the file system starting at the configured startingpoint )#
 */
export const collect = (configuration: RequirementConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration));
