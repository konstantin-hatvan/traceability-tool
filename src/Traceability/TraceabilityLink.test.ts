import mock from 'mock-fs';
import { mockFileSystemData, mockAbstractSyntaxTree } from '../Test/TestUtility';
import { getEndpoints, toRelativeLink } from './TraceabilityLink';
import { TraceabilityLink, Requirement, Implementation } from '../Shared/types';

describe('Traceability', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

    describe('getEndpoints()', () => {
        const requirement: Requirement = {
            type: 'requirement',
            file: 'docs/requirement_01.md',
            id: 'REQ_01',
            ast: mockAbstractSyntaxTree(),
        };

        const implementation: Implementation = {
            type: 'implementation',
            file: 'src/Resources/Private/JavaScript/main.ts',
            line: 1,
            requirement: 'REQ_01',
        };

        const testData: TraceabilityLink = {
            origin: requirement,
            destination: implementation,
        };

        test('returns both endpoints', () => {
            expect(getEndpoints(testData)).toEqual([
                testData.origin,
                testData.destination,
            ]);
        });
    });

    describe('toRelativeLink()', () => {
        const requirement: Requirement = {
            type: 'requirement',
            file: 'docs/requirement_01.md',
            id: 'REQ_01',
            ast: mockAbstractSyntaxTree(),
        };

        const implementation: Implementation = {
            type: 'implementation',
            file: 'src/Resources/Private/JavaScript/main.ts',
            line: 1,
            requirement: 'REQ_01',
        };

        const testData: TraceabilityLink = {
            origin: requirement,
            destination: implementation,
        };

        test('generates a relative link from the requirement to the implementation', () => {
            expect(toRelativeLink(testData)).toEqual('../../src/Resources/Private/JavaScript/main.ts#L1');
        });
    });
});
