---
id: Requirement/TraceabilityTable/Update
synopsis: An existing traceability table is updated if trace links have changed
---

# Update an existing traceability table

An existing traceability table is updated if

-   there are trace links for the corresponding requirement
-   there already exists a traceability table

<div class="tracey">

| File                                                                                                                      | Line | Description                             |
| ------------------------------------------------------------------------------------------------------------------------- | ---- | --------------------------------------- |
| [src/Requirement/UpdateProcess/Strategy/Conditions.ts](../../../src/Requirement/UpdateProcess/Strategy/Conditions.ts#L4)  | 4    | Check if a tracey block exists          |
| [src/Requirement/UpdateProcess/Strategy/Conditions.ts](../../../src/Requirement/UpdateProcess/Strategy/Conditions.ts#L20) | 20   | Check if trace links exist              |
| [src/Requirement/UpdateProcess/Strategy/Update.ts](../../../src/Requirement/UpdateProcess/Strategy/Update.ts#L28)         | 28   | The update action of the update process |

</div>
