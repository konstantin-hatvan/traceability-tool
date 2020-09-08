import { Link, TableCell, TableRow, Table, Text, PhrasingContent, Paragraph, Parent } from 'mdast';
import remark from 'remark';

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

export const createTableCellFromText = (str: string): TableCell => {
    const ast = <Parent>remark().parse(str);
    const paragraph = <Paragraph>ast.children[0];
    const children = paragraph.children;

    return {
        type: 'tableCell',
        children,
    };
};

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
