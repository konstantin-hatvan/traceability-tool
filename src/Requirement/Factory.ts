import * as fs from 'fs';
import { Requirement } from './types';
import { parse, parseFrontmatter } from './Markdown';

/**
 * Create a requirement
 * @param file A file
 */
export const create = (file: string): Requirement => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    const { id } = parseFrontmatter(ast);

    return {
        file,
        id,
        ast,
    };
};
