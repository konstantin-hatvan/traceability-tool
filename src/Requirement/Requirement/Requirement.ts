import fs from 'fs';
import { Requirement, RequirementConfiguration } from '../../Shared/types';
import { parse, parseFrontmatter } from '../../Markdown';
import { collect } from '../Collector/Collector';

const createRequirements = (files: string[]): Requirement[] => files.flatMap(file => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    const { id } = parseFrontmatter(ast);

    return [{
        type: 'requirement',
        file,
        id,
        ast,
    }];
});

export const list = (configuration: RequirementConfiguration): Requirement[] => createRequirements(collect(configuration.startingpoint, configuration.excludes));
