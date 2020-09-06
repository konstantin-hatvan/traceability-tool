/** @requirement [Requirement/TraceabilityTable/Add] (The add action of the update process) */
import fs from 'fs';
import { stringify } from '../../../Markdown'
import { TraceLink, Requirement, UpdateProcessCondition } from '../../../Shared/types';
import { hasNoTraceyBlock, hasTraceLinks, createStrategy } from './Conditions';
import { createTraceyBlock } from '../../../Markdown';
import { Root } from 'mdast';

const conditions: UpdateProcessCondition[] = [
    hasNoTraceyBlock,
    hasTraceLinks,
];

const addTraceyBlock = (requirement: Requirement, traceLinks: TraceLink[]) => {
    const traceyBlock = createTraceyBlock(traceLinks);
    const ast= <Root>requirement.ast;
    ast.children.push(...traceyBlock);
    fs.writeFileSync(requirement.file, stringify(<Root>ast));
};

export const strategy = createStrategy(conditions, addTraceyBlock);
