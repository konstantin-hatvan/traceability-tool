type Condition = (input: any) => boolean;
type ConditionCombinator = (conditions: Condition[]) => Condition;

/**
 * Combine a list of conditions so that all have to be passed
 * @param conditions A list of conditions
 */
export const and: ConditionCombinator = conditions => input => conditions.every(condition => condition(input));
