import { collect } from './Collector';
import mock from 'mock-fs';
import { CollectorConfiguration } from '../../Shared/types';

describe('Implementation/Collector:collect()', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('collects only files with an implementation annotation', () => {
        mock({
            test: {
                'main.ts': 'console.log("Has annotation!"); /* @requirement #[ MyRequirement ]# #( My description )# */',
            },
            src: {
                'main.ts': 'console.log("Has annotation!"); /* @requirement #[ MyRequirement ]# #( My description )# */',
                'another.ts': 'console.log("No annotation!");',
            },
        });

        const configuration: CollectorConfiguration = {
            startingpoints: [
                'src'
            ],
            excludes: [],
        };

        expect(collect(configuration)).toEqual([ 'src/main.ts' ]);
    });

    test('collects only files that are not excluded', () => {
        mock({
            test: {
                'main.ts': 'console.log("Has annotation!"); /* @requirement #[ MyRequirement ]# #( My description )# */',
            },
            src: {
                'main.ts': 'console.log("Has annotation!"); /* @requirement #[ MyRequirement ]# #( My description )# */',
                'another.ts': 'console.log("No annotation!"); /* @requirement #[ MyRequirement ]# #( My description )# */',
            },
        });

        const configuration: CollectorConfiguration = {
            startingpoints: [
                'src'
            ],
            excludes: [
                'main.ts'
            ],
        };

        expect(collect(configuration)).toEqual([ 'src/another.ts' ]);
    });

    test('returns an empty array when no files match the criteria for collection', () => {
        mock({
            test: {
                'main.ts': 'console.log("Has annotation!"); /* @requirement #[ MyRequirement ]# #( My description )# */',
            },
            src: {
                'main.ts': 'Not a markdown file /* @special #[ MyRequirement ]# #( My description )# */', // excluded
                'another.ts': 'Not a markdown file', // no implementation annotation
            }
        });

        const configuration: CollectorConfiguration = {
            startingpoints: [
                'src'
            ],
            excludes: [
                'main.ts',
            ],
        };

        expect(collect(configuration)).toEqual([]);
    });
});
