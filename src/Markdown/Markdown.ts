import { Link, TableCell, TableRow, Table, Text } from 'mdast';

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

/**
 * @requirement TraceLink
 */
export const createTableCell = (link: Link | string): TableCell => {
    if (typeof link === 'string') {
        return {
            type: 'tableCell',
            children: [
                createText(link),
            ],
        }
    }
    else {
        return {
            type: 'tableCell',
            children: [
                link,
            ],
        }
    }
};

/**
 * @requirement TraceLink
 */
export const createTableRow = (tableCell: TableCell): TableRow => ({
    type: 'tableRow',
    children: [
        tableCell,
    ],
});

/**
 * @requirement TraceLink
 */
export const createTable = (tableRows: TableRow[]): Table => {
    const header: TableRow = createTableRow(createTableCell('Traceability Link'));

    return {
        type: 'table',
        children: [
            header,
            ...tableRows,
        ],
    };
};

/**
 * @requirement TraceLink
 */
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
