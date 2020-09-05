import fs from 'fs';
import visit from 'unist-util-visit';
import { TraceLink, Requirement } from '../../Shared/types';
import { hasTraceyBlock, hasTraceLinks, UpdateProcessRule, createStrategy } from './Rules';
import { createTraceyBlock, stringify } from '../../Markdown';
import { Root } from 'mdast';

const rules: UpdateProcessRule[] = [
    hasTraceyBlock,
    hasTraceLinks,
];

const updateTraceyBlock = (requirement: Requirement, traceLinks: TraceLink[]) => {
    // Remove old trace links
    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey">' && parent) {
            parent.children.splice(index);
        }
    });

    // Add updated trace links
    const traceyBlock = createTraceyBlock(traceLinks);
    const ast= <Root>requirement.ast;
    ast.children.push(...traceyBlock);
    fs.writeFileSync(requirement.file, stringify(<Root>ast));
};

export const strategy = createStrategy(rules, updateTraceyBlock);
