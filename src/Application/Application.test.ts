import mock from 'mock-fs';
import { mockFileSystemData } from '../Test/TestUtility';
import { updateRequirements } from './Application';
import { buildGraph } from '../Traceability/TraceabilityGraph';
import { stringifyMarkdown } from '../Requirement/Requirement';

describe('Application', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

    describe('run()', () => {
        const testData = {
            requirement: {
                startingpoint: 'docs',
            },
            implementation: {
                startingpoint: 'src',
            },
        };

        test('adds expected traceability information to requirement files', async () => {
            const traceabilityGraph = await buildGraph(testData);
            const updatedRequirements = updateRequirements(traceabilityGraph);
            const stringifiedRequirements = updatedRequirements.map(requirement => stringifyMarkdown(requirement.ast));
            console.log(stringifiedRequirements[0]);
        });
    })
});
