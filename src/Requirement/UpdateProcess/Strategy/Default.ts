import { TraceLink, Requirement, UpdateProcessCondition } from '../../../Shared/types';
import { createStrategy } from './Conditions';

const conditions: UpdateProcessCondition[] = [];

const doNothing = (requirement: Requirement, traceLinks: TraceLink[]) => {};

export const strategy = createStrategy(conditions, doNothing);
