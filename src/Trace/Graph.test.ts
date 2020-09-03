import mock from 'mock-fs';
import { mockFileSystemData, mockAbstractSyntaxTree } from '../Test/TestUtility';
import { getIncidentLinks } from './Graph';
import { TraceGraph, Requirement, Implementation } from '../Shared/types';

describe('Traceability', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

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

        const traceabilityGraph: TraceGraph = {
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
});
