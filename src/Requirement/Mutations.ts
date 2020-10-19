import { Requirement } from './types';
import visit from 'unist-util-visit';
import { createTraceyBlock } from './Markdown';
import { TraceLink } from '../TraceLink/types';

/**
 * Remove tracelinks
 * @param original A requirement
 */
const removeTraceLinks = (original: Requirement): Requirement => {
    const requirement = { ...original };

    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey">' && parent) {
            parent.children.splice(index, 3);
        }
    });

    return requirement;
};

/**
 * Add tracelinks
 * @param original A requirement
 * @param traceLinks A list of tracelinks
 */
const addTraceLinks = (original: Requirement, traceLinks: TraceLink[]): Requirement => {
    const requirement = { ...original };
    const cleanRequirement = removeTraceLinks(requirement);
    const traceyBlock = createTraceyBlock(traceLinks);

    cleanRequirement.ast.children.push(...traceyBlock);

    return cleanRequirement;
};

/**
 * Update tracelinks
 * @param original A requirement
 * @param traceLinks A list of trace links
 */
export const updateTraceLinks = (original: Requirement, traceLinks: TraceLink[]): Requirement => {
    const requirement = { ...original };
    const cleanRequirement = removeTraceLinks(requirement);
    let outputRequirement = cleanRequirement;

    if (traceLinks.length) {
        outputRequirement = addTraceLinks(cleanRequirement, traceLinks);
    }

    return outputRequirement;
};
