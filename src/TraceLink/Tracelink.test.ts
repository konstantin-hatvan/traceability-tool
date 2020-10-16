import { Service, Mutations } from './index';
import mock from 'mock-fs';
import { Requirement } from '../Requirement/types';
import { TraceLink } from './types';
import { Annotation } from '../Annotation/types';

describe('Tracelink', () => {
    beforeEach(() => {
        // console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    test('Service.list(): list all TraceLinks', async () => {

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

        const annotations: Annotation[] = [
            {
                description: 'My description',
                file: 'src/source.ts',
                identifier: 'MyRequirement',
                line: 1,
            },
            {
                description: 'My description',
                file: 'not-existing.ts',
                identifier: 'MyNotExistingRequirement',
                line: 1,
            },
        ];

        const expectedResult: TraceLink[] = [
            {
                annotation: {
                    description: 'My description',
                    identifier: 'MyRequirement',
                    line: 1,
                    file: 'src/source.ts',
                },
                destination: {
                    ast: expect.objectContaining({
                        type: 'root',
                        children: expect.any(Array),
                    }),
                    file: 'requirements/MyRequirement.md',
                    id: 'MyRequirement',
                },
            },
        ];

        const list = await Service.list(requirements, annotations);

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
