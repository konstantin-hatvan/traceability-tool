import { create } from './Factory';
import mock from 'mock-fs';
import { Annotation } from './types';

describe('Annotation', () => {
    beforeEach(() => {
        // console = new Console(process.stdout, process.stderr);
    });

    afterEach(mock.restore);

    describe('Factory', () => {
        describe('create()', () => {
            test('creates single Annotation', async () => {
                mock({
                    'main.ts': '@requirement #[ ID ]# #( Description )#',
                });

                const file = 'main.ts';

                const expectedResult: Annotation[] = expect.arrayContaining([
                    expect.objectContaining({
                        description: 'Description',
                        file: 'main.ts',
                        identifier: 'ID',
                        line: 1,
                    }),
                ]);

                const promise = create(file);
                const output = await promise;

                expect(output).toEqual(expectedResult);
            });

            test('creates multiple Annotations', async () => {
                mock({
                    'main.ts': `@requirement #[ ID ]# #( Description )#
                                console.log('Hello world');
                                @requirement #[ ID ]# #( Description )#`,
                });

                const file = 'main.ts';

                const expectedResult: Annotation[] = expect.arrayContaining([
                    expect.objectContaining({
                        description: 'Description',
                        file: 'main.ts',
                        identifier: 'ID',
                    }),
                ]);

                const promise = create(file);
                const output = await promise;

                expect(output).toEqual(expectedResult);
                expect(output.length).toEqual(2);
            });
        });
    });
});
