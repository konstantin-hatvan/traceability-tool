/**
 * @requirement RequirementUpdateProcess
 */

import { TraceLink, Requirement } from '../../../Shared/types';
import { createStrategy, UpdateProcessCondition } from './Conditions';

const conditions: UpdateProcessCondition[] = [];

const doNothing = (requirement: Requirement, traceLinks: TraceLink[]) => {};

export const strategy = createStrategy(conditions, doNothing);
