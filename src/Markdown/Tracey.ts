import { Table, TableRow } from 'mdast';
import { createTableRow, createTableCell, createText, createTable, createLink } from "./Generator";
import { TraceLink } from '../Shared/types';
import { toRelativeLink } from '../Trace';

const wrapTraceyTable = (table: Table) => {
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

const createTraceyTable = (tableRows: TableRow[]): Table => {
    const tableHeaderRow = createTableRow([
        createTableCell(createText('File')),
        createTableCell(createText('Line')),
    ]);

    return createTable([
        tableHeaderRow,
        ...tableRows,
    ]);
};

export const createTraceyBlock = (traceabilityLinks: TraceLink[]) => {
    const tableRows = traceabilityLinks.map(traceabilityLink => createTableRow([
        createTableCell(createLink(traceabilityLink.destination.file, toRelativeLink(traceabilityLink))),
        createTableCell(createText(traceabilityLink.destination.line.toString()))
    ]));
    const table = createTraceyTable(tableRows);
    return wrapTraceyTable(table);
};
