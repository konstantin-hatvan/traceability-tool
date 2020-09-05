/**
 * @requirement RequirementUpdateProcess
 */

import visit from 'unist-util-visit';
import { Requirement, TraceLink } from "../../../Shared/types";

export type UpdateProcessCondition = (requirement: Requirement, traceLinks: TraceLink[]) => boolean;

export type UpdateProcessAction = (requirement: Requirement, traceLinks: TraceLink[]) => void;

export const hasTraceyBlock: UpdateProcessCondition = (requirement) => {
    let output = false;

    visit(requirement.ast, 'html', node => {
        if (node.value === '<div class="tracey">') {
            output = true;
        }
    });

    return output;
};

export const hasNoTraceyBlock: UpdateProcessCondition = (requirement, traceLinks) => !hasTraceyBlock(requirement, traceLinks);

export const hasTraceLinks: UpdateProcessCondition = (requirement, traceLinks) => traceLinks.length > 0;

export const hasNoTraceLinks: UpdateProcessCondition = (requirement, traceLinks) => !hasTraceLinks(requirement, traceLinks);

export const combinedCondition = (rules: UpdateProcessCondition[]) => (requirement: Requirement, traceLinks: TraceLink[]): boolean => rules.every(rule => rule(requirement, traceLinks));

export const createStrategy = (rules: UpdateProcessCondition[], action: UpdateProcessAction) => {
    const condition = combinedCondition(rules);

    return {
        condition,
        action,
    };
};
