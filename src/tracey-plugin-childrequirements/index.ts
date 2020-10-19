import { Requirement } from "../Requirement/types";
import visit from 'unist-util-visit';
import { Plugin } from "../types";
import path from "path";
import { createHTML, createLink, createTable, createTableCell, createTableRow, createText } from "../tracey-plugin-utility";

const createChildRequirementsTable = (requirement: Requirement, childRequirements: Requirement[]) => {
    const tableRows = childRequirements.map(childRequirement => {
        const relativeLink = path.relative(path.parse(requirement.file).dir, childRequirement.file);
        const { id, synopsis = '' } = childRequirement;
        return createTableRow([
            createTableCell(createLink(id, relativeLink)),
            createTableCell(createText(synopsis)),
        ]);
    });

    const tableHeaderRow = createTableRow([
        createTableCell(createText('Requirement')),
        createTableCell(createText('Synopsis')),
    ]);

    const table = createTable([
        tableHeaderRow,
        ...tableRows,
    ]);

    const begin = createHTML('<div class="tracey tracey-plugin-childrequirements">')
    const end = createHTML('</div>')

    return [
        begin,
        table,
        end,
    ];
};

const updateChildrequirements = (original: Requirement, childRequirements: Requirement[]): Requirement => {
    const requirement = { ...original };
    const childRequirementsTable = createChildRequirementsTable(requirement, childRequirements);
    let shouldAddChildRequirementsToBottom = true;

    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey tracey-plugin-childrequirements">' && parent) {
            parent.children.splice(index, childRequirementsTable.length, ...childRequirementsTable);
            shouldAddChildRequirementsToBottom = false;
        }
    });

    if (shouldAddChildRequirementsToBottom) {
        requirement.ast.children.push(...childRequirementsTable);
    }

    return requirement;
};

const removeChildrequirements = (original: Requirement): Requirement => {
    const requirement = { ...original };

    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey tracey-plugin-childrequirements">' && parent) {
            parent.children.splice(index, 3);
        }
    });

    return requirement;
};

export const plugin: Plugin = ({ requirements, tracelinks, annotations }) => {
    const updatedRequirements = requirements.map(theRequirement => {
        const childRequirements = requirements.filter(aRequirement => Object.hasOwnProperty.call(aRequirement, 'parent') && aRequirement.parent === theRequirement.id);

        if (childRequirements.length) {
            return updateChildrequirements(theRequirement, childRequirements);
        }

        return removeChildrequirements(theRequirement);
    });

    return {
        requirements: updatedRequirements,
        tracelinks,
        annotations,
    };
};
