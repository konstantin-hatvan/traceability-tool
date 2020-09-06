import fs from 'fs';
import path from 'path';
import { parseFrontmatter, parse } from '../../Markdown';
import { RequirementConfiguration } from '../../Shared/types';

/**
 * Check if the provided file is a markdown file
 * @param file The file name
 */
export const isMarkdownFile = (file: string, configuration: RequirementConfiguration): boolean => path.parse(file).ext === '.md';

/**
 * Check if the provided file should be excluded
 * @param excludes A collection of regular expressions to exclude
 * @param file The file name
 */
export const isNotExcluded = (file: string, configuration: RequirementConfiguration): boolean => configuration.excludes
    .map(exclude => new RegExp(exclude))
    .every(exclude => !exclude.test(file));

    /**
 * Check if the provided markdown file has a frontmatter identifier
 * @param file The file name
 */
export const hasFrontmatterIdentifier = (file: string, configuration: RequirementConfiguration): boolean => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    return Boolean(parseFrontmatter(ast)?.id);
};
