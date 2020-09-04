/**
 * @requirement RequirementUpdate
 */

import fs from 'fs';
import { Node, Parent } from 'unist';
import visit from 'unist-util-visit';
import { Root } from 'mdast';
import { Requirement, TraceLink } from '../../Shared/types';
import { stringify, createTraceyBlock } from '../../Markdown';

const removeTraceyBlock = (requirement: Requirement): Requirement => {
    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey">' && parent) {
            parent.children.splice(index);
        }
    });

    return requirement;
};

const save = (requirement: Requirement) => {
    fs.writeFileSync(requirement.file, stringify(<Root>requirement.ast));
};

const shouldUpdate = (traceabilityInformation: Node[]): boolean => {
    const table = <Parent>traceabilityInformation[1];
    return table.children.length > 1;
};

export const update = (requirement: Requirement, traceLinks: TraceLink[]) => {
    const cleanRequirement = removeTraceyBlock(requirement);
    const traceyBlock = createTraceyBlock(traceLinks);

    if (shouldUpdate(traceyBlock)) {
        const ast = <Parent>cleanRequirement.ast;

        save({
            ...cleanRequirement,
            ast: {
                ...ast,
                children: [
                    ...ast.children,
                    ...traceyBlock,
                ],
            },
        });

        return;
    }

    save(cleanRequirement);
};
