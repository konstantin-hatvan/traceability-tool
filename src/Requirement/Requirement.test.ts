import fs from 'fs';
import path from 'path';
import mock from 'mock-fs';
import {
    collectRequirements,
    parseFrontmatter,
    getRequirementId,
    createRequirement,
    createRequirements,
    list,
    update,
} from './Requirement';
import {
    mockFileSystemData,
    mockAbstractSyntaxTree,
} from '../Test/TestUtility';
import { Requirement } from '../Shared/types';
import { Node, Parent } from 'unist';

describe('Requirement', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
        mock(mockFileSystemData());
    });

    afterEach(mock.restore);

    describe('collectRequirements()', () => {
        test('returns an array of strings', () => {
            const requirements = collectRequirements('docs', []);

            requirements.forEach(requirement => {
                expect(requirement).toMatch(/[a-z0-9]*/);
            });
        });

        test('returns an array of filesystem paths', () => {
            const requirements = collectRequirements('docs', []);

            requirements.forEach(requirement => {
                expect(fs.statSync(requirement).isFile()).toBeTruthy();
            });
        });

        test('returns an array of markdown files', () => {
            const requirements = collectRequirements('docs', []);

            requirements.forEach(requirement => {
                expect(path.parse(requirement).ext).toEqual('.md');
            });
        });
    });

    describe('parseFrontmatter()', () => {
        const testData = mockAbstractSyntaxTree();

        test('parses frontmatter into an object', () => {
            expect(parseFrontmatter(testData)).toEqual(expect.objectContaining({
                id: expect.any(String),
            }));
        });
    });

    describe('getRequirementId()', () => {
        const testData = mockAbstractSyntaxTree();

        test('returns the correct id', () => {
            expect(getRequirementId(testData)).toEqual('REQ_01');
        });
    });

    describe('createRequirement()', () => {
        const testData = [
            'docs/requirement_02.md',
        ];

        test('returns the correct data shape', () => {
            testData.forEach(data => {
                expect(createRequirement(data)).toEqual(expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }));
            });
        });
    });

    describe('createRequirements()', () => {
        const testData = [
            'docs/requirement_01.md',
            'docs/requirement_02.md',
            'docs/nestedRequirements/requirement_03.md',
        ];

        test('returns a collection of requirement datastructures', () => {
            expect(createRequirements(testData)).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }),
            ]));
        });
    });

    describe('buildRequirements()', () => {
        const testData = {
            startingpoint: 'docs',
            excludes: [],
        };

        test('returns a collection of requirement datastructures', () => {
            expect(list(testData)).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: expect.any(String),
                    file: expect.any(String),
                    id: expect.any(String),
                    ast: expect.any(Object),
                }),
            ]));
        });
    });
});
