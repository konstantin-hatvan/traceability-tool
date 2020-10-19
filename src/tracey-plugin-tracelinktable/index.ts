import { Requirement } from '../Requirement/types';
import visit from 'unist-util-visit';
import { TraceLink } from '../TraceLink/types';
import { Plugin } from '../types';
import { Table, HTML } from 'mdast';
import { createHTML, createLink, createTable, createTableCell, createTableCellFromText, createTableRow, createText } from '../tracey-plugin-utility';
import path from 'path';

/**
 * Create a markdown table wrapped in a HTML div from given tracelinks
 * @param traceLinks A list of tracelinks
 * @requirement #[ TracelinkTable ]# #( The plugin generates a table containing the tracelinks )#
 */
const createTracelinktable = (traceLinks: TraceLink[]): (Table | HTML)[] => {
    const tableRows = traceLinks.map(traceLink => {
        /** @requirement #[ TracelinkTable ]# #( Tracelinks are transformed to relative links )# */
        const relativeLink = `${path.relative(path.parse(traceLink.destination.file).dir, traceLink.annotation.file)}#L${traceLink.annotation.line}`;

        /** @requirement #[ TracelinkTable ]# #( Each row consists of a relative link, a line number and a description )# */
        return createTableRow([
            createTableCell(createLink(traceLink.annotation.file, relativeLink)),
            createTableCell(createText(traceLink.annotation.line.toString())),
            createTableCellFromText(traceLink.annotation.description),
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
 * @param traceLinks A list of tracelinks
 */
const updateTracelinks = (original: Requirement, traceLinks: TraceLink[]): Requirement => {
    const requirement = { ...original };
    const tracelinkTable = createTracelinktable(traceLinks);
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

const removeTraceLinks = (original: Requirement): Requirement => {
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
 * @param traceLinks A list of trace links
 */
export const plugin: Plugin = ({ requirements, annotations, tracelinks }) => {
    const updatedRequirements = requirements.map(requirement => {
        const linkedTracelinks = tracelinks.filter(tracelink => tracelink.annotation.identifier === requirement.id);

        if (linkedTracelinks.length) {
            return updateTracelinks(requirement, linkedTracelinks);
        }

        return removeTraceLinks(requirement);
    });

    return {
        requirements: updatedRequirements,
        annotations,
        tracelinks,
    };
};
