import * as fs from 'fs';
import { Service, Mutations } from './index';
import mock from 'mock-fs';
import { CollectorConfiguration, PluginParameters } from '../types';
import { Requirement } from './types';
import { parse } from './Markdown';
import { TraceLink } from '../TraceLink/types';
import { Console } from 'console';
import { Annotation } from '../Annotation/types';

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

    test('Mutations.updateTraceLinks(): updates the trace links', () => {
        const content = `---
id: MyRequirement
---

# My Requirement

<div class="tracey">

| File                                 | Line | Description |
| ------------------------------------ | ---- | ----------- |
| [src/source.ts](../src/source.ts#L2) | 2    | Description |

</div>

`;
        const ast = parse(content);
        const requirement: Requirement = {
            ast: ast,
            file: 'requirements/MyRequirement.md',
            id: 'MyRequirement',
        };
        const requirements: Requirement[] = [ requirement ];

        const annotation: Annotation = {
            file: 'src/source.ts',
            description: 'Description',
            identifier: 'MyRequirement',
            line: 1,
        };
        const annotations: Annotation[] = [ annotation ];

        const tracelinks: TraceLink[] = [
            {
                annotation,
                destination: requirement,
            },
        ];

        mock({
            src: {
                'source.ts': '@requirement #[ MyRequirement ]# #( Description )#'
            },
            requirements: {
                'MyRequirement.md': content,
            },
        });

        const contentAfter = `---
id: MyRequirement
---

# My Requirement

<div class="tracey">

| File                                 | Line | Description |
| ------------------------------------ | ---- | ----------- |
| [src/source.ts](../src/source.ts#L1) | 1    | Description |

</div>
`;

        const pluginOutput = Mutations.updateTraceLinks({ requirements, tracelinks, annotations });
        pluginOutput.requirements.forEach(requirement => Service.persist(requirement));

        expect(fs.readFileSync(requirement.file, { encoding: 'utf-8' })).toEqual(contentAfter);
    });

    test('Mutations.updateTraceLinks(): updates the trace links', () => {
        const content = `---
id: MyRequirement
---

# My Requirement

<div class="tracey">

| File                                 | Line | Description |
| ------------------------------------ | ---- | ----------- |
| [src/source.ts](../src/source.ts#L2) | 2    | Description |

</div>

`;
        const ast = parse(content);
        const requirement: Requirement = {
            ast: ast,
            file: 'requirements/MyRequirement.md',
            id: 'MyRequirement',
        };
        const requirements: Requirement[] = [ requirement ];

        const annotations: Annotation[] = [];

        const tracelinks: TraceLink[] = [];

        mock({
            src: {
                'source.ts': '@requirement #[ MyRequirement ]# #( Description )#'
            },
            requirements: {
                'MyRequirement.md': content,
            },
        });

        const contentAfter = `---
id: MyRequirement
---

# My Requirement
`;

        const pluginOutput = Mutations.updateTraceLinks({ requirements, tracelinks, annotations });
        pluginOutput.requirements.forEach(requirement => Service.persist(requirement));

        expect(fs.readFileSync(requirement.file, { encoding: 'utf-8' })).toEqual(contentAfter);
    });
});
