import mock from 'mock-fs';
import RequirementTransformer from './RequirementTransformer';

describe('RequirementTransformer', () => {
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
        });
    });

    afterEach(mock.restore);

    describe('transform()', () => {
        test('return the correct data shape', () => {
            const files = [
                'docs/requirement_01.md',
                'docs/requirement_02.md',
            ];

            expect(RequirementTransformer.transform(files)).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    file: expect.any(String),
                })
            ]));
        });
    });
});
