import fs from 'fs';
import { Requirement } from '../../Shared/types';
import { parse, parseFrontmatter } from '../../Markdown';

const createFromFile = (file: string): Requirement => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    const { id } = parseFrontmatter(ast);

    return {
        type: 'requirement',
        file,
        id,
        ast,
    };
};

export const createRequirements = (files: string[]): Requirement[] => files.map(createFromFile);
