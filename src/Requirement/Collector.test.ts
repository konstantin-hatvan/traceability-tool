import { collect } from './Collector';
import mock from 'mock-fs';
import { CollectorConfiguration } from '../types';
import { Console } from 'console';

describe('Requirement', () => {
    beforeEach(() => {
        console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Collector', () => {
        describe('collect()', () => {
            test('only collects files that have a frontmatter identifier', () => {
                mock({
                    'no-identifier.md': '# No identifier',
                    'requirement.md': '---\nid: requirement\n---\n\n# Requirement',
                });

                const configuration: CollectorConfiguration = {
                    excludes: [],
                    startingpoints: [
                        '**',
                    ],
                };

                const expectedResult: string[] = [
                    'requirement.md',
                ];

                expect(collect(configuration)).toEqual(expectedResult);
            });

            test('only collects markdown files', () => {
                mock({
                    'no-markdown.ts': 'console.log("Hello world");',
                    'requirement.md': '---\nid: requirement\n---\n\n# Requirement',
                });

                const configuration: CollectorConfiguration = {
                    excludes: [],
                    startingpoints: [
                        '**',
                    ],
                };

                const expectedResult: string[] = [
                    'requirement.md',
                ];

                expect(collect(configuration)).toEqual(expectedResult);
            });

            test('only collects files that are not excluded', () => {
                mock({
                    'excluded.md': '---\nid: requirement\n---\n\n# Requirement',
                    'requirement.md': '---\nid: requirement\n---\n\n# Requirement',
                });

                const configuration: CollectorConfiguration = {
                    excludes: [
                        'excluded.md',
                    ],
                    startingpoints: [
                        '**',
                    ],
                };

                const expectedResult: string[] = [
                    'requirement.md',
                ];

                expect(collect(configuration)).toEqual(expectedResult);
            });
        });
    });
});
