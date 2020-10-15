import { createCollector, isNotExcluded } from './index';
import mock from 'mock-fs';

describe('Collector', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('isNotExcluded(): filters files that are excluded', () => {
        const files = [
            {
                file: 'no-annotation.ts',
                expectedResult: true,
            },
            {
                file: 'one-annotation.ts',
                expectedResult: false,
            },
            {
                file: 'multiple-annotations.ts',
                expectedResult: true,
            },
        ];

        const excludes = [
            'one-annotation\\.ts',
        ];

        mock({
            'no-annotation.ts': 'This file does not have an annotation',
            'one-annotation.ts': 'This file does not have an annotation // @requirement #[ MyRequirement ]# #( My description )#',
            'multiple-annotations.ts': `This file does not have an annotation // @requirement #[ MyFirstRequirement ]# #( My first description )#
                This is a regular line
                This file does not have an annotation // @requirement #[ MySecondRequirement ]# #( My second description )#`,
        });

        files.forEach(({ file, expectedResult }) => {
            expect(isNotExcluded(excludes)(file)).toEqual(expectedResult);
        });
    });

    test('createCollector(): list all files inside the startingpoint that meet the given conditions', () => {
        const files = [
            {
                file: 'file.ts',
                expectedResult: false,
            },
            {
                file: 'second-file.ts',
                expectedResult: false,
            },
            {
                file: 'src/source.ts',
                expectedResult: true,
            },
            {
                file: 'src/second-source.ts',
                expectedResult: false,
            },
            {
                file: 'src/third-source.ts',
                expectedResult: false,
            },
            {
                file: 'src/fourth-source.ts',
                expectedResult: false,
            },
            {
                file: 'src/nested/source.ts',
                expectedResult: true,
            },
            {
                file: 'src/nested/second-source.ts',
                expectedResult: false,
            },
            {
                file: 'src/nested/third-source.ts',
                expectedResult: false,
            },
            {
                file: 'src/nested/fourth-source.ts',
                expectedResult: false,
            },
            {
                file: 'lib/first-source.ts',
                expectedResult: true,
            },
            {
                file: 'lib/second-source.ts',
                expectedResult: false,
            },
            {
                file: 'lib/third-source.ts',
                expectedResult: false,
            },
            {
                file: 'docs/MyDocs.md',
                expectedResult: false,
            },
            {
                file: 'docs/MySecondDocs.md',
                expectedResult: false,
            },
            {
                file: 'requirements/MyRequirement.md',
                expectedResult: false,
            },
            {
                file: 'requirements/MySecondRequirement.md',
                expectedResult: false,
            },
        ];

        const startingpoints = [
            'src',
            'lib',
        ];

        const excludes = [
            'docs',
            'requirements',
            'src/third-source.ts',
            'src/fourth-source.ts',
            'src/nested/third-source.ts',
            'src/nested/fourth-source.ts',
            'lib/third-source.ts',
            'lib/fourth-source.ts',
        ];

        const conditions = [
            isNotExcluded(excludes),
        ];

        mock({
            'file.ts': '@requirement #[ MyRequirement ]# #( My description )#', // not inside startingpoint, not excluded
            'second-file.ts': 'Text', // not inside startingpoint, not excluded
            src: {
                'source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // inside startingpoint, not excluded
                'third-source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // inside startingpoint, is excluded
                'fourth-source.ts': 'Text', // inside startingpoint, is excluded
                nested: {
                    'source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // inside startingpoint, not excluded
                    'third-source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // inside startingpoint, is excluded
                    'fourth-source.ts': 'Text', // inside startingpoint, is excluded
                },
            },
            lib: {
                'source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // inside startingpoint, not excluded
                'third-source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // inside startingpoint, is excluded
                'fourth-source.ts': 'Text', // inside startingpoint, is excluded
                nested: {
                    'source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // inside startingpoint, not excluded
                    'third-source.ts': '@requirement #[ MyRequirement ]# #( My description )#', // inside startingpoint, is excluded
                },
            },
            docs: {
                'MyDocs.md': '@requirement #[ MyRequirement ]# #( My description )#', // has a requirement annotation but is excluded
                'MySecondDocs.md': 'Text', // has no requirement annotation and is excluded
            },
            requirements: {
                'MyRequirement.md': '@requirement #[ MyRequirement ]# #( My description )#', // has a requirement annotation but is excluded
                'MySecondRequirement.md': 'Text', // has no requirement annotation and is excluded
            },
        });

        const expectedResult = [
            'src/nested/source.ts',
            'src/source.ts',
            'lib/nested/source.ts',
            'lib/nested/third-source.ts',
            'lib/source.ts',
        ];

        files.forEach(() => {
            expect(createCollector(conditions)(startingpoints)).toEqual(expectedResult);
        });
    });
});
