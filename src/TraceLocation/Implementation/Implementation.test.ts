import { Service } from './index';
import mock from 'mock-fs';
import { CollectorConfiguration } from '../../Shared/types';
import { Implementation } from '../types';

describe('TraceLocation', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    describe('Implementation', () => {
        test('Service.list(): lists all Implementations', () => {
            const configuration: CollectorConfiguration = {
                excludes: [
                    'docs',
                    'requirements',
                    'src/second-source\\.ts',
                    'src/third-source\\.ts',
                    'src/nested/second-source\\.ts',
                    'src/nested/third-source\\.ts',
                    'lib/second-source\\.ts',
                    'lib/third-source\\.ts',
                ],
                startingpoints: [
                    'src',
                    'lib',
                ],
            };

            mock({
                src: {
                    'source.ts': '@requirement #[ MyRequirement ]# #( Description )#', // startingpoint, annotation, !excluded
                    'second-source.ts': '@requirement #[ MyRequirement ]# #( Description )#', // startingpoint, annotation, excluded
                    'third-source.ts': 'Text', // startingpoint, !annotation, excluded
                    'fourth-source.ts': 'Text', // startingpoint, !annotation, !excluded
                    nested: {
                        'source.ts': '@requirement #[ MyRequirement ]# #( Description )#', // startingpoint, annotation, !excluded
                        'second-source.ts': '@requirement #[ MyRequirement ]# #( Description )#', // startingpoint, annotation, excluded
                        'third-source.ts': 'Text', // startingpoint, !annotation, excluded
                        'fourth-source.ts': 'Text', // startingpoint, !annotation, !excluded
                    }
                },
                lib: {
                    'source.ts': '@requirement #[ MyRequirement ]# #( Description )#', // startingpoint, annotation, !excluded
                    'second-source.ts': '@requirement #[ MyRequirement ]# #( Description )#', // startingpoint, annotation, excluded
                    'third-source.ts': 'Text', // startingpoint, !annotation, excluded
                    'fourth-source.ts': 'Text', // startingpoint, !annotation, !excluded
                },
                docs: {
                    'MyDoc.md': '@requirement #[ MyRequirement ]# #( Description )#', // !startingpoint, annotation, excluded
                },
                requirements: {
                    'MySecondRequirement.md': 'Text', // !startingpoint, !annotation, excluded
                },
                'MyTestFile.md': 'Text', // !startingpoint, !annotation, !excluded
                'MySecondTestFile.md': '@requirement #[ MyRequirement ]# #( Description )#', // !startingpoint, annotation, !excluded
            });

            const expectedResult: Implementation[] = [
                {
                    file: 'src/nested/source.ts',
                    type: 'implementation',
                },
                {
                    file: 'src/source.ts',
                    type: 'implementation',
                },
                {
                    file: 'lib/source.ts',
                    type: 'implementation',
                },
            ];

            expect(Service.list(configuration)).toEqual(expectedResult);
        });
    });
});
