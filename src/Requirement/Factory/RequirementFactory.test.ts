import mock from 'mock-fs';
import RequirementFactory from './RequirementFactory';
import Requirement from '../Requirement';

describe('RequirementFactory', () => {
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
                        'styles.scss': `html {
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

    test('returns Requirement instances', () => {
        const path = 'docs/requirement_01.md';
        const instance = RequirementFactory.fromFile(path);

        expect(instance).toBeInstanceOf(Requirement);
    });

    test('instantiates Requirement instances with string IDs', () => {
        const path = 'docs/requirement_01.md';
        const instance = RequirementFactory.fromFile(path);

        expect(typeof instance.getId()).toBe('string');
    });
});
