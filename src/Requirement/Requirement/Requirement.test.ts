import mock from 'mock-fs';
import { list, update } from './Requirement';
import { RequirementConfiguration, Requirement, TraceLink } from '../../Shared/types';
import { Parent } from 'unist';

beforeEach(() => {
    // console.log('beforeEach'); // workaround for mock-fs problem with console.log
});

afterEach(mock.restore);

describe('Requirement/Requirement:list()', () => {
    test('returns a collection of requirement data structures', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---
# My Markdown File index.md`,
                'test_01.md': `---
id: Index
---
Another markdown file`,
                'main.ts': 'Not a markdown file',
            }
        });

        const configuration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [],
        };

        expect(list(configuration)).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: expect.any(String),
                file: expect.any(String),
                id: expect.any(String),
                ast: expect.any(Object),
            }),
        ]));
    });
});

describe('Requirement/Requirement:update()', () => {
    test('adds a tracey block when there are new trace links', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---

# My Markdown file`,
                'main.ts': 'console.log("Test"); // @requirement Index'
            },
        });

        const requirementConfiguration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [],
        };

        const requirement: Requirement = list(requirementConfiguration)[0];

        const traceLinks: TraceLink[] = [
            {
                origin: requirement,
                destination: {
                    type: 'implementation',
                    file: 'src/main.ts',
                    line: 1,
                    requirement: 'Index',
                },
            },
        ];

        // Run the update
        update(requirement, traceLinks);

        const updatedRequirement = <Requirement>list(requirementConfiguration)[0];
        const { children } = <Parent>updatedRequirement.ast;
        const htmlBegin = children[2];
        const table = <Parent>children[3];
        const linkTableRow = <Parent>table.children[1];
        const linkTableCell = <Parent>linkTableRow.children[0];
        const link = <Parent>linkTableCell.children[0];
        const htmlEnd = children[4];

        // Check if the requirement file was updated accordingly
        expect(htmlBegin).toEqual(expect.objectContaining({
            type: 'html',
            value: '<div class="tracey">',
        }));
        expect(link).toEqual(expect.objectContaining({
            type: 'link',
            url: 'main.ts#L1',
            children: expect.arrayContaining([
                expect.objectContaining({
                    type: 'text',
                    value: 'src/main.ts',
                }),
            ]),
        }));
        expect(htmlEnd).toEqual(expect.objectContaining({
            type: 'html',
            value: '</div>',
        }));
    });

    test('does not add a tracey block when there are no trace links', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---

# My Markdown file`,
                'main.ts': 'console.log("Test");'
            },
        });

        const requirementConfiguration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [],
        };

        const requirement: Requirement = list(requirementConfiguration)[0];

        const traceLinks: TraceLink[] = [ ];

        // Run the update
        update(requirement, traceLinks);

        const updatedRequirement = <Requirement>list(requirementConfiguration)[0];
        const ast = <Parent>updatedRequirement.ast;
        const requirementAst = <Parent>requirement.ast;

        expect(ast.children.length).toEqual(requirementAst.children.length);
    });

    test('updates the tracey block when trace links have changed', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---

# My Markdown file

<div class="tracey">

| File                      | Line |
| ------------------------- | ---- |
| [src/main.ts](main.ts#L1) | 1    |

</div>
`,
                'styles.scss': `html {
    background: red; // @requirement Index
}
`
            },
        });

        const requirementConfiguration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [],
        };

        const requirement: Requirement = list(requirementConfiguration)[0];

        const traceLinks: TraceLink[] = [
            {
                origin: requirement,
                destination: {
                    type: 'implementation',
                    file: 'src/styles.scss',
                    line: 2,
                    requirement: 'Index',
                },
            },
        ];

        // Run the update
        update(requirement, traceLinks);

        const updatedRequirement = <Requirement>list(requirementConfiguration)[0];
        const { children } = <Parent>updatedRequirement.ast;
        const table = <Parent>children[3];
        const linkTableRow = <Parent>table.children[1];
        const linkTableCell = <Parent>linkTableRow.children[0];
        const link = <Parent>linkTableCell.children[0];

        // Check if the requirement file was updated accordingly
        expect(link).toEqual(expect.objectContaining({
            type: 'link',
            url: 'styles.scss#L2',
            children: expect.arrayContaining([
                expect.objectContaining({
                    type: 'text',
                    value: 'src/styles.scss',
                }),
            ]),
        }));
    });

    test('does not update the tracey block when trace links did not change', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---

# My Markdown file

<div class="tracey">

| File                      | Line |
| ------------------------- | ---- |
| [src/main.ts](main.ts#L1) | 1    |

</div>
`,
                'main.ts': 'console.log("Test"); // @requirement Index'
            },
        });

        const requirementConfiguration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [],
        };

        const requirement = list(requirementConfiguration)[0];

        const traceLinks: TraceLink[] = [
            {
                origin: requirement,
                destination: {
                    type: 'implementation',
                    file: 'src/main.ts',
                    line: 1,
                    requirement: 'Index',
                },
            },
        ];

        // Run the update
        update(requirement, traceLinks);

        const updatedRequirement = <Requirement>list(requirementConfiguration)[0];
        const { children } = <Parent>updatedRequirement.ast;
        const table = <Parent>children[3];
        const linkTableRow = <Parent>table.children[1];
        const linkTableCell = <Parent>linkTableRow.children[0];
        const link = <Parent>linkTableCell.children[0];

        // Check if the requirement file was updated accordingly
        expect(link).toEqual(expect.objectContaining({
            type: 'link',
            url: 'main.ts#L1',
            children: expect.arrayContaining([
                expect.objectContaining({
                    type: 'text',
                    value: 'src/main.ts',
                }),
            ]),
        }));
    });

    test('removes the tracey block when there are no trace links anymore', () => {
        mock({
            src: {
                'index.md': `---
id: Index
---

# My Markdown file

<div class="tracey">

| File                      | Line |
| ------------------------- | ---- |
| [src/main.ts](main.ts#L1) | 1    |

</div>
`,
                'main.ts': 'console.log("Test");'
            },
        });

        const requirementConfiguration: RequirementConfiguration = {
            startingpoint: 'src',
            excludes: [],
        };

        const requirement = list(requirementConfiguration)[0];

        const traceLinks: TraceLink[] = [];

        // Run the update
        update(requirement, traceLinks);

        const updatedRequirement = <Requirement>list(requirementConfiguration)[0];
        const { children } = <Parent>updatedRequirement.ast;

        expect(children.length).toEqual(2);
    });
});
