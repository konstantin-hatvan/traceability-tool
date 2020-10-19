import { HTML, Link, Paragraph, PhrasingContent, Table, TableCell, TableRow, Text } from "mdast";

export const createText = (value: string): Text => ({
    type: 'text',
    value,
});

export const createLink = (value: string, url: string): Link => ({
    type: 'link',
    children: [
        createText(value),
    ],
    url,
});

export const createTableCell = (node: PhrasingContent): TableCell => ({
    type: 'tableCell',
    children: [
        node,
    ],
});

export const createTableRow = (children: TableCell[]): TableRow => ({
    type: 'tableRow',
    children,
});

export const createTable = (children: TableRow[]): Table => ({
    type: 'table',
    children,
});

export const createHTML = (value: string): HTML => ({
    type: 'html',
    value,
});

export const createParagraph = (children: PhrasingContent[]): Paragraph => ({
    type: 'paragraph',
    children,
});
