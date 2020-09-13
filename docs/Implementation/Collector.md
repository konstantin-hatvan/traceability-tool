---
id: Implementation/Collector
---

# Collecting implementation files

-   Implementation files will be collected from the file system starting at the configured `implementation.startingpoint`
-   Implementation files must have a requirement annotation
-   Implementation files can be excluded using the configuration option `implementation.excludes`
-   Implementation files can be excluded using regular expressions

<div class="tracey">

| File                                                                                             | Line | Description                                                                                          |
| ------------------------------------------------------------------------------------------------ | ---- | ---------------------------------------------------------------------------------------------------- |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L8)  | 8    | Implementation files must have a requirement annotation                                              |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L19) | 19   | Implementation files can be excluded using regular expressions                                       |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L34) | 34   | Implementation files will be collected from the file system starting at the configured startingpoint |
| [src/index.ts](../../src/index.ts#L14)                                                           | 14   | Implementation files can be excluded in the configuration                                            |

</div>
