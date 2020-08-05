---
id: TraceLink
---

# Trace Link

Generate a table for each requirement containing the corresponding trace links between the source code and the requirement.
Regenerate the table on each execution and delete the previous table.

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
