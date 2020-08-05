import mock from 'mock-fs';
import { mockFileSystemData, mockAbstractSyntaxTree } from '../Test/TestUtility';
import { getLocationsByType, getIncidentLinks, buildTraceabilityLinks, buildGraph } from './TraceabilityGraph';
import { TraceabilityGraph, Requirement, Implementation, Configuration } from '../Shared/types';

describe('Traceability', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

    describe('getLocationsByType()', () => {
        const requirements: Requirement[] = [
            {
                type: 'requirement',
                file: 'docs/requirement_01.md',
                id: 'REQ_01',
                ast: mockAbstractSyntaxTree(),
            },
            {
                type: 'requirement',
                file: 'docs/requirement_02.md',
                id: 'REQ_02',
                ast: mockAbstractSyntaxTree(),
            },
            {
                type: 'requirement',
                file: 'docs/nestedRequirments/requirement_03.md',
                id: 'REQ_03',
                ast: mockAbstractSyntaxTree(),
            },
        ];

        const implementations: Implementation[] = [
            {
                type: 'implementation',
                file: 'src/Resources/Private/JavaScript/main.ts',
                line: 1,
                requirement: 'REQ_01',
            },
            {
                type: 'implementation',
                file: 'src/Resources/Private/Scss/styles.scss',
                line: 3,
                requirement: 'REQ_02',
            },
        ];

        const traceabilityGraph: TraceabilityGraph = {
            locations: [
                ...requirements,
                ...implementations,
            ],
            links: [],
        };

        test('returns a list of TraceabilityLocations by the specified type', () => {
            expect(getLocationsByType(traceabilityGraph, 'requirement')).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: 'requirement',
                }),
            ]));
        });

        test('returns all TraceabilityLocations by the specified type within the given graph', () => {
            expect(getLocationsByType(traceabilityGraph, 'requirement').length).toEqual(requirements.length);
        });
    });

    describe('getIncidentLinks()', () => {
        const requirements: Requirement[] = [
            {
                type: 'requirement',
                file: 'docs/requirement_01.md',
                id: 'REQ_01',
                ast: mockAbstractSyntaxTree(),
            },
            {
                type: 'requirement',
                file: 'docs/requirement_02.md',
                id: 'REQ_02',
                ast: mockAbstractSyntaxTree(),
            },
            {
                type: 'requirement',
                file: 'docs/nestedRequirments/requirement_03.md',
                id: 'REQ_03',
                ast: mockAbstractSyntaxTree(),
            },
        ];

        const implementations: Implementation[] = [
            {
                type: 'implementation',
                file: 'src/Resources/Private/JavaScript/main.ts',
                line: 1,
                requirement: 'REQ_01',
            },
            {
                type: 'implementation',
                file: 'src/Resources/Private/Scss/styles.scss',
                line: 3,
                requirement: 'REQ_02',
            },
        ];

        const traceabilityGraph: TraceabilityGraph = {
            locations: [
                ...requirements,
                ...implementations,
            ],
            links: [
                {
                    origin: requirements[0],
                    destination: implementations[0],
                },
                {
                    origin: requirements[1],
                    destination: implementations[1],
                },
            ],
        };

        test('returns a list of TraceabilityLinks that are incident on the given node', () => {
            expect(getIncidentLinks(traceabilityGraph, requirements[0])).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    origin: requirements[0],
                }),
            ]));
        });

        test('returns all TraceabilityLinks that are incident on the given node', () => {
            expect(getIncidentLinks(traceabilityGraph, requirements[0]).length).toEqual(1);
        });
    });

    describe('buildTraceabilityLinks()', () => {
        const requirements: Requirement[] = [
            {
                type: 'requirement',
                file: 'docs/requirement_01.md',
                id: 'REQ_01',
                ast: mockAbstractSyntaxTree(),
            },
            {
                type: 'requirement',
                file: 'docs/requirement_02.md',
                id: 'REQ_02',
                ast: mockAbstractSyntaxTree(),
            },
            {
                type: 'requirement',
                file: 'docs/nestedRequirments/requirement_03.md',
                id: 'REQ_03',
                ast: mockAbstractSyntaxTree(),
            },
        ];

        const implementations: Implementation[] = [
            {
                type: 'implementation',
                file: 'src/Resources/Private/JavaScript/main.ts',
                line: 1,
                requirement: 'REQ_01',
            },
            {
                type: 'implementation',
                file: 'src/Resources/Private/Scss/styles.scss',
                line: 3,
                requirement: 'REQ_02',
            },
        ];

        test('combines all related TraceabilityLocations into a TraceabilityLink', () => {
            expect(buildTraceabilityLinks(requirements, implementations)).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    origin: expect.objectContaining({
                        type: 'requirement',
                    }),
                    destination: expect.objectContaining({
                        type: 'implementation',
                    }),
                }),
            ]));
        });

        test('combines all related TraceabilityLocations into a TraceabilityLink', () => {
            expect(buildTraceabilityLinks(requirements, implementations).length).toEqual(2);
        });
    });

    describe('buildGraph()', () => {
        const configuration: Configuration = {
            requirement: {
                startingpoint: 'docs',
            },
            implementation: {
                startingpoint: 'src',
            },
        };

        test('returns a TraceabilityGraph', async () => {
            const result = await buildGraph(configuration);

            expect(result).toEqual(expect.objectContaining({
                links: expect.arrayContaining([
                    expect.objectContaining({
                        origin: expect.objectContaining({
                            type: 'requirement',
                        }),
                        destination: expect.objectContaining({
                            type: 'implementation',
                        }),
                    }),
                ]),
                locations: expect.arrayContaining([
                    expect.objectContaining({
                        type: expect.any(String),
                    }),
                ]),
            }));
        });

        test('returns a TraceabilityGraph with al TraceabilityLocations and TraceabilityLinks', async () => {
            const result = await buildGraph(configuration);

            expect(result.links.length).toEqual(5);
            expect(result.locations.length).toEqual(9);
        });
    });
});
