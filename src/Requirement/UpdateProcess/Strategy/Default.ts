import { TraceLink, Requirement } from '../../../Shared/types';
import { UpdateProcessCondition } from '../UpdateProcess';
import { createStrategy } from './Conditions';

const conditions: UpdateProcessCondition[] = [];

const doNothing = (requirement: Requirement, traceLinks: TraceLink[]) => {};

export const strategy = createStrategy(conditions, doNothing);
