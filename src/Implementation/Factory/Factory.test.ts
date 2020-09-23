import { create } from './Factory';
import mock from 'mock-fs';
import { ImplementationConfiguration } from '../../Shared/types';

describe('Implementation/Factory:create()', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('creates correct data structure', async () => {
        mock({
            src: {
                'main.ts': 'console.log("Hello world!"); /* @requirement #[ MyRequirement ]# #( My description )# */',
            },
        });

        const files = [
            'src/main.ts',
        ];

        const configuration: ImplementationConfiguration = {
            startingpoint: 'src',
            excludes: [],
            annotation: '@requirement',
        };

        const result = await create(files, configuration);

        expect(result).toEqual([
            {
                type: 'implementation',
                file: 'src/main.ts',
                line: 1,
                requirement: 'MyRequirement',
                description: 'My description'
            },
        ]);
    });

    test('creates multiple for a comma separated list of requirement identifiers', async () => {
        mock({
            src: {
                'multiple.ts': 'console.log("Hello world!"); /* @requirement #[ MyRequirement, MySecondRequirement ]# #( My description )# */',
            },
        });

        const files = [
            'src/multiple.ts',
        ];

        const configuration: ImplementationConfiguration = {
            startingpoint: 'src',
            excludes: [],
            annotation: '@requirement',
        };

        const result = await create(files, configuration);

        expect(result).toEqual([
            {
                type: 'implementation',
                file: 'src/multiple.ts',
                line: 1,
                requirement: 'MyRequirement',
                description: 'My description'
            },
            {
                type: 'implementation',
                file: 'src/multiple.ts',
                line: 1,
                requirement: 'MySecondRequirement',
                description: 'My description'
            },
        ]);
    });
});
