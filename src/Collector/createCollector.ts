import readdirRecursive from '../Shared/readdirRecursive';
import { Collector, CollectorCondition } from './types';

/**
 * Combine conditions so that all have to be passed
 * @param conditions The list of conditions
 * @requirement #[ Requirement.Collect, TraceLink.Collect ]# #( All conditions have to be passed )#
 */
const combineConditions = (conditions: CollectorCondition[]): CollectorCondition => (file: string): boolean => conditions.every(condition => condition(file))

/**
 * Walk the file system recursively and collect all files that pass all conditions
 * @param conditions The list of conditions
 * @param startingpoints The list of startingpoints
 * @requirement #[ Requirement.Collect, TraceLink.Collect ]# #( All files that are within the startingpoints and pass all conditions are collected )#
 */
export const createCollector =
    (conditions: CollectorCondition[]): Collector =>
        (startingpoints: string[]): string[] =>
            startingpoints.reduce((result: string[], startingpoint: string) => result.concat(readdirRecursive(startingpoint).filter(combineConditions(conditions))), []);
