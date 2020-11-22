import { list } from './index';
import mock from 'mock-fs';
import { Requirement } from '../Requirement/types';
import { Tracelink } from './types';
import { Annotation } from '../Annotation/types';
import { Console } from 'console';

describe('Tracelink', () => {
    beforeEach(() => {
        console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Component', () => {
        describe('list()', () => {
            test('lists all Tracelinks', () => {
                mock({
                    'MyRequirement.md': `---\nid: MyRequirement\n---\n`,
                    'source.ts': '@requirement #[ MyRequirement ]# #( My description )#',
                    'not-existing.ts': '@requirement #[ MyNotExistingRequirement ]# #( My description )#',
                });

                const requirements: Requirement[] = [
                    {
                        ast: {
                            type: 'root',
                            children: [],
                        },
                        file: 'MyRequirement.md',
                        id: 'MyRequirement',
                    },
                ];

                const annotations: Annotation[] = [
                    {
                        description: 'My description',
                        file: 'source.ts',
                        identifier: 'MyRequirement',
                        line: 1,
                    },
                    {
                        description: 'My description',
                        file: 'not-existing.ts',
                        identifier: 'MyNotExistingRequirement',
                        line: 1,
                    },
                ];

                const expectedResult: Tracelink[] = [
                    {
                        annotation: {
                            description: 'My description',
                            identifier: 'MyRequirement',
                            line: 1,
                            file: 'source.ts',
                        },
                        requirement: {
                            ast: expect.objectContaining({
                                type: 'root',
                            }),
                            file: 'MyRequirement.md',
                            id: 'MyRequirement',
                        },
                    },
                ];

                const tracelinks = list(requirements, annotations);

                expect(tracelinks).toEqual(expectedResult);
            });
        });
    });
});
