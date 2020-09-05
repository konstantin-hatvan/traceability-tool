/**
 * @requirement RequirementUpdateProcess
 */

import { Requirement, TraceLink } from '../../Shared/types';
import { strategy as addTraceyStrategy } from './AddTraceyStrategy';
import { strategy as updateTraceyStrategy } from './UpdateTraceyStrategy';
import { strategy as deleteTraceyStrategy } from './DeleteTraceyStrategy';
import { strategy as defaultTraceyStrategy } from './DefaultTraceyStrategy';

const traceyActions = [
    addTraceyStrategy,
    updateTraceyStrategy,
    deleteTraceyStrategy,
];

const determineTraceyAction = (requirement: Requirement, traceLinks: TraceLink[]) => {
    for (const action of traceyActions) {
        if (action.condition(requirement, traceLinks)) return action.action;
    }

    return defaultTraceyStrategy.action;
};

export const update = (requirement: Requirement, traceLinks: TraceLink[]) => {
    const action = determineTraceyAction(requirement, traceLinks);
    action(requirement, traceLinks);
};
