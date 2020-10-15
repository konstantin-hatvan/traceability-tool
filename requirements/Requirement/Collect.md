---
id: Requirement.Collect
---

# Collect

-   The file system is walked recursively from the configured startingpoints
-   Requirements must be stored in markdown files
-   Requirements must have a unique yaml frontmatter identifier
-   Requirements must not be excluded
-   All conditions have to be passed
-   All files that are within the startingpoints and pass all conditions are collected

<div class="tracey">

| File                                                                           | Line | Description                                                                        |
| ------------------------------------------------------------------------------ | ---- | ---------------------------------------------------------------------------------- |
| [src/Collector/createCollector.ts](../../src/Collector/createCollector.ts#L7)  | 7    | All conditions have to be passed                                                   |
| [src/Collector/createCollector.ts](../../src/Collector/createCollector.ts#L15) | 15   | All files that are within the startingpoints and pass all conditions are collected |
| [src/Collector/isNotExcluded.ts](../../src/Collector/isNotExcluded.ts#L6)      | 6    | Files must not be excluded                                                         |
| [src/Requirement/Collector.ts](../../src/Requirement/Collector.ts#L38)         | 38   | Requirements must not be excluded                                                  |
| [src/Requirement/Collector.ts](../../src/Requirement/Collector.ts#L39)         | 39   | Requirements must be stored in markdown files                                      |
| [src/Requirement/Collector.ts](../../src/Requirement/Collector.ts#L40)         | 40   | Requirements must have a unique yaml frontmatter identifier                        |
| [src/Shared/readdirRecursive.ts](../../src/Shared/readdirRecursive.ts#L21)     | 21   | The file system is walked recursively from the configured startingpoints           |

</div>
