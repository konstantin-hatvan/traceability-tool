import fs from 'fs';
import visit from 'unist-util-visit';
import { stringify } from '../../Markdown';
import { TraceLink, Requirement } from '../../Shared/types';
import { hasTraceyBlock, hasNoTraceLinks, UpdateProcessRule, createStrategy } from './Rules';
import { Root } from 'mdast';

const rules: UpdateProcessRule[] = [
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

export const strategy = createStrategy(rules, removeTraceyBlock);
