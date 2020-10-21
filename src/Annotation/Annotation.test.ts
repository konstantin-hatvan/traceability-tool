import * as Service from './index';
import mock from 'mock-fs';
import { Annotation } from './types';
import { CollectorConfiguration } from '../types';

describe('TraceLink', () => {
    beforeEach(() => {
        // console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Annotation', () => {
        test('Service.list(): lists all annotations', async () => {
            mock({
                'source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // has annotation
                'source-2.ts': 'Text', // has no annotation
                'MyRequirement.md': `Text

<!-- @requirement #[ MySecondRequirement ]# #( My second description )# -->`, // has annotation
            });

            const configuration: CollectorConfiguration = {
                excludes: [],
                startingpoints: [
                    '**',
                ],
            };

            const expectedResult: Annotation[] = [
                {
                    description: 'My second description',
                    identifier: 'MySecondRequirement',
                    line: 3,
                    file: 'MyRequirement.md',
                },
                {
                    description: 'My description',
                    identifier: 'MyRequirement',
                    line: 1,
                    file: 'source.ts',
                },
            ];

            const list = await Service.list(configuration);

            expect(list).toEqual(expectedResult);
        });
    });
});
