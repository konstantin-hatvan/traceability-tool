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

| File                                            | Line |
| ----------------------------------------------- | ---- |
| [src/Trace/Link.ts](../../src/Trace/Link.ts#L5) | 5    |

</div>
