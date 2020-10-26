import { Requirement } from '../Requirement/types';
import visit from 'unist-util-visit';
import { Tracelink } from '../Tracelink/types';
import { Plugin } from '../types';
import path from 'path';
import { HTML, Link, PhrasingContent, Table, TableCell, TableRow, Text } from "mdast";

/**
 * Create different mdast elements
 */
const createText = (value: string): Text => ({ type: 'text', value });
const createLink = (value: string, url: string, title: string): Link => ({ type: 'link', children: [ createText(value) ], url, title });
const createTableCell = (node: PhrasingContent): TableCell => ({ type: 'tableCell', children: [ node ] });
const createTableRow = (children: TableCell[]): TableRow => ({ type: 'tableRow', children });
const createTable = (children: TableRow[]): Table => ({ type: 'table', children });
const createHTML = (value: string): HTML => ({ type: 'html', value });

/**
 * Create a markdown table wrapped in a HTML div from given tracelinks
 * @param tracelinks A list of tracelinks
 * @requirement #[ TracelinkTable ]# #( The plugin generates a table containing the tracelinks )#
 */
const createTracelinktable = (tracelinks: Tracelink[]): (Table | HTML)[] => {
    const tableRows = tracelinks.map(tracelink => {
        /** @requirement #[ TracelinkTable ]# #( Tracelinks are transformed to relative links )# */
        const relativeLink = `${path.relative(path.parse(tracelink.destination.file).dir, tracelink.annotation.file)}#L${tracelink.annotation.line}`;

        /** @requirement #[ TracelinkTable ]# #( Each row consists of a relative link, a line number and a description )# */
        return createTableRow([
            createTableCell(createLink(tracelink.annotation.file, relativeLink, tracelink.annotation.file)),
            createTableCell(createText(tracelink.annotation.line.toString())),
            createTableCell(createText(tracelink.annotation.description)),
        ])
    });

    const tableHeaderRow = createTableRow([
        createTableCell(createText('File')),
        createTableCell(createText('Line')),
        createTableCell(createText('Description')),
    ]);

    const table = createTable([
        tableHeaderRow,
        ...tableRows,
    ]);;

    const startBlock = createHTML('<div class="tracey tracey-plugin-tracelinktable">');
    const endBlock = createHTML('</div>');

    return [
        startBlock,
        table,
        endBlock,
    ];
};

/**
 * Add tracelinks
 * @param original A requirement
 * @param tracelinks A list of tracelinks
 */
const updateTracelinks = (original: Requirement, tracelinks: Tracelink[]): Requirement => {
    const requirement = { ...original };
    const tracelinkTable = createTracelinktable(tracelinks);
    let shouldAddChildRequirementsToBottom = true;

    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey tracey-plugin-tracelinktable">' && parent) {
            parent.children.splice(index, tracelinkTable.length, ...tracelinkTable);
            shouldAddChildRequirementsToBottom = false;
        }
    });

    if (shouldAddChildRequirementsToBottom) {
        requirement.ast.children.push(...tracelinkTable);
    }

    return requirement;
};

const removeTracelinks = (original: Requirement): Requirement => {
    const requirement = { ...original };

    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey tracey-plugin-tracelinktable">' && parent) {
            parent.children.splice(index, 3);
        }
    });

    return requirement;
};

/**
 * Update tracelinks
 * @param original A requirement
 * @param tracelinks A list of trace links
 */
export const plugin: Plugin = ({ requirements, annotations, tracelinks }) => {
    const updatedRequirements = requirements.map(requirement => {
        const linkedTracelinks = tracelinks.filter(tracelink => tracelink.annotation.identifier === requirement.id);

        if (linkedTracelinks.length) {
            return updateTracelinks(requirement, linkedTracelinks);
        }

        return removeTracelinks(requirement);
    });

    return {
        requirements: updatedRequirements,
        annotations,
        tracelinks,
    };
};
