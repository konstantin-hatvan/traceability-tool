import remark from 'remark';
import remarkFrontmatter, { YamlNode } from 'remark-frontmatter';
import visit from 'unist-util-visit';
import YAML from 'yaml';
import { Root } from 'mdast';

interface KeyValueStore {
    [key: string]: any;
};

export const parse = (markdown: string): Root => <Root>remark()
    /** @requirement #[ Requirement/Collector ]# #( Requirement identifiers must use yaml frontmatter )# */
    .use(remarkFrontmatter)
    .parse(markdown);

export const stringify = (markdown: Root): string => remark()
    /** @requirement #[ Requirement/Collector ]# #( Requirement identifiers must use yaml frontmatter )# */
    .use(remarkFrontmatter)
    .stringify(markdown);

export const parseFrontmatter = (markdown: Root): KeyValueStore => {
    let output = {};

    /** @requirement #[ Requirement/Collector ]# #( Requirement identifiers must use yaml frontmatter )# */
    visit(markdown, 'yaml', (node: YamlNode) => {
        output = YAML.parse(node.value);
    });

    return output;
};
