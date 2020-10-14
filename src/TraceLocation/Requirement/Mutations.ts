import { Requirement } from '../types';
import visit from 'unist-util-visit';
import { createTraceyBlock } from './Markdown/Tracey';
import { TraceLink } from '../../TraceLink/types';

export const removeTraceLinks = (original: Requirement): Requirement => {
    const requirement = { ...original };

    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey">' && parent) {
            parent.children.splice(index);
        }
    });

    return requirement;
};

export const addTraceLinks = (original: Requirement, traceLinks: TraceLink[]): Requirement => {
    const requirement = { ...original };
    const cleanRequirement = removeTraceLinks(requirement);
    const traceyBlock = createTraceyBlock(traceLinks);

    cleanRequirement.ast.children.push(...traceyBlock);

    return cleanRequirement;
};

export const updateTraceLinks = (original: Requirement, traceLinks: TraceLink[]): Requirement => {
    const requirement = { ...original };
    const cleanRequirement = removeTraceLinks(requirement);
    const updatedRequirement = addTraceLinks(cleanRequirement, traceLinks);

    return updatedRequirement;
};
