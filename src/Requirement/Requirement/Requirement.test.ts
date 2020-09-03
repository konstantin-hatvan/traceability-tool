import mock from 'mock-fs';
import { list } from './Requirement';
import { RequirementConfiguration } from '../../Shared/types';

describe('Requirement/Requirement:list()', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('returns a collection of requirement data structures', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---
# My Markdown File index.md`,
                'test_01.md': `---
id: Index
---
Another markdown file`,
                'main.ts': 'Not a markdown file',
            }
        });

        const configuration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [],
        };

        expect(list(configuration)).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: expect.any(String),
                file: expect.any(String),
                id: expect.any(String),
                ast: expect.any(Object),
            }),
        ]));
    });
});
