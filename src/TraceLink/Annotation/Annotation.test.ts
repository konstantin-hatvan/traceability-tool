import { TraceLocation } from '../../TraceLocation/types';
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
            const traceLocations: TraceLocation[] = [
                {
                    type: 'implementation',
                    file: 'src/source.ts',
                },
                {
                    type: 'implementation',
                    file: 'src/source-2.ts',
                },
                {
                    type: 'requirement',
                    file: 'requirements/MyRequirement.md',
                },
                {
                    type: 'requirement',
                    file: 'requirements/MySecondRequirement.md',
                },
            ];

            mock({
                src: {
                    'source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // has annotation
                    'source-2.ts': 'Text', // has no annotation
                },
                requirements: {
                    'MyRequirement.md': `Text

<!-- @requirement #[ MySecondRequirement ]# #( My second description )# -->`, // has annotation
                    'MySecondRequirement.md': 'Text', // has no annotation
                },
            });

            const expectedResult: TraceLinkAnnotation[] = [
                {
                    description: 'My description',
                    identifier: 'MyRequirement',
                    line: 1,
                    location: {
                        file: 'src/source.ts',
                        type: 'implementation',
                    },
                },
                {
                    description: 'My second description',
                    identifier: 'MySecondRequirement',
                    line: 3,
                    location: {
                        file: 'requirements/MyRequirement.md',
                        type: 'requirement',
                    },
                },
            ];

            const list = await Service.list(traceLocations);

            expect(list).toEqual(expectedResult);
        });
    });
});
