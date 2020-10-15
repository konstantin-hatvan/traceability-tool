import { Table, TableRow, HTML } from 'mdast';
import { createTableRow, createTableCell, createText, createTable, createLink, createTableCellFromText } from './Generator';
import { TraceLink } from '../../TraceLink/types';
import { Mutations as TraceLinkMutations } from '../../TraceLink';

/**
 * Create a markdown table with File, Line and Description as header
 * @param tableRows Table rows
 */
const createTraceyTable = (tableRows: TableRow[]): Table => {
    /** @requirement #[ Requirement.TraceTable ]# #( Each row consists of a relative link, a line number and a description )# */
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

/**
 * Create a markdown table wrapped in a HTML div from given tracelinks
 * @param traceLinks A list of tracelinks
 */
export const createTraceyBlock = (traceLinks: TraceLink[]): (Table | HTML)[] => {
    /** @requirement #[ Requirement.TraceTable ]# #( Each row consists of a relative link, a line number and a description )# */
    const tableRows = traceLinks.map(traceLink => createTableRow([
        createTableCell(createLink(traceLink.annotation.file, TraceLinkMutations.toRelativeLink(traceLink))),
        createTableCell(createText(traceLink.annotation.line.toString())),
        createTableCellFromText(traceLink.annotation.description),
    ]));

    const table = createTraceyTable(tableRows);

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
