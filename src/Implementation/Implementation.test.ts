import mock from 'mock-fs';
import { mockFileSystemData } from '../Test/TestUtility';
import { createImplementations, list } from './Implementation';

describe('Implementation', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

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
        const testData = {
            startingpoint: 'src',
            excludes: []
        };

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
