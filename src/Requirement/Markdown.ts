import remark from 'remark';
import remarkFrontmatter, { YamlNode } from 'remark-frontmatter';
import visit from 'unist-util-visit';
import YAML from 'yaml';
import { Root } from 'mdast';

interface KeyValueStore {
    [key: string]: any;
};

/**
 * Parse the markdown string into an AST
 * @param markdown A markdown string
 */
export const parse = (markdown: string): Root => <Root>remark()
    .use(remarkFrontmatter)
    .parse(markdown);

/**
 * Parse the markdown AST into a string
 * @param markdown A markdown AST
 */
export const stringify = (markdown: Root): string => remark()
    .use(remarkFrontmatter)
    .stringify(markdown);

/**
 * Parse the markdown yaml frontmatter into object
 * @param markdown A markdown AST
 */
export const parseFrontmatter = (markdown: Root): KeyValueStore => {
    let output = {};

    visit(markdown, 'yaml', (node: YamlNode) => {
        output = YAML.parse(node.value);
    });

    return output;
};
