/**
 * @requirement [Requirement/TraceabilityTable] (The conditions to determine the action for the update process)
 */
import visit from 'unist-util-visit';
import { Requirement, TraceLink, UpdateProcessCondition, UpdateProcessAction, UpdateProcessStrategy } from '../../../Shared/types';

/**
 * @requirement [Requirement/TraceabilityTable/Update, Requirement/TraceabilityTable/Delete] (Check if a tracey block exists)
 */
export const hasTraceyBlock: UpdateProcessCondition = (requirement) => {
    let output = false;

    visit(requirement.ast, 'html', node => {
        if (node.value === '<div class="tracey">') {
            output = true;
        }
    });

    return output;
};

/**
 * @requirement [Requirement/TraceabilityTable/Add] (Check if no tracey block exists)
 */
export const hasNoTraceyBlock: UpdateProcessCondition = (requirement, traceLinks) => !hasTraceyBlock(requirement, traceLinks);

/**
 * @requirement [Requirement/TraceabilityTable/Add, Requirement/TraceabilityTable/Update] (Check if trace links exist)
 */
export const hasTraceLinks: UpdateProcessCondition = (requirement, traceLinks) => traceLinks.length > 0;

/**
 * @requirement [Requirement/TraceabilityTable/Delete] (Check if no trace links exist)
 */
export const hasNoTraceLinks: UpdateProcessCondition = (requirement, traceLinks) => !hasTraceLinks(requirement, traceLinks);

export const combinedCondition = (rules: UpdateProcessCondition[]) => (requirement: Requirement, traceLinks: TraceLink[]): boolean => rules.every(rule => rule(requirement, traceLinks));

export const createStrategy = (rules: UpdateProcessCondition[], action: UpdateProcessAction): UpdateProcessStrategy => {
    const condition = combinedCondition(rules);

    return {
        condition,
        action,
    };
};
