---
id: TraceLink
---

# Trace Link

Generate a table for each requirement containing the corresponding trace links between the source code and the requirement.
Regenerate the table on each execution and delete the previous table.
Generate relative links.
Links point to the corresponding file and linenumber.

## Examples

```md
---
id: MyRequirement
---

# My Requirement

Here comes the specification

<div class="tracey">

| Traceability Link                                                                                |
| ------------------------------------------------------------------------------------------------ |
| [src/Resources/Private/JavaScript/main.ts](../../../src/Resources/Private/JavaScript/main.ts#L1) |

</div>
```

<div class="tracey">

| File                                                                                  | Line |
| ------------------------------------------------------------------------------------- | ---- |
| [src/Requirement/Requirement.ts](../../src/Requirement/Requirement.ts#L28)            | 28   |
| [src/Requirement/Requirement.ts](../../src/Requirement/Requirement.ts#L45)            | 45   |
| [src/Requirement/Requirement.ts](../../src/Requirement/Requirement.ts#L67)            | 67   |
| [src/Traceability/TraceabilityLink.ts](../../src/Traceability/TraceabilityLink.ts#L5) | 5    |

</div>
