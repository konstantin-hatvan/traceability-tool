import { Table, TableRow, HTML } from 'mdast';
import { createTableRow, createTableCell, createText, createTable, createLink, createTableCellFromText } from './Generator';
import { TraceLink } from '../../../TraceLink/types';
import { Mutations as TraceLinkMutations } from '../../../TraceLink';

const wrapTraceyTable = (table: Table): (Table | HTML)[] => {
    const startBlock: HTML = {
        type: 'html',
        value: '<div class="tracey">',
    };

    const endBlock: HTML = {
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
        createTableCell(createText('Description')),
    ]);

    return createTable([
        tableHeaderRow,
        ...tableRows,
    ]);
};

export const createTraceyBlock = (traceabilityLinks: TraceLink[]): (Table | HTML)[] => {
    const tableRows = traceabilityLinks.map(traceabilityLink => createTableRow([
        createTableCell(createLink(traceabilityLink.annotation.location.file, TraceLinkMutations.toRelativeLink(traceabilityLink))),
        createTableCell(createText(traceabilityLink.annotation.line.toString())),
        createTableCellFromText(traceabilityLink.annotation.description),
    ]));
    const table = createTraceyTable(tableRows);
    return wrapTraceyTable(table);
};
