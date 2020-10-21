import * as Service from './index';
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
});
