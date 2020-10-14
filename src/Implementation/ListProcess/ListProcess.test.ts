import mock from 'mock-fs';
import { list } from './ListProcess';
import { CollectorConfiguration } from '../../Shared/types';

beforeEach(() => {
    // console.log('beforeEach'); // workaround for mock-fs problem with console.log
});

afterEach(mock.restore);

describe('Implementation/ListProcess:list()', () => {
    test('returns a collection of implementation data structures', async () => {
        mock({
            src: {
                'main.ts': 'console.log("Hello world!"); /* @requirement #[ MyRequirement, MySecondRequirement ]# #( My description )# */',
            },
        });

        const configuration: CollectorConfiguration = {
            startingpoints: [
                'src'
            ],
            excludes: [],
        };

        const result = await list(configuration);

        expect(result).toEqual([
            {
                type: 'implementation',
                file: 'src/main.ts',
                requirement: 'MyRequirement',
                line: 1,
                description: 'My description'
            },
            {
                type: 'implementation',
                file: 'src/main.ts',
                requirement: 'MySecondRequirement',
                line: 1,
                description: 'My description'
            }
        ]);
    });
});
