import { collect } from './Collector';
import mock from 'mock-fs';
import { CollectorConfiguration } from '../types';

describe('Annotation', () => {
    beforeEach(() => {
        // console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Collector', () => {
        describe('collect()', () => {
            test('only collects files that are not excluded', () => {
                mock({
                    src: {
                        'excluded.ts': '@requirement #[ ID ]# #( Description )#',
                        'main.ts': '@requirement #[ ID ]# #( Description )#',
                    },
                });

                const configuration: CollectorConfiguration = {
                    startingpoints: [
                        'src/**',
                    ],
                    excludes: [
                        'excluded.ts',
                    ],
                };

                const expectedResult: string[] = [
                    'src/main.ts',
                ];

                expect(collect(configuration)).toEqual(expectedResult);
            });

            test('only collects files that have an annotation', () => {
                mock({
                    src: {
                        'no-annotation.ts': 'console.log("Hello world");',
                        'main.ts': '@requirement #[ ID ]# #( Description )#',
                    },
                });

                const configuration: CollectorConfiguration = {
                    startingpoints: [
                        'src/**',
                    ],
                    excludes: [],
                };

                const expectedResult: string[] = [
                    'src/main.ts',
                ];

                expect(collect(configuration)).toEqual(expectedResult);
            });

            test('only collects files that match all conditions', () => {
                mock({
                    src: {
                        'no-annotation.ts': 'console.log("Hello world");',
                        'excluded.ts': '@requirement #[ ID ]# #( Description )#',
                        'main.ts': '@requirement #[ ID ]# #( Description )#',
                    },
                });

                const configuration: CollectorConfiguration = {
                    startingpoints: [
                        'src/**',
                    ],
                    excludes: [
                        'excluded.ts'
                    ],
                };

                const expectedResult: string[] = [
                    'src/main.ts',
                ];

                expect(collect(configuration)).toEqual(expectedResult);
            });
        });
    });
});
