import fs from 'fs';
import { Requirement } from '../../Shared/types';
import { parse, parseFrontmatter } from '../../Markdown';

export const createRequirements = (files: string[]): Requirement[] => files.flatMap(file => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    const { id, synopsis = '' } = parseFrontmatter(ast);

    return {
        type: 'requirement',
        file,
        id,
        ast,
        synopsis,
    };
});
