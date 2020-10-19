import * as fs from 'fs';
import { Service } from './index';
import mock from 'mock-fs';
import { CollectorConfiguration } from '../types';
import { Requirement } from './types';
import { parse } from './Markdown';
import { Console } from 'console';

describe('Requirement', () => {
    beforeEach(() => {
        console = new Console(process.stdout, process.stderr); // necessary because of mock-fs problem. Link: https://github.com/tschaub/mock-fs/issues/234
    });

    afterEach(mock.restore);

    test('Service.list(): lists all Requirements', () => {
        const configuration: CollectorConfiguration = {
            excludes: [
                'requirements/second-requirement.md',
                'requirements/nested/second-requirement.md',
            ],
            startingpoints: [
                'requirements/**',
            ],
        };

        mock({
            src: {
                'source.ts': 'Text', // !startingpoint, !markdown, !excluded
                'second-requirement.md': `
---
id: SrcSecondRequirement
---

# My Requirement
`, // !startingpoint, markdown, excluded
            },
            requirements: {
                'source.ts': 'Text', // startingpoint, !markdown, !excluded
                'requirement.md': `
---
id: Requirement
---

# My Requirement
`, // startingpoint, markdown, !excluded
                'second-requirement.md': `
---
id: SecondRequirement
---

# My Requirement
`, // startingpoint, markdown, excluded
                'third-requirement.md': `# My Requirement`, // startingpoint, markdown, excluded, no frontmatter identifier
                nested: {
                    'source.ts': 'Text', // startingpoint, !markdown, !excluded
                    'second-source.ts': 'Text', // startingpoint, !markdown, excluded
                    'requirement.md': `
---
id: Nested/Requirement
---

# My Requirement
`, // startingpoint, markdown, !excluded
                    'second-requirement.md': `
---
id: Nested/SecondRequirement
---

# My Requirement
`, // startingpoint, markdown, excluded
                }
            },
        });

        const expectedResult: Requirement[] = [
            {
                ast: expect.objectContaining({
                    type: 'root',
                }),
                id: 'Nested/Requirement',
                file: 'requirements/nested/requirement.md'
            },
            {
                ast: expect.objectContaining({
                    type: 'root',
                }),
                id: 'Requirement',
                file: 'requirements/requirement.md'
            },
        ];

        expect(Service.list(configuration)).toEqual(expectedResult);
    });

    test('Service.persist(): persists a Requirement', () => {
        const content = `---
id: MyRequirement
---

# My Requirement
`;
        const ast = parse(content);
        const requirement: Requirement = {
            ast: ast,
            file: 'requirements/MyRequirement.md',
            id: 'MyRequirement',
        };

        mock({
            requirements: {
                'MyRequirement.md': '# My Requirement'
            }
        });

        Service.persist(requirement);

        expect(fs.readFileSync(requirement.file, { encoding: 'utf-8' })).toEqual(content);
    });
});
