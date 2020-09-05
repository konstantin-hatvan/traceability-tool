import visit from 'unist-util-visit';
import { Requirement, TraceLink } from "../../Shared/types";

export type UpdateProcessRule = (requirement: Requirement, traceLinks: TraceLink[]) => boolean;

export type UpdateProcessAction = (requirement: Requirement, traceLinks: TraceLink[]) => void;

export const hasTraceyBlock: UpdateProcessRule = (requirement) => {
    let output = false;

    visit(requirement.ast, 'html', node => {
        if (node.value === '<div class="tracey">') {
            output = true;
        }
    });

    return output;
};

export const hasNoTraceyBlock: UpdateProcessRule = (requirement, traceLinks) => !hasTraceyBlock(requirement, traceLinks);

export const hasTraceLinks: UpdateProcessRule = (requirement, traceLinks) => traceLinks.length > 0;

export const hasNoTraceLinks: UpdateProcessRule = (requirement, traceLinks) => !hasTraceLinks(requirement, traceLinks);

export const combinedCondition = (rules: UpdateProcessRule[]) => (requirement: Requirement, traceLinks: TraceLink[]): boolean => rules.every(rule => rule(requirement, traceLinks));

export const createStrategy = (rules: UpdateProcessRule[], action: UpdateProcessAction) => {
    const condition = combinedCondition(rules);

    return {
        condition,
        action,
    };
};
