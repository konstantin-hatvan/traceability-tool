import { strategy as addTraceyStrategy } from './Add';
import { strategy as updateTraceyStrategy } from './Update';
import { strategy as deleteTraceyStrategy } from './Delete';
import { strategy as defaultTraceyStrategy } from './Default';

/** @requirement #[ Requirement/TraceabilityTable ]# #( All possible actions of the update process )# */
export const strategies = [
    addTraceyStrategy,
    updateTraceyStrategy,
    deleteTraceyStrategy,
];

/** @requirement #[ Requirement/TraceabilityTable ]# #( The default action of the update process )# */
export const defaultStrategy = defaultTraceyStrategy;
