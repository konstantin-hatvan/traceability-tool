import fs from 'fs';
import { stringify } from '../../Markdown'
import { TraceLink, Requirement } from '../../Shared/types';
import { hasNoTraceyBlock, hasTraceLinks, UpdateProcessRule, createStrategy } from './Rules';
import { createTraceyBlock } from '../../Markdown';
import { Root } from 'mdast';

const rules: UpdateProcessRule[] = [
    hasNoTraceyBlock,
    hasTraceLinks,
];

const addTraceyBlock = (requirement: Requirement, traceLinks: TraceLink[]) => {
    const traceyBlock = createTraceyBlock(traceLinks);
    const ast= <Root>requirement.ast;
    ast.children.push(...traceyBlock);
    fs.writeFileSync(requirement.file, stringify(<Root>ast));
};

export const strategy = createStrategy(rules, addTraceyBlock);
