import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import frontmatter, { YamlNode } from 'remark-frontmatter';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import unified from 'unified';
import { Node, Parent } from 'unist';
import visit from 'unist-util-visit';
import readdirRecursive from '../Shared/readdirRecursive';
import { KeyValueStore, Requirement, RequirementConfiguration } from '../Shared/types';

/**
 * Transform a file into an abstract syntax tree
 * @param file The requirement file
 */
export const parseMarkdownFile = (file: string): Node => unified()
    .use(parse)
    .use(frontmatter, ['yaml'])
    .parse(fs.readFileSync(file));

/**
 * Transform an abstract syntax tree into a string
 * @param ast The abstract syntax tree
 */
export const stringifyMarkdown = (ast: Node): string => unified()
    .use(stringify)
    .use(frontmatter, ['yaml'])
    .stringify(ast);

const filterFileExcludes = (excludes: string[], file: string) => excludes
    .map(exclude => new RegExp(exclude))
    .every(exclude => !exclude.test(file));

const isMarkdownFile = (file: string): boolean => path.parse(file).ext === '.md';

/**
 * @requirement Requirement
 */
export const isRequirementFile = (excludes: string[]) => (file: string): boolean => isMarkdownFile(file) && filterFileExcludes(excludes, file);

export const collectRequirements = (startingpoint: string, excludes: string[]): string[] => readdirRecursive(startingpoint).filter(isRequirementFile(excludes));

export const parseFrontmatter = (ast: any): KeyValueStore => {
    let output: KeyValueStore = {};

    visit(ast, 'yaml', (node: YamlNode, index: number, parent: Parent | undefined) => {
        output = YAML.parse(node.value);
    });

    return output;
};

export const getRequirementId = (ast: Node): string => parseFrontmatter(ast).id;

export const createRequirement = (file: string): Requirement => {
    const ast = parseMarkdownFile(file);
    const id = getRequirementId(ast);

    return {
        type: 'requirement',
        file,
        id,
        ast,
    };
};

export const createRequirements = (files: string[]): Requirement[] => files.map(createRequirement);

export const list = (configuration: RequirementConfiguration): Requirement[] => createRequirements(collectRequirements(configuration.startingpoint, configuration.excludes));

const hasTraceyBlock = (requirement: Requirement): boolean => {
    const ast = <Parent>requirement.ast;
    return ast.children.filter(child => child.value === '<div class="tracey">').length > 0;
};

/**
 * @requirement TraceLink
 */
const removeTraceyBlock = (requirement: Requirement): Requirement => {
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
const removeExistingTraceyBlock = (requirement: Requirement): Requirement => {
    if (hasTraceyBlock(requirement)) {
        return removeTraceyBlock(requirement);
    }

    return requirement;
};

const shouldUpdate = (traceabilityInformation: Node[]): boolean => {
    const table = <Parent>traceabilityInformation[1];
    return table.children.length > 1;
};

const save = (requirement: Requirement) => {
    fs.writeFileSync(requirement.file, stringifyMarkdown(requirement.ast));
};


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
