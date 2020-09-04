/**
 * @requirement RequirementCollector
 */

import fs from 'fs';
import path from 'path';
import readdirRecursive from '../../Shared/readdirRecursive';
import { parseFrontmatter, parse } from '../../Markdown';
import { RequirementConfiguration } from '../../Shared/types';

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
 * Check if the provided markdown file has a frontmatter identifier
 * @param file The file name
 */
const hasFrontmatterIdentifier = (file: string): boolean => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    return Boolean(parseFrontmatter(ast)?.id);
};

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
const shouldCollect = (excludes: string[]) => (file: string) => rules.every(rule => rule(file, excludes));

/**
 * Collect requirement files
 * @param configuration The configuration object
 */
export const collect = (configuration: RequirementConfiguration): string[] => readdirRecursive(configuration.startingpoint).filter(shouldCollect(configuration.excludes));
