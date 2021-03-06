---
id: Requirement.Collect
synopsis: Tracey collects requirements
---

# Collecting requirements

-   The file system is walked recursively from the configured startingpoints
-   Requirements must be stored in markdown files
-   Requirements must not be excluded
-   All conditions have to be passed
-   All files that are within the startingpoints and pass all conditions are collected

<div class="tracey tracey-plugin-tracelinktable">

| File                                                                                                     | Line | Description                                   |
| -------------------------------------------------------------------------------------------------------- | ---- | --------------------------------------------- |
| [src/Common/Collector.ts](../../../src/Common/Collector.ts#L16 "src/Common/Collector.ts")                | 16   | Files must not be excluded                    |
| [src/Requirement/Collector.ts](../../../src/Requirement/Collector.ts#L10 "src/Requirement/Collector.ts") | 10   | Requirements must be stored in markdown files |
| [src/Requirement/Collector.ts](../../../src/Requirement/Collector.ts#L39 "src/Requirement/Collector.ts") | 39   | Requirements must be stored in markdown files |

</div>
