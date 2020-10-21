import fs from 'fs';
import { HTML, Root, Table } from 'mdast';
import path from 'path';
import { Requirement } from '../Requirement/types';
import { createHTML, createLink, createTable, createTableCell, createTableRow, createText } from '../tracey-plugin-utility';
import { Plugin } from '../types';
import remark from 'remark';
import visit from 'unist-util-visit';

interface PluginConfiguration {
    file?: string;
};

const getSynopsis = (requirement: Requirement): string => {
    const hasSynopsis = Object.prototype.hasOwnProperty.call(requirement, 'synopsis'); /** @requirement #[ RequirementSummary ]# #( Use the frontmatter key synopsis )# */

    if (!hasSynopsis) {
        console.log(`
WARNING: File ${requirement.file} has no synopsis
Fix this warning by adding a synopsis to the frontmatter or excluding the file in the configuration

`);
    }

    return hasSynopsis ? requirement.synopsis : '';
};

const createBlock = (file: string, requirements: Requirement[]): (HTML | Table)[] => {
    const headerRow = createTableRow([
        createTableCell(createText('Requirement')),
        createTableCell(createText('Synopsis')),
    ]);
    const requirementRows = requirements.map(requirement => {
        const relativeLink = path.relative(path.parse(file).dir, requirement.file);
        const linkCell = createTableCell(createLink(requirement.id, relativeLink)); /** @requirement #[ RequirementSummary ]# #( Each table row contains a relative link )# */
        const synopsisCell = createTableCell(createText(getSynopsis(requirement))); /** @requirement #[ RequirementSummary ]# #( Each table row contains the synopsis )# */
        return createTableRow([ linkCell, synopsisCell ]);
    });
    const table = createTable([ headerRow, ...requirementRows ]);
    const begin = createHTML('<div class ="tracey tracey-plugin-requirementsummary">')
    const end = createHTML('</div>')

    return [
        begin,
        table,
        end,
    ];
};

const getFileContentOrEmptyDocument = (file: string): Root => {
    if (fs.existsSync(file)) {
        return <Root>remark().parse(file);
    }

    return {
        type: 'root',
        children: [],
    };
};

const updateRequirementsummary = (original: Root, block: (HTML | Table)[]): Root => {
    const ast = { ...original };
    let shouldAddRequirementssummaryToBottom = true;

    visit(ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey tracey-plugin-requirementsummary">' && parent) {
            parent.children.splice(index, block.length, ...block);
            shouldAddRequirementssummaryToBottom = false;
        }
    });

    if (shouldAddRequirementssummaryToBottom) {
        ast.children.push(...block);
    }

    return ast;
};

export const plugin = ({ file = path.resolve('tracey-plugin-requirementsummary.md') }: PluginConfiguration): Plugin => ({ requirements, tracelinks, annotations }) => {
    if (requirements.length) {
        const block = createBlock(file, requirements);
        const ast = getFileContentOrEmptyDocument(file);
        const updatedAst = updateRequirementsummary(ast, block);
        const fileContent = remark().stringify(updatedAst);
        fs.writeFileSync(file, fileContent);
    }

    return {
        requirements,
        tracelinks,
        annotations,
    };
};
