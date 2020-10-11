import * as fs from 'fs';
import * as path from 'path';
import { parseFrontmatter, parse } from '../../Markdown';
import { RequirementConfiguration } from '../../Shared/types';
import { createCollector, isNotExcluded } from '../../Collector';
import { CollectorCondition } from '../../Collector/types';

/**
 * Check if the file is MarkDown
 * @param file The file
 */
const isMarkdownFile: CollectorCondition = (file: string): boolean => path.parse(file).ext === '.md';

/**
 * Check if the file has a MarkDown frontmatter identifier
 * @param file The file
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


export const collect = (configuration: RequirementConfiguration): string[] => createCollector([
    isNotExcluded(configuration.excludes), /** @requirement #[ Requirement/Collector ]# #( Requirements must not be excluded )# */
    isMarkdownFile, /** @requirement #[ Requirement/Collector ]# #( Requirements must be markdown files )# */
    hasFrontmatterIdentifier, /** @requirement #[ Requirement/Collector ]# #( Requirements must have a frontmatter identifier )# */
])(configuration.startingpoints);
