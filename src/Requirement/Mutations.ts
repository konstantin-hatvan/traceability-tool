import { Requirement } from './types';
import visit from 'unist-util-visit';
import { createTraceyBlock } from './Markdown';
import { TraceLink } from '../TraceLink/types';
import { Plugin } from '../types';

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
export const updateTraceLinks: Plugin = ({ requirements, annotations, tracelinks }) => {
    const updatedRequirements = requirements.map(requirement => {
        const linkedTracelinks = tracelinks.filter(tracelink => tracelink.annotation.identifier === requirement.id);
        let outputRequirement = removeTraceLinks(requirement);

        if (tracelinks.length) {
            outputRequirement = addTraceLinks(outputRequirement, linkedTracelinks);
        }

        return requirement;
    });

    return {
        requirements: updatedRequirements,
        annotations,
        tracelinks,
    };
};
