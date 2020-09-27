import fs from 'fs';
import visit from 'unist-util-visit';
import { stringify } from '../../../Markdown';
import { TraceLink, Requirement } from '../../../Shared/types';
import { hasTraceyBlock, hasNoTraceLinks, createStrategy } from './Conditions';
import { Root } from 'mdast';
import { UpdateProcessCondition } from '../UpdateProcess';

const conditions: UpdateProcessCondition[] = [
    hasTraceyBlock,
    hasNoTraceLinks,
];

const removeTraceyBlock = (requirement: Requirement, traceLinks: TraceLink[]) => {
    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey">' && parent) {
            parent.children.splice(index);
        }
    });
    fs.writeFileSync(requirement.file, stringify(<Root>requirement.ast));
};

/** @requirement #[Requirement/TraceabilityTable/Delete]# #(The delete action of the update process)# */
export const strategy = createStrategy(conditions, removeTraceyBlock);
