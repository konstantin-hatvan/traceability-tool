---
id: RequirementCollector
---

# RequirementCollector

-   Requirements are stored and loaded from Markdown files
-   All Markdown files within the configured `requirement.startingpoint` are collected
-   Markdown files can be excluded in the configuration with `requirement.excludes`
-   The `requirement.excludes` configuration option accepts regular expressions

## Examples

Given the following file tree

    - docs
        - requirement_01.md
        - requirement_02.md
        - index.md

and the following configuration

```js
module.exports = {
    requirement: {
        startingpoint: 'docs',
        excludes: [
            'index\\.md',
        ],
    }
}
```

the resulting file list is going to be

```js
[
    'requirement_01.md',
    'requirement_02.md',
]
```

<div class="tracey">

| Traceability Link                                                                           |
| ------------------------------------------------------------------------------------------- |
| [src/Requirement/RequirementCollector.ts](../../src/Requirement/RequirementCollector.ts#L2) |

</div>
