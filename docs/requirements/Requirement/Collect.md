---
id: Requirement.Collect
---

# Collecting requirements

-   The file system is walked recursively from the configured startingpoints
-   Requirements must be stored in markdown files
-   Requirements must have a unique yaml frontmatter identifier
-   Requirements must not be excluded
-   All conditions have to be passed
-   All files that are within the startingpoints and pass all conditions are collected

<div class="tracey tracey-plugin-tracelinktable">

| File                                                                        | Line | Description                                                 |
| --------------------------------------------------------------------------- | ---- | ----------------------------------------------------------- |
| [src/Common/createCollector.ts](../../../src/Common/createCollector.ts#L16) | 16   | Files must not be excluded                                  |
| [src/Requirement/Collector.ts](../../../src/Requirement/Collector.ts#L10)   | 10   | Requirements must be stored in markdown files               |
| [src/Requirement/Collector.ts](../../../src/Requirement/Collector.ts#L17)   | 17   | Requirements must have a unique yaml frontmatter identifier |
| [src/Requirement/Collector.ts](../../../src/Requirement/Collector.ts#L39)   | 39   | Requirements must be stored in markdown files               |
| [src/Requirement/Collector.ts](../../../src/Requirement/Collector.ts#L40)   | 40   | Requirements must have a unique yaml frontmatter identifier |

</div>
