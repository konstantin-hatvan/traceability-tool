import { create } from './Factory';
import mock from 'mock-fs';
import { Requirement } from './types';

describe('Requirement', () => {
    beforeEach(() => {
        // console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Factory', () => {
        describe('create()', () => {
            test('creates a Requirement', () => {
                mock({
                    'requirement.md': '---\nid: requirement\n---\n\n# Requirement',
                });

                const file = 'requirement.md';

                const expectedResult: Requirement = {
                    ast: expect.objectContaining({
                        type: 'root',
                    }),
                    file: 'requirement.md',
                    id: 'requirement',
                };

                expect(create(file)).toEqual(expectedResult);
            });
        });
    });
});
