---
id: TraceLink.Collect
---

# Collect

-   The file system is walked recursively from the configured startingpoints
-   Files must contain an annotation
-   Files must not be excluded
-   All conditions have to be passed
-   All files that are within the startingpoints and pass all conditions are collected

<div class="tracey">

| File                                                                           | Line | Description                                                                        |
| ------------------------------------------------------------------------------ | ---- | ---------------------------------------------------------------------------------- |
| [src/Collector/createCollector.ts](../../src/Collector/createCollector.ts#L7)  | 7    | All conditions have to be passed                                                   |
| [src/Collector/createCollector.ts](../../src/Collector/createCollector.ts#L15) | 15   | All files that are within the startingpoints and pass all conditions are collected |
| [src/Collector/isNotExcluded.ts](../../src/Collector/isNotExcluded.ts#L6)      | 6    | Files must not be excluded                                                         |
| [src/Shared/readdirRecursive.ts](../../src/Shared/readdirRecursive.ts#L21)     | 21   | The file system is walked recursively from the configured startingpoints           |
| [src/TraceLink/Collector.ts](../../src/TraceLink/Collector.ts#L10)             | 10   | Files must contain an annotation                                                   |
| [src/TraceLink/Collector.ts](../../src/TraceLink/Collector.ts#L19)             | 19   | Files must not be excluded                                                         |
| [src/TraceLink/Collector.ts](../../src/TraceLink/Collector.ts#L20)             | 20   | Files must contain an annotation                                                   |

</div>
