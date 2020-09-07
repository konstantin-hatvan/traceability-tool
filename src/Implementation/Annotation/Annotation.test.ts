import { parse } from './Annotation';
import mock from 'mock-fs';

describe('Implementation/Annotation:parse()', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    const testCases = [
        {
            // Regular Case
            configuration: '@requirement',
            rawAnnotation: '/** @requirement [MyRequirement] (My Description) */',
            expectedResult: {
                description: 'My Description',
                requirements: [
                    'MyRequirement'
                ],
            },
        },
        {
            // Multiple Requirement Identifiers
            configuration: '@requirement',
            rawAnnotation: '/** @requirement [MyRequirement, MySecondRequirement] (My Description) */',
            expectedResult: {
                description: 'My Description',
                requirements: [
                    'MyRequirement',
                    'MySecondRequirement',
                ],
            },
        },
        {
            // Different annotation
            configuration: '@myannotation',
            rawAnnotation: '/** @myannotation [MyRequirement, MySecondRequirement] (My Description) */',
            expectedResult: {
                description: 'My Description',
                requirements: [
                    'MyRequirement',
                    'MySecondRequirement',
                ],
            },
        },
        {
            // Weird whitespace
            configuration: '@requirement',
            rawAnnotation: '/** @requirement [ MyRequirement,    MySecondRequirement ] (  My Description     ) */',
            expectedResult: {
                description: 'My Description',
                requirements: [
                    'MyRequirement',
                    'MySecondRequirement',
                ],
            },
        },
        {
            // Single line comment
            configuration: '@requirement',
            rawAnnotation: '// @requirement [ MyRequirement, MySecondRequirement ] ( My Description )',
            expectedResult: {
                description: 'My Description',
                requirements: [
                    'MyRequirement',
                    'MySecondRequirement',
                ],
            },
        },
    ];

    testCases.forEach(({ configuration, rawAnnotation, expectedResult }) => {
        test(`parses ${rawAnnotation} correctly`, () => {
            expect(parse(rawAnnotation, configuration)).toEqual(expectedResult)
        });
    });

});
