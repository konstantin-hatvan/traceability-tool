import remark from 'remark';
import remarkFrontmatter, { YamlNode } from 'remark-frontmatter';
import visit from 'unist-util-visit';
import YAML from 'yaml';
import { Link, TableCell, TableRow, Table, Text, Root, PhrasingContent } from 'mdast';
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

export const createText = (text: string): Text => ({
    type: 'text',
    value: text
});

export const createLink = (value: string, url: string): Link => ({
    type: 'link',
    children: [
        {
            type: 'text',
            value,
        },
    ],
    url,
});

export const createTableCell = (node: PhrasingContent): TableCell => ({
    type: 'tableCell',
    children: [
        node,
    ],
});

export const createTableRow = (tableCells: TableCell[]): TableRow => ({
    type: 'tableRow',
    children: [
        ...tableCells,
    ],
});

export const createTable = (tableRows: TableRow[]): Table => {
    const headerCells: TableCell[] = [
        createTableCell(createText('File')),
        createTableCell(createText('Line')),
    ];

    const header: TableRow = createTableRow(headerCells);

    return {
        type: 'table',
        children: [
            header,
            ...tableRows,
        ],
    };
};

export const createTraceyBlock = (table: Table) => {
    const startBlock = {
        type: 'html',
        value: '<div class="tracey">',
    };

    const endBlock = {
        type: 'html',
        value: '</div>',
    };

    return [
        startBlock,
        table,
        endBlock,
    ];
};
