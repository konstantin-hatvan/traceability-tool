import { Link, TableCell, TableRow, Table, Text, PhrasingContent } from 'mdast';

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
    children: tableCells,
});

export const createTable = (tableRows: TableRow[]): Table => ({
    type: 'table',
    children: tableRows,
});
