---
id: RequirementCollector
---

# Collecting Requirements

Requirements will be collected from the file system starting at the configured `requirement.startingpoint`.
Requirements have to meet the following criteria to be collected:

-   Requirements must be Markdown files
-   Requirements must not be excluded (using the configuration option `requirement.excludes`)
-   Requirements must have a frontmatter identifier (using the key `id`)

<div class="tracey">

| File                                                                                        | Line | Description                                             |
| ------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------- |
| [src/Requirement/Collector/Collector.ts](../../src/Requirement/Collector/Collector.ts#L1)   | 1    | Implement requirements for collecting requirement files |
| [src/Requirement/Collector/Conditions.ts](../../src/Requirement/Collector/Conditions.ts#L1) | 1    | Implement conditions for collecting requirement files   |

</div>
