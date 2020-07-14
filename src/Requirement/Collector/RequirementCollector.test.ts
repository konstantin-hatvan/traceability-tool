import * as path from 'path';
import * as fs from 'fs';
import RequirementCollector from './RequirementCollector';
import { rootDirectory } from '../../../test/Project/configuration';
import { setup } from '../../../test/Project/setup';
import { teardown } from '../../../test/Project/teardown';

// Prepare tests
beforeAll(() => {
    setup(rootDirectory);
});

afterAll(() => {
    teardown(rootDirectory);
});

// Execute tests
describe('RequirementCollector', () => {
    describe('.collect()', () => {
        test('returns an array of strings', () => {
            const requirements = RequirementCollector.collect(rootDirectory);

            requirements.forEach(requirement => {
                expect(requirement).toMatch(/[a-z0-9]*/);
            });
        });

        test('returns an array of filesystem paths', () => {
            const requirements = RequirementCollector.collect(rootDirectory);

            requirements.forEach(requirement => {
                expect(fs.statSync(requirement).isFile()).toBeTruthy();
            });
        });

        test('returns an array of markdown files', () => {
            const requirements = RequirementCollector.collect(rootDirectory);

            requirements.forEach(requirement => {
                expect(path.parse(requirement).ext).toEqual('.md');
            });
        });
    });
});
