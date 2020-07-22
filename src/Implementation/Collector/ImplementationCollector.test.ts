import fs from 'fs';
import path from 'path';
import mock from 'mock-fs';
import ImplementationCollector from './ImplementationCollector';

describe('ImplementationCollector', () => {
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
                        'main.ts': `console.log("Hello World!");
`,
                        'styles.scss': `/* @requirement REQ_01 */
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

    describe('collect()', () => {
        test('returns an array of strings', () => {
            const implementations = ImplementationCollector.collect('src/Resources/Private');

            implementations.forEach(implementation => {
                expect(implementation).toMatch(/[a-z0-9]*/);
            });
        });

        test('returns an array of filesystem paths', () => {
            const implementations = ImplementationCollector.collect('src/Resources/Private');

            implementations.forEach(implementation => {
                expect(fs.statSync(implementation).isFile()).toBeTruthy();
            });
        });
    });
});
