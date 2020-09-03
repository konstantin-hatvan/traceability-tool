import fs from 'fs';
import { Node, Parent } from 'unist';
import visit from 'unist-util-visit';
import { Root } from 'mdast';
import { Requirement, RequirementConfiguration } from '../Shared/types';
import { parse, stringify, parseFrontmatter } from '../Markdown/Markdown';
import { collect } from './RequirementCollector';

export const createRequirement = (file: string): Requirement => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    const { id } = parseFrontmatter(ast);

    return {
        type: 'requirement',
        file,
        id,
        ast,
    };
};

export const createRequirements = (files: string[]): Requirement[] => files.map(createRequirement);

/**
 * @requirement TraceLink
 */
export const removeTraceyBlock = (requirement: Requirement): Requirement => {
    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey">' && parent) {
            parent.children.splice(index);
        }
    });

    return requirement;
};

export const shouldUpdate = (traceabilityInformation: Node[]): boolean => {
    const table = <Parent>traceabilityInformation[1];
    return table.children.length > 1;
};

export const save = (requirement: Requirement) => {
    fs.writeFileSync(requirement.file, stringify(<Root>requirement.ast));
};

export const list = (configuration: RequirementConfiguration): Requirement[] => createRequirements(collect(configuration.startingpoint, configuration.excludes));

/**
 * @requirement TraceLink
 */
export const update = (requirement: Requirement, traceabilityInformation: Node[]) => {
    const cleanRequirement = removeTraceyBlock(requirement);

    if (shouldUpdate(traceabilityInformation)) {
        const ast = <Parent>cleanRequirement.ast;

        save({
            ...cleanRequirement,
            ast: {
                ...ast,
                children: [
                    ...ast.children,
                    ...traceabilityInformation,
                ],
            },
        });

        return;
    }

    save(cleanRequirement);
};
