import { Table, TableRow } from 'mdast';
import { createTableRow, createTableCell, createText, createTable } from './Markdown';

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

export const createTraceyTable = (tableRows: TableRow[]): Table => {
    const tableHeaderRow = createTableRow([
        createTableCell(createText('File')),
        createTableCell(createText('Line')),
    ]);

    return createTable([
        tableHeaderRow,
        ...tableRows,
    ]);
};
