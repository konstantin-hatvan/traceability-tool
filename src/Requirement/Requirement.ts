import fs from 'fs';
import { Node, Parent } from 'unist';
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

const hasTraceyBlock = (requirement: Requirement): boolean => {
    const ast = <Parent>requirement.ast;
    return ast.children.filter(child => child.value === '<div class="tracey">').length > 0;
};

/**
 * @requirement TraceLink
 */
export const removeTraceyBlock = (requirement: Requirement): Requirement => {
    const ast = <Parent>requirement.ast;

    return {
        ...requirement,
        ast: {
            ...ast,
            children: [
                ...ast.children.slice(0, ast.children.length - 3),
            ],
        },
    };
};

/**
 * @requirement TraceLink
 */
export const removeExistingTraceyBlock = (requirement: Requirement): Requirement => {
    if (hasTraceyBlock(requirement)) {
        return removeTraceyBlock(requirement);
    }

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
    const cleanRequirement = removeExistingTraceyBlock(requirement);

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
