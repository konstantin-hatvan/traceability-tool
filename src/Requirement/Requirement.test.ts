import fs from 'fs';
import path from 'path';
import mock from 'mock-fs';
import {
    collectRequirements,
    parseMarkdownFile,
    parseFrontmatter,
    getRequirementId,
    createRequirement,
    createRequirements,
    list,
    update,
    stringifyMarkdown,
} from './Requirement';
import {
    mockFileSystemData,
    mockAbstractSyntaxTree,
} from '../Test/TestUtility';
import { Requirement } from '../Shared/types';
import { Node, Parent } from 'unist';

describe('Requirement', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

    describe('collectRequirements()', () => {
        test('returns an array of strings', () => {
            const requirements = collectRequirements('docs', []);

            requirements.forEach(requirement => {
                expect(requirement).toMatch(/[a-z0-9]*/);
            });
        });

        test('returns an array of filesystem paths', () => {
            const requirements = collectRequirements('docs', []);

            requirements.forEach(requirement => {
                expect(fs.statSync(requirement).isFile()).toBeTruthy();
            });
        });

        test('returns an array of markdown files', () => {
            const requirements = collectRequirements('docs', []);

            requirements.forEach(requirement => {
                expect(path.parse(requirement).ext).toEqual('.md');
            });
        });
    });

    describe('parseMarkdownFile()', () => {
        const testData = [
            'docs/requirement_01.md',
        ];

        test('returns an abstract syntax tree', () => {
            testData.forEach(data => {
                expect(parseMarkdownFile(data)).toEqual(expect.objectContaining({
                    type: 'root',
                    children: expect.any(Array)
                }));
            });
        });
    });

    describe('parseFrontmatter()', () => {
        const testData = mockAbstractSyntaxTree();

        test('parses frontmatter into an object', () => {
            expect(parseFrontmatter(testData)).toEqual(expect.objectContaining({
                id: expect.any(String),
            }));
        });
    });

    describe('getRequirementId()', () => {
        const testData = mockAbstractSyntaxTree();

        test('returns the correct id', () => {
            expect(getRequirementId(testData)).toEqual('REQ_01');
        });
    });

    describe('createRequirement()', () => {
        const testData = [
            'docs/requirement_02.md',
        ];

        test('returns the correct data shape', () => {
            testData.forEach(data => {
                expect(createRequirement(data)).toEqual(expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }));
            });
        });
    });

    describe('createRequirements()', () => {
        const testData = [
            'docs/requirement_01.md',
            'docs/requirement_02.md',
            'docs/nestedRequirements/requirement_03.md',
        ];

        test('returns a collection of requirement datastructures', () => {
            expect(createRequirements(testData)).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }),
            ]));
        });
    });

    describe('buildRequirements()', () => {
        const testData = {
            startingpoint: 'docs',
            excludes: [],
        };

        test('returns a collection of requirement datastructures', () => {
            expect(list(testData)).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }),
            ]));
        });
    });

    describe('addTraceabilityInformation()', () => {
        const requirement: Requirement = {
            type: 'requirement',
            ast: mockAbstractSyntaxTree(),
            file: 'docs/requirement_01.md',
            id: 'REQ_01'
        };

        const traceyBlock: Node[] = [
            {
                type: 'html',
                value: '<div class="tracey">'
            },
            {
                type: 'table',
                children: [
                    {
                        type: ' tableRow',
                        children: [
                            {
                                type: 'tableCell',
                                children: [
                                    {
                                        type: 'text',
                                        value: 'Traceability Link',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: ' tableRow',
                        children: [
                            {
                                type: 'tableCell',
                                children: [
                                    {
                                        type: 'text',
                                        value: '../src/Resources/Private/JavaScript/main.ts#L1',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: ' tableRow',
                        children: [
                            {
                                type: 'tableCell',
                                children: [
                                    {
                                        type: 'text',
                                        value: '../src/Resources/Private/Scss/styles.scss#L3',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'html',
                value: '</div>'
            },
        ];

        test('add the traceabilityInformation to the end of the AST', () => {
            const updatedRequirement = update(requirement, traceyBlock);
            const ast = <Parent>updatedRequirement.ast;

            const [beginBlock] = ast.children.slice(-3, -2);
            const [table] = ast.children.slice(-2, -1);
            const [endBlock] = ast.children.slice(-1);

            expect(beginBlock).toEqual(traceyBlock[0]);
            expect(table).toEqual(traceyBlock[1]);
            expect(endBlock).toEqual(traceyBlock[2]);
        });
    });

    describe('stringifyMarkdown()', () => {
        test('stringifies an AST into a correct MarkDown string', () => {
            const testData = mockAbstractSyntaxTree();

            expect(stringifyMarkdown(testData)).toEqual(`---
id: REQ_01
other-key: other value
---

# Requirement 1
`);
        });

        test('stringifies an AST with requirements information into a correct MarkDown string', () => {
            const requirement: Requirement = {
                type: 'requirement',
                ast: mockAbstractSyntaxTree(),
                file: 'docs/requirement_01.md',
                id: 'REQ_01'
            };

            const traceyBlock: Node[] = [
                {
                    type: 'html',
                    value: '<div class="tracey">'
                },
                {
                    type: 'table',
                    children: [
                        {
                            type: ' tableRow',
                            children: [
                                {
                                    type: 'tableCell',
                                    children: [
                                        {
                                            type: 'text',
                                            value: 'Traceability Link',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: ' tableRow',
                            children: [
                                {
                                    type: 'tableCell',
                                    children: [
                                        {
                                            type: 'text',
                                            value: '../src/Resources/Private/JavaScript/main.ts#L1',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: ' tableRow',
                            children: [
                                {
                                    type: 'tableCell',
                                    children: [
                                        {
                                            type: 'text',
                                            value: '../src/Resources/Private/Scss/styles.scss#L3',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'html',
                    value: '</div>'
                },
            ];

            const updatedRequirement = update(requirement, traceyBlock);

            expect(stringifyMarkdown(updatedRequirement.ast)).toEqual(`---
id: REQ_01
other-key: other value
---

# Requirement 1

<div class="tracey">

| Traceability Link                              |
| ---------------------------------------------- |
| ../src/Resources/Private/JavaScript/main.ts#L1 |
| ../src/Resources/Private/Scss/styles.scss#L3   |

</div>
`);
        });
    });
});
