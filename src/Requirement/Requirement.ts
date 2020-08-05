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
import { KeyValueStore, Requirement } from '../Shared/types';

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

export const isRequirement = (file: string): boolean => path.parse(file).ext === '.md';

export const collectRequirements = (startingpoint: string): string[] => readdirRecursive(startingpoint).filter(isRequirement);

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

export const list = (startingpoint: string): Requirement[] => createRequirements(collectRequirements(startingpoint));

export const update = (requirement: Requirement, traceabilityInformation: Node[]) => {
    const ast = <Parent>requirement.ast;

    return {
        ...requirement,
        ast: {
            ...ast,
            children: [
                ...ast.children,
                ...traceabilityInformation,
            ],
        },
    }
};

export const save = (requirement: Requirement) => {
    fs.writeFileSync(requirement.file, stringifyMarkdown(requirement.ast));
};
