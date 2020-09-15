---
id: Requirement/TraceabilityTable
synopsis: Traceability tables are updated according to trace links
---

# Traceability Table

Traceability tables are updated according to trace links.

<div class="tracey-requirement">

| Requirement            | Synopsis                                                              | ID                                   |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------------ |
| [Add.md](Add.md)       | A traceability table is added if trace links exist                    | Requirement/TraceabilityTable/Add    |
| [Update.md](Update.md) | An existing traceability table is updated if trace links have changed | Requirement/TraceabilityTable/Update |
| [Delete.md](Delete.md) | An existing traceability table is deleted if no trace links exist     | Requirement/TraceabilityTable/Delete |

</div>

<div class="tracey">

| File                                                                                                                      | Line | Description                                |
| ------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------ |
| [src/Requirement/UpdateProcess/Strategy/Strategies.ts](../../../src/Requirement/UpdateProcess/Strategy/Strategies.ts#L6)  | 6    | All possible actions of the update process |
| [src/Requirement/UpdateProcess/Strategy/Strategies.ts](../../../src/Requirement/UpdateProcess/Strategy/Strategies.ts#L13) | 13   | The default action of the update process   |
| [src/Requirement/UpdateProcess/UpdateProcess.ts](../../../src/Requirement/UpdateProcess/UpdateProcess.ts#L4)              | 4    | Determine the action of the update process |
| [src/Requirement/UpdateProcess/UpdateProcess.ts](../../../src/Requirement/UpdateProcess/UpdateProcess.ts#L13)             | 13   | Run the action of the update process       |

</div>
