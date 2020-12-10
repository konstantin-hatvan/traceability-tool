import { Annotation } from '../../Annotation/types';
import { Requirement } from '../../Requirement/types';
import { updateStrategy } from './Update';

describe('Core', () => {
    describe('Update', () => {
        test('does not execute when no Annotations exist', () => {
            const requirement: Requirement = {
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
                file: 'requirement.md',
                id: 'requirement',
            };
            const annotations: Annotation[] = [];
            expect(updateStrategy.shouldExecute(requirement, annotations)).toEqual(false);
        });

        test('does not execute when the Requirement has no tracelinks', () => {
            const requirement: Requirement = {
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
                    ],
                },
                file: 'requirement.md',
                id: 'requirement',
            };
            const annotation: Annotation = {
                description: 'Description',
                file: 'main.ts',
                identifier: 'requirement',
                line: 10,
            };
            const annotations: Annotation[] = [ annotation ];
            expect(updateStrategy.shouldExecute(requirement, annotations)).toEqual(false);
        });

        test('executes when the Requirement has tracelinks and Annotations exist', () => {
            const requirement: Requirement = {
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
                file: 'requirement.md',
                id: 'requirement',
            };
            const annotation: Annotation = {
                description: 'Description',
                file: 'main.ts',
                identifier: 'requirement',
                line: 10,
            };
            const annotations: Annotation[] = [ annotation ];
            expect(updateStrategy.shouldExecute(requirement, annotations)).toEqual(true);
        });

        test('removes tracelinks that do not exist anymore', () => {
            const anotherAnnotation: Annotation = {
                description: 'Another Description',
                file: 'another.ts',
                identifier: 'requirement',
                line: 12,
            };
            const requirement: Requirement = {
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
                file: 'requirement.md',
                id: 'requirement',
            };
            const requirementAfter: Requirement = {
                ...requirement,
                ast: {
                    type: 'root',
                    children: [
                        requirement.ast.children[0],
                        requirement.ast.children[1],
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

            updateStrategy.execute(requirement, [ anotherAnnotation ])

            expect(requirement).toEqual(requirementAfter);
        });

        test('adds new tracelinks to the end', () => {
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
            const requirement: Requirement = {
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
            const requirementAfter: Requirement = {
                ...requirement,
                ast: {
                    type: 'root',
                    children: [
                        requirement.ast.children[0],
                        requirement.ast.children[1],
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

            updateStrategy.execute(requirement, [ annotation, anotherAnnotation ])

            expect(requirement).toEqual(requirementAfter);
        });

        test('updates existing tracelinks', () => {
            const annotation: Annotation = {
                description: 'Description',
                file: 'main.ts',
                identifier: 'requirement',
                line: 1,
            };
            const anotherAnnotation: Annotation = {
                description: 'Another Description',
                file: 'another.ts',
                identifier: 'requirement',
                line: 13,
            };
            const requirement: Requirement = {
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
            const requirementAfter: Requirement = {
                ...requirement,
                ast: {
                    type: 'root',
                    children: [
                        requirement.ast.children[0],
                        requirement.ast.children[1],
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
                                                    url: 'main.ts#L1',
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
                                                    value: '1',
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
                                                    url: 'another.ts#L13',
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
                                                    value: '13',
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

            updateStrategy.execute(requirement, [ annotation, anotherAnnotation ])

            expect(requirement).toEqual(requirementAfter);
        });

        test('respects tracelink order', () => {
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
            const requirement: Requirement = {
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
            const requirementAfter: Requirement = {
                ...requirement,
                ast: {
                    type: 'root',
                    children: [
                        requirement.ast.children[0],
                        requirement.ast.children[1],
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

            updateStrategy.execute(requirement, [ anotherAnnotation, annotation ])

            expect(requirement).toEqual(requirementAfter);
        });
    });
});
