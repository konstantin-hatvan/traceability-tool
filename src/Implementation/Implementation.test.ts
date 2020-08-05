import fs from 'fs';
import mock from 'mock-fs';
import { mockFileSystemData } from '../Test/TestUtility';
import {
    trimArray,
    splitCommaSeparatedList,
    fileHasRequirementAnnotation,
    stripComment,
    stripAnnotation,
    getRequirementIds,
    collectImplementations,
    createImplementations,
    list,
} from './Implementation';

describe('Implementation', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

    describe('trimArray()', () => {
        const testData = [
            ' value ',
            ' value',
            'value ',
            ' ',
        ];

        test('trims all array values', () => {
            expect(trimArray(testData)).toEqual([
                'value',
                'value',
                'value',
                '',
            ]);
        });
    });

    describe('splitCommaSeparatedList()', () => {
        const testData = 'REQ_01,REQ_02,REQ_03 , REQ_04 ';

        test('splits a comma separated list', () => {
            expect(splitCommaSeparatedList(testData)).toEqual([
                'REQ_01',
                'REQ_02',
                'REQ_03 ',
                ' REQ_04 ',
            ]);
        });
    });

    describe('fileHasRequirementAnnotation()', () => {
        const testData = [
            {
                file: 'src/Resources/Private/JavaScript/main.ts',
                expectedResult: true,
            },
            {
                file: 'docs/requirement_01.md',
                expectedResult: false,
            },

        ];

        test('categorizes files correctly', () => {
            testData.forEach(({ file, expectedResult }) => {
                expect(fileHasRequirementAnnotation(file)).toEqual(expectedResult);
            });
        });
    });

    describe('stripComment()', () => {
        const testData = [
            {
                input: '// @requirement',
                expectedResult: '@requirement',
            },
            {
                input: '// @requirement REQ_01',
                expectedResult: '@requirement REQ_01',
            },
            {
                input: '// @requirement REQ_01, REQ_02',
                expectedResult: '@requirement REQ_01, REQ_02',
            },
            {
                input: '/* @requirement REQ_01, REQ_02',
                expectedResult: '@requirement REQ_01, REQ_02',
            },
            {
                input: '/** @requirement REQ_01, REQ_02',
                expectedResult: '@requirement REQ_01, REQ_02',
            },
            {
                input: '//@requirement REQ_01, REQ_02',
                expectedResult: '@requirement REQ_01, REQ_02',
            },
            {
                input: '/*@requirement REQ_01, REQ_02',
                expectedResult: '@requirement REQ_01, REQ_02',
            },
            {
                input: '/**@requirement REQ_01, REQ_02',
                expectedResult: '@requirement REQ_01, REQ_02',
            },
            {
                input: 'this is just an example to illustrate how this method works @requirement REQ_01, REQ_02',
                expectedResult: '@requirement REQ_01, REQ_02',
            },
            {
                input: '/** @requirement REQ_01, REQ_02 */ the parts at the end stay',
                expectedResult: '@requirement REQ_01, REQ_02 */ the parts at the end stay',
            },
        ];

        test('strip the comments from the beginning of the code line', () => {
            testData.forEach(({ input, expectedResult }) => {
                expect(stripComment(input)).toEqual(expectedResult);
            });
        });
    });

    describe('stripAnnotation()', () => {
        const testData = [
            {
                input: '@requirement',
                expectedResult: '',
            },
            {
                input: '@requirement REQ_01',
                expectedResult: 'REQ_01',
            },
        ];

        test('strip the annotations from the beginning of the code line', () => {
            testData.forEach(({ input, expectedResult }) => {
                expect(stripAnnotation(input)).toEqual(expectedResult);
            });
        });
    });

    describe('getRequirementIds()', () => {
        const testData = [
            {
                input: ' * @requirement REQ_01, REQ_02',
                expectedResult: [
                    'REQ_01',
                    'REQ_02',
                ],
            },
            {
                input: '// @requirement REQ_01, REQ_02',
                expectedResult: [
                    'REQ_01',
                    'REQ_02',
                ],
            },
        ];

        test('extracts requirement Ids from code comments', () => {
            testData.forEach(({ input, expectedResult }) => {
                expect(getRequirementIds(input)).toEqual(expectedResult);
            });
        });
    });

    describe('collectImplementations()', () => {
        const testData = 'src';

        test('returns an array of strings', () => {
            const implementations = collectImplementations(testData);

            implementations.forEach(implementation => {
                expect(implementation).toMatch(/[a-z0-9]*/);
            });
        });

        test('returns an array of filesystem paths', () => {
            const implementations = collectImplementations(testData);

            implementations.forEach(implementation => {
                expect(fs.statSync(implementation).isFile()).toBeTruthy();
            });
        });
    });

    describe('createImplementations()', () => {
        const testData = [
            'src/Resources/Private/JavaScript/main.ts',
            'src/Resources/Private/Scss/styles.scss',
        ];

        test('creates a list implementation data structures', async () => {
            const implementations = await createImplementations(testData);

            expect(implementations).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: 'implementation',
                    file: expect.any(String),
                    line: expect.any(Number),
                    requirement: expect.any(String),
                })
            ]));
        });
    });

    describe('list()', () => {
        const testData = 'src';

        test('returns a list of implementation data structures', async () => {
            const implementations = await list(testData);

            expect(implementations).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: 'implementation',
                    file: expect.any(String),
                    line: expect.any(Number),
                    requirement: expect.any(String),
                })
            ]));
        });
    });
});
