import {
    createText,
    createLink,
    createTableCell,
    createTableRow,
    createTable,
    createTraceyBlock
} from './Markdown';
import { Link, TableCell, Table, TableRow } from 'mdast';

describe('MarkdownGenerator', () => {
    describe('createText()', () => {
        const testData = [
            '',
            'Test string',
        ];

        test('creates a Text AST node', () => {
            testData.forEach(data => {
                expect(createText(data)).toEqual(expect.objectContaining({
                    type: 'text',
                    value: expect.any(String),
                }));
            })
        });
    });

    describe('createLink()', () => {
        const testData = [
            {
                value: 'test',
                url: 'https://www.google.com'
            },
            {
                value: 'test',
                url: ''
            },
            {
                value: '',
                url: 'https://www.google.com'
            },
            {
                value: '',
                url: ''
            },
        ];

        test('creates a Link AST node', () => {
            testData.forEach(({ value, url }) => {
                expect(createLink(value, url)).toEqual(expect.objectContaining({
                    type: 'link',
                    children: [
                        {
                            type: 'text',
                            value,
                        }
                    ],
                    url,
                }));
            });
        });
    });

    describe('createTableCell()', () => {
        test('creates a TableCell AST node from a Link Node', () => {
            const testData: Link[] = [
                {
                    type: 'link',
                    children: [
                        {
                            type: 'text',
                            value: 'Value',
                        }
                    ],
                    url: 'https://www.google.com'
                },
                {
                    type: 'link',
                    children: [
                        {
                            type: 'text',
                            value: '',
                        }
                    ],
                    url: 'https://www.google.com'
                },
                {
                    type: 'link',
                    children: [
                        {
                            type: 'text',
                            value: 'Value',
                        }
                    ],
                    url: ''
                },
                {
                    type: 'link',
                    children: [
                        {
                            type: 'text',
                            value: '',
                        }
                    ],
                    url: ''
                },
            ];

            testData.forEach(data => {
                expect(createTableCell(data)).toEqual(expect.objectContaining({
                    type: 'tableCell',
                    children: expect.arrayContaining([
                        expect.objectContaining({
                            type: 'link',
                            children: [
                                {
                                    type: 'text',
                                    value: expect.any(String),
                                }
                            ],
                            url: expect.any(String),
                        })
                    ])
                }));
            });
        });

        test('creates a TableCell AST node from a string', () => {
            const testData = [
                '',
                'Test string',
            ];

            testData.forEach(data => {
                expect(createTableCell(data)).toEqual(expect.objectContaining({
                    type: 'tableCell',
                    children: expect.arrayContaining([
                        expect.objectContaining({
                            type: 'text',
                            value: expect.any(String),
                        })
                    ])
                }));
            });
        });
    });

    describe('createTableRow()', () => {
        const testData: TableCell[] = [
            {
                type: 'tableCell',
                children: [
                    {
                        type: 'link',
                        url: 'https://www.google.com',
                        children: [
                            {
                                type: 'text',
                                value: 'Test String',
                            },
                        ],
                    },
                ],
            },
            {
                type: 'tableCell',
                children: [
                    {
                        type: 'text',
                        value: 'Test String',
                    },
                ],
            },
        ];

        test('creates a TableRow AST node', () => {
            testData.forEach(data => {
                expect(createTableRow(data)).toEqual(expect.objectContaining({
                    type: 'tableRow',
                    children: expect.arrayContaining([
                        expect.objectContaining({
                            type: expect.any(String)
                        })
                    ])
                }));
            });
        });
    });

    describe('createTable()', () => {
        const testData: TableRow[] = [
            {
                type: 'tableRow',
                children: [
                    {
                        type: 'tableCell',
                        children: [
                            {
                                type: 'link',
                                url: 'https://www.google.com',
                                children: [
                                    {
                                        type: 'text',
                                        value: 'Test String',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'tableRow',
                children: [
                    {
                        type: 'tableCell',
                        children: [
                            {
                                type: 'text',
                                value: 'Test String',
                            },
                        ],
                    },
                ],
            },
        ];

        test('creates a Table AST node', () => {
            expect(createTable(testData)).toEqual(expect.objectContaining({
                type: 'table',
                children: expect.arrayContaining([
                    expect.objectContaining({
                        type: 'tableRow',
                        children: expect.any(Array)
                    })
                ])
            }));
        });

        test('creates a table header', () => {
            expect(createTable(testData).children[0].children[0].children[0]).toEqual(expect.objectContaining({
                type: 'text',
                value: 'Traceability Link',
            }));
        });
    });

    describe('createTraceyBlock()', () => {
        const testData: Table = {
            type: 'table',
            children: [
                {
                    type: 'tableRow',
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
                    type: 'tableRow',
                    children: [
                        {
                            type: 'tableCell',
                            children: [
                                {
                                    type: 'text',
                                    value: 'test-string',
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'tableRow',
                    children: [
                        {
                            type: 'tableCell',
                            children: [
                                {
                                    type: 'text',
                                    value: 'another test-string',
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        test('creates a Table AST Node in between HTML AST Nodes', () => {
            expect(createTraceyBlock(testData)).toEqual(expect.arrayContaining([
                {
                    type: 'html',
                    value: '<div class="tracey">'
                },
                testData,
                {
                    type: 'html',
                    value: '</div>'
                },
            ]));
        });
    });
});
