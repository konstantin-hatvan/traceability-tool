import { CollectorCondition } from "./types";

/**
 * Check if the file is excluded
 * @param excludes A list RegEx patterns to exclude
 * @requirement #[ Requirement.Collect, TraceLink.Collect ]# #( Files must not be excluded )#
 */
export const isNotExcluded = (excludes: string[]): CollectorCondition => (file: string): boolean => excludes
    .map(exclude => new RegExp(exclude))
    .every(exclude => !exclude.test(file));
