---
id: Annotation.Collect
parent: Annotation
synopsis: Tracey collects annotations
---

<div class="tracey tracey-plugin-breadcrumbs">

[Annotation](../Annotation.md)

</div>

# Collecting annotations

-   The file system is walked recursively from the configured startingpoints
-   Files must not be excluded
-   Files must contain an annotation
-   All conditions have to be passed
-   All files that are within the startingpoints and pass all conditions are collected

<div class="tracey tracey-plugin-tracelinktable">

| File                                                                        | Line | Description                      |
| --------------------------------------------------------------------------- | ---- | -------------------------------- |
| [src/Annotation/Collector.ts](../../../src/Annotation/Collector.ts#L9)      | 9    | Files must contain an annotation |
| [src/Annotation/Collector.ts](../../../src/Annotation/Collector.ts#L18)     | 18   | Files must contain an annotation |
| [src/Common/createCollector.ts](../../../src/Common/createCollector.ts#L16) | 16   | Files must not be excluded       |

</div>
