---
id: Requirement/TraceabilityTable
synopsis: Traceability tables are updated according to trace links
---

# Traceability Table

Traceability tables are updated according to trace links.

<div class="tracey-requirement">

| Requirement                                                | Synopsis                                                              | ID                                   |
| ---------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------ |
| [TraceabilityTable/Add.md](TraceabilityTable/Add.md)       | A traceability table is added if trace links exist                    | Requirement/TraceabilityTable/Add    |
| [TraceabilityTable/Update.md](TraceabilityTable/Update.md) | An existing traceability table is updated if trace links have changed | Requirement/TraceabilityTable/Update |
| [TraceabilityTable/Delete.md](TraceabilityTable/Delete.md) | An existing traceability table is deleted if no trace links exist     | Requirement/TraceabilityTable/Delete |

</div>

<div class="tracey">

| File                                                                                                                  | Line | Description                                                   |
| --------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------- |
| [src/Requirement/UpdateProcess/Strategy/Conditions.ts](../../src/Requirement/UpdateProcess/Strategy/Conditions.ts#L2) | 2    | The conditions to determine the action for the update process |
| [src/Requirement/UpdateProcess/Strategy/Strategies.ts](../../src/Requirement/UpdateProcess/Strategy/Strategies.ts#L2) | 2    | All possible actions of the update process                    |
| [src/Requirement/UpdateProcess/UpdateProcess.ts](../../src/Requirement/UpdateProcess/UpdateProcess.ts#L2)             | 2    | Determine and run the action of the update process            |

</div>
