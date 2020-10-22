import { createCollector,CollectorCondition } from './Collector';
import mock from 'mock-fs';
import { CollectorConfiguration } from '../types';
import path from 'path';

describe('Common', () => {
    beforeEach(() => {
        // console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Collector', () => {
        describe('createCollector()', () => {
            test('creates a Collector', () => {
                mock({
                    'main.ts': 'console.log("Hello world");',
                    'excluded.ts': 'console.log("Hello world");',
                    'requirement.md': '# Requirement',
                });

                const configuration: CollectorConfiguration = {
                    excludes: [
                        'requirement.md',
                    ],
                    startingpoints: [
                        '**',
                    ],
                };

                const conditions: CollectorCondition[] = [
                    (file: string) => path.parse(file).ext === '.ts',
                    (file: string) => path.parse(file).name === 'main',
                ];

                const files = createCollector(configuration, conditions);

                const expectedResult: string[] = [
                    'main.ts',
                ];

                expect(files).toEqual(expectedResult);
            });
        });
    });
});
