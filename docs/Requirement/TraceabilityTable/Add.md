---
id: Requirement/TraceabilityTable/Add
synopsis: A traceability table is added if trace links exist
---

# Add a new traceability table

A traceability table is added if

-   there are trace links for the corresponding requirement
-   there does not exist a traceability table yet

<div class="tracey">

| File                                                                                                                      | Line | Description                          |
| ------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------ |
| [src/Requirement/UpdateProcess/Strategy/Add.ts](../../../src/Requirement/UpdateProcess/Strategy/Add.ts#L1)                | 1    | The add action of the update process |
| [src/Requirement/UpdateProcess/Strategy/Conditions.ts](../../../src/Requirement/UpdateProcess/Strategy/Conditions.ts#L18) | 18   | Check if no tracey block exists      |
| [src/Requirement/UpdateProcess/Strategy/Conditions.ts](../../../src/Requirement/UpdateProcess/Strategy/Conditions.ts#L21) | 21   | Check if trace links exist           |

</div>
