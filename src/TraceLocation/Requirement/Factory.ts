import * as fs from 'fs';
import { Requirement } from '../types';
import { parse, parseFrontmatter } from './Markdown';

export const create = (file: string): Requirement => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    const { id } = parseFrontmatter(ast);

    return {
        type: 'requirement',
        file,
        id,
        ast,
    };
};
