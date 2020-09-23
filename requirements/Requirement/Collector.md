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
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L9)                              | 9    | Requirement identifiers must use yaml frontmatter                                            |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L14)                             | 14   | Requirement identifiers must use yaml frontmatter                                            |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L21)                             | 21   | Requirement identifiers must use yaml frontmatter                                            |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L10) | 10   | Requirements must be Markdown files                                                          |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L17) | 17   | Requirements must have a frontmatter identifier                                              |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L18) | 18   | Requirement identifiers must use the key {id}                                                |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L29) | 29   | Requirements can be excluded using regular expressions                                       |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L44) | 44   | Requirements will be collected from the file system starting at the configured startingpoint |
| [src/index.ts](../../src/index.ts#L18)                                                     | 18   | Requirements can be excluded in the configuration                                            |
| [src/index.ts](../../src/index.ts#L19)                                                     | 19   | Requirements will be collected from the file system starting at the configured startingpoint |

</div>