import { Service, Mutations } from './index';
import mock from 'mock-fs';
import { Implementation, Requirement, TraceLocation } from '../TraceLocation/types';
import { TraceLink } from './types';

describe('Tracelink', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('Service.list(): list all TraceLinks', async () => {
        const requirements: Requirement[] = [
            {
                type: 'requirement',
                ast: {
                    type: 'root',
                    children: [],
                },
                file: 'requirements/MyRequirement.md',
                id: 'MyRequirement',
            },
            {
                type: 'requirement',
                ast: {
                    type: 'root',
                    children: [],
                },
                file: 'requirements/MySecondRequirement.md',
                id: 'MySecondRequirement',
            },
        ];
        const implementations: Implementation[] = [
            {
                file: 'src/source.ts',
                type: 'implementation',
            },
            {
                file: 'src/not-existing.ts',
                type: 'implementation',
            },
        ];
        const traceLocations: TraceLocation[] = [
            ...requirements,
            ...implementations,
        ];

        mock({
            requirements: {
                'MyRequirement.md': `---
id: MyRequirement
---
`,
                'MySecondRequirement.md': `---
id: MySecondRequirement
---
`,
            },
            src: {
                'source.ts': '@requirement #[ MyRequirement ]# #( My description )#',
                'not-existing.ts': '@requirement #[ MyNotExistingRequirement ]# #( My description )#',
            },
        });

        const expectedResult: TraceLink[] = [
            {
                annotation: {
                    description: 'My description',
                    identifier: requirements[0].id,
                    line: 1,
                    location: implementations[0],
                },
                destination: requirements[0],
            },
        ];

        const list = await Service.list(traceLocations);

        expect(list).toEqual(expectedResult);
    });

    test('Mutations.toRelativeLink(): Generates relative links between TraceLocations', () => {
        const requirements: Requirement[] = [
            {
                type: 'requirement',
                ast: {
                    children: [],
                    type: 'root',
                },
                file: 'requirements/MyRequirement.md',
                id: 'MyRequirement',
            },
            {
                type: 'requirement',
                ast: {
                    children: [],
                    type: 'root',
                },
                file: 'requirements/MySecondRequirement.md',
                id: 'MySecondRequirement',
            },
        ];
        const implementations: Implementation[] = [
            {
                file: 'src/source.ts',
                type: 'implementation',
            },
        ];
        const traceLinks: TraceLink[] = [
            {
                annotation: {
                    description: 'My description',
                    identifier: 'MyRequirement',
                    line: 1,
                    location: implementations[0],
                },
                destination: requirements[0],
            },
            {
                annotation: {
                    description: 'My description',
                    identifier: 'MyRequirement',
                    line: 1,
                    location: requirements[1],
                },
                destination: requirements[0],
            },
        ];
        const testData = [
            {
                traceLink: traceLinks[0],
                expectedResult: '../src/source.ts#L1',
            },
            {
                traceLink: traceLinks[1],
                expectedResult: 'MySecondRequirement.md',
            },
        ];

        mock({
            requirements: {
                'MyRequirement.md': `---
id: MyRequirement
---

# My Requirement
`,
                'MySecondRequirement.md': `---
id: MySecondRequirement
---
# My Second Requirement

<!-- @requirement #[ MyRequirement ]# #( My description )# -->`,
            },
            src: {
                'source.ts': '@requirement #[ MyRequirement ]# #( My description )#'
            }
        });

        testData.forEach(({ traceLink, expectedResult }) => {
            expect(Mutations.toRelativeLink(traceLink)).toEqual(expectedResult);
        });
    });
});
