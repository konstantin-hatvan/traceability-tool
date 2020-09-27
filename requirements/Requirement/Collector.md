---
id: Requirement/Collector
---

# Collecting Requirements

-   Requirements will be collected from the file system starting at the configured `requirement.startingpoint`
-   Requirements must be Markdown files
-   Requirements can be excluded using the configuration option `requirement.excludes`
-   Requirements can be excluded using regular expressions
-   Requirements must have a frontmatter identifier
-   Requirement identifiers must use yaml frontmatter
-   Requirement identifiers must use the key `id`

<div class="tracey">

| File                                                                                       | Line | Description                                                                                  |
| ------------------------------------------------------------------------------------------ | ---- | -------------------------------------------------------------------------------------------- |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L12)                             | 12   | Requirement identifiers must use yaml frontmatter                                            |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L17)                             | 17   | Requirement identifiers must use yaml frontmatter                                            |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L24)                             | 24   | Requirement identifiers must use yaml frontmatter                                            |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L15) | 15   | Requirements can be excluded using regular expressions                                       |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L24) | 24   | Requirements must be Markdown files                                                          |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L31) | 31   | Requirements must have a frontmatter identifier                                              |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L32) | 32   | Requirement identifiers must use the key {id}                                                |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L64) | 64   | Requirements will be collected from the file system starting at the configured startingpoint |
| [src/index.ts](../../src/index.ts#L18)                                                     | 18   | Requirements can be excluded in the configuration                                            |
| [src/index.ts](../../src/index.ts#L19)                                                     | 19   | Requirements will be collected from the file system starting at the configured startingpoint |

</div>
