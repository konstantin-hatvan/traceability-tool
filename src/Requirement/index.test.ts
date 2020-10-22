import * as fs from 'fs';
import { list, persist } from './index';
import mock from 'mock-fs';
import { CollectorConfiguration } from '../types';
import { Requirement } from './types';
import { parse } from './Markdown';
import { Console } from 'console';

describe('Requirement', () => {
    beforeEach(() => {
        console = new Console(process.stdout, process.stderr); // necessary because of mock-fs problem. Link: https://github.com/tschaub/mock-fs/issues/234
    });

    afterEach(mock.restore);

    describe('Service', () => {
        describe('list()', () => {
            test('lists all Requirements', () => {
                mock({
                    'requirement.md': '---\nid: requirement\n---\n\n# Requirement',
                    'excluded.md': '---\nid: requirement\n---\n\n# Requirement',
                    'no-identifier.md': '# Requirement',
                    'no-markdown.ts': 'console.log("Hello world");',
                });

                const configuration: CollectorConfiguration = {
                    excludes: [
                        'excluded.md',
                    ],
                    startingpoints: [
                        '**',
                    ],
                };

                const expectedResult: Requirement[] = [
                    {
                        ast: expect.objectContaining({
                            type: 'root',
                        }),
                        file: 'requirement.md',
                        id: 'requirement',
                    },
                ];

                expect(list(configuration)).toEqual(expectedResult);
            });
        });

        describe('persist()', () => {
            test('persists a Requirement', () => {
                // Original state
                mock({
                    'requirement.md': '---\nid: requirement\n---\n\n# Requirement',
                });

                const expectedContent = '---\nid: requirement\n---\n\n# Requirement\n\nThis is a new paragraph\n';
                const requirement: Requirement = {
                    ast: parse(expectedContent),
                    file: 'requirement.md',
                    id: 'requirement',
                };

                persist(requirement);

                expect(fs.readFileSync(requirement.file, { encoding: 'utf-8' })).toEqual(expectedContent);
            });
        });
    });
});
