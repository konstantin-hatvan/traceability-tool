import readdirRecursive from '../Shared/readdirRecursive';
import { Collector, CollectorCondition } from './types';

const combineConditions = (conditions: CollectorCondition[]): CollectorCondition => (file: string): boolean => conditions.every(condition => condition(file))

export const createCollector =
    (conditions: CollectorCondition[]): Collector =>
        (startingpoints: string[]): string[] =>
            startingpoints.reduce((result: string[], startingpoint: string) => result.concat(readdirRecursive(startingpoint).filter(combineConditions(conditions))), []);
