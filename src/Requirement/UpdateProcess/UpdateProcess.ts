import { Requirement, TraceLink } from '../../Shared/types';
import { strategies, defaultStrategy } from './Strategy/Strategies';

/** @requirement [Requirement/TraceabilityTable] (Determine the action of the update process) */
const determineTraceyAction = (requirement: Requirement, traceLinks: TraceLink[]) => {
    for (const strategy of strategies) {
        if (strategy.condition(requirement, traceLinks)) return strategy.action;
    }

    return defaultStrategy.action;
};

/** @requirement [Requirement/TraceabilityTable] (Run the action of the update process) */
export const update = (requirement: Requirement, traceLinks: TraceLink[]) => {
    const action = determineTraceyAction(requirement, traceLinks);
    action(requirement, traceLinks);
};
