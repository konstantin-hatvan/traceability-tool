---
id: Implementation/Collector
---

# Collecting implementation files

-   Implementation files will be collected from the file system starting at the configured `implementation.startingpoints`
-   Implementation files must not be excluded
-   Implementation files must have a requirement annotation
-   Implementation files can be excluded using the configuration option `implementation.excludes`
-   Implementation files can be excluded using regular expressions

<div class="tracey">

| File                                                                                             | Line | Description                                               |
| ------------------------------------------------------------------------------------------------ | ---- | --------------------------------------------------------- |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L14) | 14   | Implementation files must not be excluded                 |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L15) | 15   | Implementation files must have an annotation              |
| [src/index.ts](../../src/index.ts#L13)                                                           | 13   | Implementation files can be excluded in the configuration |

</div>
