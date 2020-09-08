---
id: Implementation/Collector
---

# Collecting implementation files

-   Implementation files will be collected from the file system starting at the configured `implementation.startingpoint`
-   Implementation files must have a requirement annotation
-   Implementation files can be excluded using the configuration option `implementation.excludes`
-   Implementation files can be excluded using regular expressions

<div class="tracey">

| File                                                                                               | Line | Description                                                                                          |
| -------------------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------- |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L9)    | 9    | Implementation files must have a requirement annotation                                              |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L10)   | 10   | Implementation files must not be excluded                                                            |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L22)   | 22   | Implementation files will be collected from the file system starting at the configured startingpoint |
| [src/Implementation/Collector/Conditions.ts](../../src/Implementation/Collector/Conditions.ts#L7)  | 7    | Implementation files must have a requirement annotation                                              |
| [src/Implementation/Collector/Conditions.ts](../../src/Implementation/Collector/Conditions.ts#L18) | 18   | Implementation files can be excluded using regular expressions                                       |
| [src/index.ts](../../src/index.ts#L15)                                                             | 15   | Implementation files can be excluded in the configuration                                            |

</div>
