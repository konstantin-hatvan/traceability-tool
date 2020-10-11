import mock from 'mock-fs';
import { list } from './ListProcess';
import { RequirementConfiguration } from '../../Shared/types';

beforeEach(() => {
    // console.log('beforeEach'); // workaround for mock-fs problem with console.log
});

afterEach(mock.restore);

describe('Requirement/ListProcess:list()', () => {
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
            startingpoints: [
                'src'
            ],
            excludes: [],
        };

        expect(list(configuration)).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'requirement',
                file: expect.any(String),
                id: expect.any(String),
                ast: expect.any(Object),
            }),
        ]));
    });
});
