import { collect } from './Collector';
import mock from 'mock-fs';
import { RequirementConfiguration } from '../../Shared/types';

describe('Requirement/Collector:collect()', () => {
    afterEach(mock.restore);

    test('collects only markdown files', () => {
        mock({
            src: {
                'index.md': '# My Markdown File index.md',
                'test_01.md': 'Another markdown file',
                'main.ts': 'Not a markdown file',
            }
        });

        const configuration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [],
        };

        expect(collect(configuration.startingpoint, configuration.excludes)).toEqual([ 'src/index.md', 'src/test_01.md' ]);
    });

    test('collects only markdown files that are not excluded', () => {
        mock({
            src: {
                'index.md': '# My Markdown File index.md',
                'test_01.md': 'Another markdown file',
                'main.ts': 'Not a markdown file',
            }
        });

        const configuration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [
                'index.md'
            ],
        };

        expect(collect(configuration.startingpoint, configuration.excludes)).toEqual([ 'src/test_01.md' ]);
    });

    test('returns an empty array when no files match the criteria for collection', () => {
        mock({
            src: {
                'index.md': '# My Markdown File index.md',
                'index_01.md': '# My Markdown File index.md',
                'main.ts': 'Not a markdown file',
            }
        });

        const configuration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [
                'index'
            ],
        };

        expect(collect(configuration.startingpoint, configuration.excludes)).toEqual([]);
    });
});
