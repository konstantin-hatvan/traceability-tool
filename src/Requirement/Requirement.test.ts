import mock from 'mock-fs';
import { createRequirement, createRequirements, list } from './Requirement';
import { mockFileSystemData } from '../Test/TestUtility';

describe('Requirement', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

    describe('createRequirement()', () => {
        const testData = [
            'docs/requirement_02.md',
        ];

        test('returns the correct data shape', () => {
            testData.forEach(data => {
                expect(createRequirement(data)).toEqual(expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }));
            });
        });
    });

    describe('createRequirements()', () => {
        const testData = [
            'docs/requirement_01.md',
            'docs/requirement_02.md',
            'docs/nestedRequirements/requirement_03.md',
        ];

        test('returns a collection of requirement datastructures', () => {
            expect(createRequirements(testData)).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }),
            ]));
        });
    });

    describe('buildRequirements()', () => {
        const testData = {
            startingpoint: 'docs',
            excludes: [],
        };

        test('returns a collection of requirement datastructures', () => {
            expect(list(testData)).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }),
            ]));
        });
    });
});
