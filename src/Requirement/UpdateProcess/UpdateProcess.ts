/**
 * @requirement Requirement/TraceabilityTable
 */

import { Requirement, TraceLink } from '../../Shared/types';
import { strategies, defaultStrategy } from './Strategy/Strategies';

const determineTraceyAction = (requirement: Requirement, traceLinks: TraceLink[]) => {
    for (const strategy of strategies) {
        if (strategy.condition(requirement, traceLinks)) return strategy.action;
    }

    return defaultStrategy.action;
};

export const update = (requirement: Requirement, traceLinks: TraceLink[]) => {
    const action = determineTraceyAction(requirement, traceLinks);
    action(requirement, traceLinks);
};
