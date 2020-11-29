/**
 * Do nothing
 * This should never happen
 */
export const defaultStrategy = {
    shouldExecute: () => true,
    execute: () => { return; },
};
