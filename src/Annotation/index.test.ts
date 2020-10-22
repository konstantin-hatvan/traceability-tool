import { list } from './index';
import mock from 'mock-fs';
import { Annotation } from './types';
import { CollectorConfiguration } from '../types';

describe('Annotation', () => {
    beforeEach(() => {
        // console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Component', () => {
        describe('list()', () => {
            test('lists all Annotations', async () => {
                mock({
                    'main.ts': '@requirement #[ ID ]# #( Description )#',
                    'excluded.ts': '@requirement #[ ID ]# #( Description )#',
                    'no-annotation.ts': 'console.log("Hello world");',
                    'multiple.ts': `@requirement #[ ID ]# #( Description )#
                                    @requirement #[ ID2 ]# #( Description 2 )#`,
                });

                const configuration: CollectorConfiguration = {
                    excludes: [
                        'excluded.ts',
                    ],
                    startingpoints: [
                        '**',
                    ],
                };

                const expectedResult: Annotation[] = [
                    {
                        description: 'Description',
                        file: 'main.ts',
                        identifier: 'ID',
                        line: 1,
                    },
                    {
                        description: 'Description',
                        file: 'multiple.ts',
                        identifier: 'ID',
                        line: 1,
                    },
                    {
                        description: 'Description 2',
                        file: 'multiple.ts',
                        identifier: 'ID2',
                        line: 2,
                    },
                ];

                const annotations = await list(configuration);

                expect(annotations).toEqual(expectedResult);
            });
        });
    });
});
