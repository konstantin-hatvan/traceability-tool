import { Service, Mutations } from './index';
import mock from 'mock-fs';
import { Requirement } from '../Requirement/types';
import { TraceLink } from './types';
import { CollectorConfiguration } from '../Shared/types';

describe('Tracelink', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('Service.list(): list all TraceLinks', async () => {
        const requirements: Requirement[] = [
            {
                ast: {
                    type: 'root',
                    children: [],
                },
                file: 'requirements/MyRequirement.md',
                id: 'MyRequirement',
            },
            {
                ast: {
                    type: 'root',
                    children: [],
                },
                file: 'requirements/MySecondRequirement.md',
                id: 'MySecondRequirement',
            },
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

        const configuration: CollectorConfiguration = {
            excludes: [],
            startingpoints: [
                'src',
            ],
        };

        const expectedResult: TraceLink[] = [
            {
                annotation: {
                    description: 'My description',
                    identifier: requirements[0].id,
                    line: 1,
                    file: 'src/source.ts',
                },
                destination: requirements[0],
            },
        ];

        const list = await Service.list(configuration, requirements);

        expect(list).toEqual(expectedResult);
    });

    test('Mutations.toRelativeLink(): Generates relative links', () => {
        const requirements: Requirement[] = [
            {
                ast: {
                    children: [],
                    type: 'root',
                },
                file: 'requirements/MyRequirement.md',
                id: 'MyRequirement',
            },
            {
                ast: {
                    children: [],
                    type: 'root',
                },
                file: 'requirements/MySecondRequirement.md',
                id: 'MySecondRequirement',
            },
        ];
        const traceLinks: TraceLink[] = [
            {
                annotation: {
                    description: 'My description',
                    identifier: 'MyRequirement',
                    line: 1,
                    file: 'src/source.ts',
                },
                destination: requirements[0],
            },
            {
                annotation: {
                    description: 'My description',
                    identifier: 'MyRequirement',
                    line: 1,
                    file: requirements[1].file,
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
                expectedResult: 'MySecondRequirement.md#L1',
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
