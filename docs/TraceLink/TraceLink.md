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

| Traceability Link                                                                     |
| ------------------------------------------------------------------------------------- |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L20)                        |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L42)                        |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L52)                        |
| [src/Markdown/Markdown.ts](../../src/Markdown/Markdown.ts#L67)                        |
| [src/Requirement/Requirement.ts](../../src/Requirement/Requirement.ts#L78)            |
| [src/Requirement/Requirement.ts](../../src/Requirement/Requirement.ts#L95)            |
| [src/Requirement/Requirement.ts](../../src/Requirement/Requirement.ts#L116)           |
| [src/Traceability/TraceabilityLink.ts](../../src/Traceability/TraceabilityLink.ts#L5) |

</div>
