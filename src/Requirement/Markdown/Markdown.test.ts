import { createTraceyBlock, parse, parseFrontmatter, stringify } from './index';
import mock from 'mock-fs';
import { TraceLink } from '../../TraceLink/types';
import { Requirement } from '../types';

describe('TraceLocation', () => {
    beforeEach(() => {
        // console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Requirement', () => {
        test('Markdown.parse(): parses a Markdown Document into an abstract syntax tree', () => {
            const content = `---
id: MyRequirement
---

# My Requirement
`;
            const expectedResult = expect.objectContaining({
                children: expect.arrayContaining([
                    expect.objectContaining({
                        type: 'yaml',
                        value: 'id: MyRequirement',
                    }),
                    expect.objectContaining({
                        type: 'heading',
                    }),
                ]),
                type: 'root',
            });

            expect(parse(content)).toEqual(expectedResult);
        });

        test('Markdown.parseFrontmatter(): parses AST frontmatter into object', () => {
            const content = `---
id: MyRequirement
---

# My Requirement
`;
            const ast = parse(content);
            const expectedResult = {
                id: 'MyRequirement',
            };

            expect(parseFrontmatter(ast)).toEqual(expectedResult);
        });

        test('Markdown.stringify(): stringifies Markdown AST', () => {
            const content = `---
id: MyRequirement
---

# My Requirement
`;
            const ast = parse(content);

            expect(stringify(ast)).toEqual(content);
        });

        test('Markdown.createTraceyBlock(): creates a Tracey AST block', () => {
            const requirements: Requirement[] = [
                {
                    ast: {
                        children: [],
                        type: 'root',
                    },
                    file: 'requirements/MyRequirement.md',
                    id: 'MyRequirement',
                },
            ];

            const traceLinks: TraceLink[] = [
                {
                    annotation: {
                        file: 'src/source.ts',
                        description: 'Description',
                        identifier: 'MyRequirement',
                        line: 1
                    },
                    destination: requirements[0],
                },
            ];

            const expectedResult = expect.arrayContaining([
                expect.objectContaining({
                    type: 'html',
                    value: '<div class="tracey">',
                }),
                expect.objectContaining({
                    type: 'table',
                }),
                expect.objectContaining({
                    type: 'html',
                    value: '</div>',
                }),
            ]);

            expect(createTraceyBlock(traceLinks)).toEqual(expectedResult);
        });
    });
});
