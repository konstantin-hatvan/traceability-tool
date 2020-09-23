import { create } from './Factory';
import mock from 'mock-fs';

describe('Requirement/Factory:create()', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('creates correct data structure', async () => {
        mock({
            docs: {
                'index.md': `---
id: MyRequirement
---

# My Requirement
`,
            },
        });

        const files = [
            'docs/index.md',
        ];

        const result = await create(files);

        expect(result).toEqual([
            {
                type: 'requirement',
                file: 'docs/index.md',
                id: 'MyRequirement',
                synopsis: '',
                ast: expect.objectContaining({
                    type: 'root',
                    children: [
                        expect.objectContaining({
                            type: 'yaml',
                            value: 'id: MyRequirement'
                        }),
                        expect.objectContaining({
                            type: 'heading',
                        }),
                    ],
                }),
            },
        ]);
    });
});
