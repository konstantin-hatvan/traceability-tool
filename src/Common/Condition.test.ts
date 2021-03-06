import { and } from './Condition';

describe('Common', () => {
    describe('conditions', () => {
        describe('and()', () => {
            test('combines conditions using a logical and', () => {
                const conditions = [
                    (input: number) => input > 10,
                    (input: number) => input < 12,
                ];

                const combinedCondition = and(conditions);

                const testData = [
                    {
                        input: 0,
                        expectedResult: false,
                    },
                    {
                        input: 10,
                        expectedResult: false,
                    },
                    {
                        input: 11,
                        expectedResult: true,
                    },
                    {
                        input: 12,
                        expectedResult: false,
                    },
                    {
                        input: 100,
                        expectedResult: false,
                    },
                ];

                testData.forEach(({ input, expectedResult }) => {
                    expect(combinedCondition(input)).toEqual(expectedResult);
                });
            });
        });
    });
});
