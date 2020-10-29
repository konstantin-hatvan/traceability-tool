import { Annotation } from '../Annotation/types';
import { Requirement } from '../Requirement/types';
import { PluginParameters } from '../types';
import { plugin } from './index';

describe('Core', () => {
    describe('plugin()', () => {
        test('generates tracelink table for requirement when tracelinks exist', () => {
            const annotation: Annotation = {
                description: 'Description',
                file: 'main.ts',
                identifier: 'requirement',
                line: 10,
            };
            const requirementBefore: Requirement = {
                ast: {
                    type: 'root',
                    children: [
                        {
                            type: 'yaml',
                            value: 'id: requirement',
                        },
                        {
                            type: 'heading',
                            depth: 1,
                            children: [
                                {
                                    type: 'text',
                                    value: 'Requirement'
                                }
                            ],
                        }
                    ],
                },
                file: 'requirement.md',
                id: 'requirement',
            };
            const input: PluginParameters = {
                annotations: [
                    annotation,
                ],
                requirements: [
                    requirementBefore,
                ],
                tracelinks: [
                    {
                        annotation,
                        destination: requirementBefore
                    },
                ],
            };
            const requirementAfter: Requirement = {
                ...requirementBefore,
                ast: {
                    type: 'root',
                    children: [
                        ...requirementBefore.ast.children,
                        {
                            type: 'html',
                            value: '<div class="tracey tracey-plugin-tracelinktable">'
                        },
                        {
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
                                                    value: 'File',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Line',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Description',
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
                                                    type: 'link',
                                                    url: 'main.ts#L10',
                                                    title: 'main.ts',
                                                    children: [
                                                        {
                                                            type: 'text',
                                                            value: 'main.ts',
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
                                                    value: '10',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Description',
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
                    ],
                },
            };
            const expectedOutput: PluginParameters = {
                annotations: [ annotation ],
                requirements: [ requirementAfter ],
                tracelinks: [
                    {
                        annotation,
                        destination: requirementBefore
                    }
                ],
            };

            expect(plugin(input)).toEqual(expectedOutput);
        });

        test('updates tracelink table for requirement when tracelink table already exists', () => {
            const annotation: Annotation = {
                description: 'Description',
                file: 'main.ts',
                identifier: 'requirement',
                line: 10,
            };
            const anotherAnnotation: Annotation = {
                description: 'Another Description',
                file: 'another.ts',
                identifier: 'requirement',
                line: 12,
            };
            const requirementBefore: Requirement = {
                ast: {
                    type: 'root',
                    children: [
                        {
                            type: 'yaml',
                            value: 'id: requirement',
                        },
                        {
                            type: 'heading',
                            depth: 1,
                            children: [
                                {
                                    type: 'text',
                                    value: 'Requirement'
                                }
                            ],
                        },
                        {
                            type: 'html',
                            value: '<div class="tracey tracey-plugin-tracelinktable">'
                        },
                        {
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
                                                    value: 'File',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Line',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Description',
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
                                                    type: 'link',
                                                    url: 'main.ts#L10',
                                                    title: 'main.ts',
                                                    children: [
                                                        {
                                                            type: 'text',
                                                            value: 'main.ts',
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
                                                    value: '10',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Description',
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
                    ],
                },
                file: 'requirement.md',
                id: 'requirement',
            };
            const input: PluginParameters = {
                annotations: [
                    annotation,
                    anotherAnnotation,
                ],
                requirements: [
                    requirementBefore,
                ],
                tracelinks: [
                    {
                        annotation,
                        destination: requirementBefore
                    },
                    {
                        annotation: anotherAnnotation,
                        destination: requirementBefore
                    },
                ],
            };
            const requirementAfter: Requirement = {
                ...requirementBefore,
                ast: {
                    type: 'root',
                    children: [
                        requirementBefore.ast.children[0],
                        requirementBefore.ast.children[1],
                        {
                            type: 'html',
                            value: '<div class="tracey tracey-plugin-tracelinktable">'
                        },
                        {
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
                                                    value: 'File',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Line',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Description',
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
                                                    type: 'link',
                                                    url: 'main.ts#L10',
                                                    title: 'main.ts',
                                                    children: [
                                                        {
                                                            type: 'text',
                                                            value: 'main.ts',
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
                                                    value: '10',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Description',
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
                                                    type: 'link',
                                                    url: 'another.ts#L12',
                                                    title: 'another.ts',
                                                    children: [
                                                        {
                                                            type: 'text',
                                                            value: 'another.ts',
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
                                                    value: '12',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Another Description',
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
                    ],
                },
            };
            const expectedOutput: PluginParameters = {
                annotations: [ annotation, anotherAnnotation ],
                requirements: [ requirementAfter ],
                tracelinks: [
                    {
                        annotation,
                        destination: requirementBefore
                    },
                    {
                        annotation: anotherAnnotation,
                        destination: requirementBefore
                    }
                ],
            };

            expect(plugin(input)).toEqual(expectedOutput);
        });

        test('removes tracelink table for requirement when no tracelinks exist', () => {
            const requirementBefore: Requirement = {
                ast: {
                    type: 'root',
                    children: [
                        {
                            type: 'yaml',
                            value: 'id: requirement',
                        },
                        {
                            type: 'heading',
                            depth: 1,
                            children: [
                                {
                                    type: 'text',
                                    value: 'Requirement'
                                }
                            ],
                        },
                        {
                            type: 'html',
                            value: '<div class="tracey tracey-plugin-tracelinktable">'
                        },
                        {
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
                                                    value: 'File',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Line',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Description',
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
                                                    type: 'link',
                                                    url: 'main.ts#L10',
                                                    title: 'main.ts',
                                                    children: [
                                                        {
                                                            type: 'text',
                                                            value: 'main.ts',
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
                                                    value: '10',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'tableCell',
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: 'Description',
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
                    ],
                },
                file: 'requirement.md',
                id: 'requirement',
            };
            const input: PluginParameters = {
                annotations: [],
                requirements: [ requirementBefore ],
                tracelinks: [ ],
            };
            const requirementAfter: Requirement = {
                ...requirementBefore,
                ast: {
                    type: 'root',
                    children: [
                        requirementBefore.ast.children[0],
                        requirementBefore.ast.children[1],
                    ],
                },
            };
            const expectedOutput: PluginParameters = {
                annotations: [],
                requirements: [ requirementAfter ],
                tracelinks: [],
            };

            expect(plugin(input)).toEqual(expectedOutput);
        });
    });
});
