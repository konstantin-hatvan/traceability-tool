---
id: Requirement/Collector
---

# Collecting Requirements

-   Requirements will be collected from the file system starting at the configured `requirement.startingpoints`
-   Requirements must be markdown files
-   Requirements must not be excluded
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
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L35) | 35   | Requirements must not be excluded                                                            |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L36) | 36   | Requirements must be markdown files                                                          |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L37) | 37   | Requirements must have a frontmatter identifier                                              |
| [src/index.ts](../../src/index.ts#L19)                                                     | 19   | Requirements can be excluded in the configuration                                            |
| [src/index.ts](../../src/index.ts#L21)                                                     | 21   | Requirements will be collected from the file system starting at the configured startingpoint |

</div>
