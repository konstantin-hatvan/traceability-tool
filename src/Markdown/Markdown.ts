import remark from 'remark';
import remarkFrontmatter, { YamlNode } from 'remark-frontmatter';
import visit from 'unist-util-visit';
import YAML from 'yaml';
import { Root } from 'mdast';
import { KeyValueStore } from '../Shared/types';

export const parse = (markdown: string): Root => <Root>remark()
    .use(remarkFrontmatter)
    .parse(markdown);

export const stringify = (markdown: Root): string => remark()
    .use(remarkFrontmatter)
    .stringify(markdown);

export const parseFrontmatter = (markdown: Root): KeyValueStore => {
    let output = {};

    visit(markdown, 'yaml', (node: YamlNode) => {
        output = YAML.parse(node.value);
    });

    return output;
};
