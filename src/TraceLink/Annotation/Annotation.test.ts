import { Requirement } from '../../Requirement/types';
import { Service } from './index';
import mock from 'mock-fs';
import { TraceLinkAnnotation } from '../types';

describe('TraceLink', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
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

            const files = [
                'source.ts',
                'MyRequirement.md',
            ];

            const expectedResult: TraceLinkAnnotation[] = [
                {
                    description: 'My description',
                    identifier: 'MyRequirement',
                    line: 1,
                    file: 'source.ts',
                },
                {
                    description: 'My second description',
                    identifier: 'MySecondRequirement',
                    line: 3,
                    file: 'MyRequirement.md',
                },
            ];

            const list = await Service.list(files);

            expect(list).toEqual(expectedResult);
        });
    });
});
