---
id: Requirement/TraceabilityTable/Delete
synopsis: An existing traceability table is deleted if no trace links exist
---

# Delete an existing traceability table

An existing traceability table is deleted if

-   there are no trace links for the corresponding requirement
-   there already exists a traceability table

<div class="tracey">

| File                                                                                                                      | Line | Description                             |
| ------------------------------------------------------------------------------------------------------------------------- | ---- | --------------------------------------- |
| [src/Requirement/UpdateProcess/Strategy/Conditions.ts](../../../src/Requirement/UpdateProcess/Strategy/Conditions.ts#L4)  | 4    | Check if a tracey block exists          |
| [src/Requirement/UpdateProcess/Strategy/Conditions.ts](../../../src/Requirement/UpdateProcess/Strategy/Conditions.ts#L23) | 23   | Check if no trace links exist           |
| [src/Requirement/UpdateProcess/Strategy/Delete.ts](../../../src/Requirement/UpdateProcess/Strategy/Delete.ts#L22)         | 22   | The delete action of the update process |

</div>
