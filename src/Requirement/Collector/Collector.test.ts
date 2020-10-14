import { collect } from './Collector';
import mock from 'mock-fs';
import { CollectorConfiguration } from '../../Shared/types';

describe('Requirement/Collector:collect()', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('collects only markdown files', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---
# My Markdown File index.md`,
                'test_01.md': `---
id: test_01
---
Another markdown file`,
                'main.ts': 'Not a markdown file',
            }
        });

        const configuration: CollectorConfiguration = {
            startingpoints: [
                'src'
            ],
            excludes: [],
        };

        expect(collect(configuration)).toEqual([ 'src/index.md', 'src/test_01.md' ]);
    });

    test('collects only markdown files that are not excluded', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---
# My Markdown File index.md`,
                'test_01.md': `---
id: test_01
---
Another markdown file`,
                'main.ts': 'Not a markdown file',
            }
        });

        const configuration: CollectorConfiguration = {
            startingpoints: [
                'src'
            ],
            excludes: [
                'index.md'
            ],
        };

        expect(collect(configuration)).toEqual([ 'src/test_01.md' ]);
    });

    test('collects only markdown files with a frontmatter identifier', () => {
        mock({
            src: {
                'index.md': `# My Markdown File index.md`,
                'test_01.md': `---
id: test_01
---
Another markdown file`,
                'main.ts': 'Not a markdown file',
            }
        });

        const configuration: CollectorConfiguration = {
            startingpoints: [
                'src'
            ],
            excludes: [],
        };

        expect(collect(configuration)).toEqual([ 'src/test_01.md' ]);
    });

    test('returns an empty array when no files match the criteria for collection', () => {
        mock({
            src: {
                'index.md': '# My Markdown File index.md', // excluded
                'test_01.md': '# My Markdown File index.md', // no frontmatter identifier
                'main.ts': 'Not a markdown file', // no markdown file
            }
        });

        const configuration: CollectorConfiguration = {
            startingpoints: [
                'src'
            ],
            excludes: [
                'index.md'
            ],
        };

        expect(collect(configuration)).toEqual([]);
    });
});
