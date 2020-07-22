import mock from 'mock-fs';
import ImplementationTransformer from './ImplementationTransformer';

describe('ImplementationTransformer', () => {
    beforeEach(() => {
        mock({
            'docs': {
                'requirement_01.md': `---
id: REQ_01
test: test
---

# Requirement 1 Test

- This is a list
- Another List item
`,
                'requirement_02.md': `---
id: REQ_02
---

# Requirement 2 Test

This time a paragraph and a table under this block

| Equivalenzklassen              | Anzahl der Testfälle |
|--------------------------------|----------------------|
| Input falsch (falsches Schema) | 1                    |
| Input falsch (nonnumeric)      | 1                    |
| Input falsch (negativ)         | 1                    |
| Stunde > 25                    | 1                    |
| Minute > 99                    | 0                    |
`
            },
            'src': {
                'Resources': {
                    'Private': {
                        'main.ts': `console.log("Hello World!"); // @requirement REQ_02
`,
                        'styles.scss': `// @requirement REQ_01
html {
    background: blue;
}
`,
                    },
                    'Public': {
                        'main.js': `console.log("Hello World!");
`,
                        'styles.css': `html {
    background: blue;
}
`,
                    }
                }
            }
        });
    });

    afterEach(mock.restore);

    describe('transform()', () => {
        test('returns correct data shape', async () => {
            const files = [
                'src/Resources/Private/main.ts',
                'src/Resources/Private/styles.scss',
            ];

            expect.assertions(1);
            await expect(ImplementationTransformer.transform(files)).resolves.toEqual(expect.arrayContaining([
                expect.objectContaining({
                    file: expect.any(String),
                    line: expect.any(Number),
                    requirement: expect.any(String),
                })
            ]));
        });
    });
});
