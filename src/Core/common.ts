import path from 'path';
import { HTML, Link, PhrasingContent, Table, TableCell, TableRow, Text } from "mdast";
import visit from 'unist-util-visit';
import { Requirement } from '../Requirement/types';
import { Annotation } from '../Annotation/types';

/**
 * Check if a requirement already has tracelinks
 * @param requirement The requirement
 */
export const requirementHasTracelinks = (requirement: Requirement): boolean => {
    let output = false;

    visit(requirement.ast, 'html', node => {
        if (node.value === '<div class="tracey tracey-plugin-tracelinktable">') {
            output = true;
        }
    });

    return output;
};

/** Create different mdast elements */
const createText = (value: string): Text => ({ type: 'text', value });
const createLink = (value: string, url: string, title: string): Link => ({ type: 'link', children: [ createText(value) ], url, title });
const createTableCell = (node: PhrasingContent): TableCell => ({ type: 'tableCell', children: [ node ] });
const createTableRow = (children: TableCell[]): TableRow => ({ type: 'tableRow', children });
const createTable = (children: TableRow[]): Table => ({ type: 'table', children });
const createHTML = (value: string): HTML => ({ type: 'html', value });

/* Create relative Link from requirement to annotation */
const createRelativeLink = (requirement: Requirement, annotation: Annotation): string => `${path.relative(path.parse(requirement.file).dir, annotation.file)}#L${annotation.line}`;

/** Create cell, row, table, block */
const toLinkTableCell = (requirement: Requirement, annotation: Annotation): TableCell => createTableCell(createLink(annotation.file, createRelativeLink(requirement, annotation), annotation.file));
const toLineTableCell = (annotation: Annotation): TableCell => createTableCell(createText(annotation.line.toString()));
const toDescriptionTableCell = (annotation: Annotation): TableCell => createTableCell(createText(annotation.description));
const toTableRow = (requirement: Requirement) => (annotation: Annotation): TableRow => createTableRow([
    toLinkTableCell(requirement, annotation),
    toLineTableCell(annotation),
    toDescriptionTableCell(annotation),
]);
const createTracelinkTableHeader = (): TableRow => createTableRow([
    createTableCell(createText('File')),
    createTableCell(createText('Line')),
    createTableCell(createText('Description')),
]);
const createTracelinkTableBody = (annotations: Annotation[], requirement: Requirement) => annotations.map(toTableRow(requirement));
const createTracelinktable = (annotations: Annotation[], requirement: Requirement): Table => createTable([
    createTracelinkTableHeader(),
    ...createTracelinkTableBody(annotations, requirement),
]);
export const createTracelinkBlock = (annotations: Annotation[], requirement: Requirement): (Table | HTML)[] => [
    createHTML('<div class="tracey tracey-plugin-tracelinktable">'),
    createTracelinktable(annotations, requirement),
    createHTML('</div>'),
];
