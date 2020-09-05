import { TraceLink, Requirement } from '../../Shared/types';
import { createStrategy, UpdateProcessRule } from './Rules';

const rules: UpdateProcessRule[] = [];

const doNothing = (requirement: Requirement, traceLinks: TraceLink[]) => {};

export const strategy = createStrategy(rules, doNothing);
