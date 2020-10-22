import * as fs from 'fs';
import * as path from 'path';
import { parseFrontmatter, parse } from './Markdown';
import { CollectorConfiguration } from '../types';
import { createCollector, CollectorCondition } from '../Common/Collector';

/**
 * Check if the file is MarkDown
 * @param file The file
 * @requirement #[ Requirement.Collect ]# #( Requirements must be stored in markdown files )#
 */
const isMarkdownFile: CollectorCondition = (file: string): boolean => path.parse(file).ext === '.md';

/**
 * Check if the file has a MarkDown frontmatter identifier
 * @param file The file
 * @requirement #[ Requirement.Collect ]# #( Requirements must have a unique yaml frontmatter identifier )#
 */
const hasFrontmatterIdentifier: CollectorCondition = (file: string): boolean => {
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

/**
 * Collect all requirement files that pass all conditions
 * @param configuration The configuration
 */
export const collect = (configuration: CollectorConfiguration): string[] => createCollector(configuration, [
    isMarkdownFile, /** @requirement #[ Requirement.Collect ]# #( Requirements must be stored in markdown files )# */
    hasFrontmatterIdentifier, /** @requirement #[ Requirement.Collect ]# #( Requirements must have a unique yaml frontmatter identifier )# */
]);
