---
id: Requirement/TraceabilityTable
synopsis: Traceability tables are updated according to trace links
---

# Traceability Table

Traceability tables are updated according to trace links.

<div class="tracey-requirement">

| Requirement                                                                 | Synopsis                                                              | ID                                   |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------ |
| [docs/Requirement/TraceabilityTable/Add.ts](TraceabilityTable/Add.md)       | A traceability table is added if trace links exist                    | Requirement/TraceabilityTable/Add    |
| [docs/Requirement/TraceabilityTable/Update.ts](TraceabilityTable/Update.md) | An existing traceability table is updated if trace links have changed | Requirement/TraceabilityTable/Update |
| [docs/Requirement/TraceabilityTable/Delete.ts](TraceabilityTable/Delete.md) | An existing traceability table is deleted if no trace links exist     | Requirement/TraceabilityTable/Delete |

</div>

<div class="tracey">

| File                                                                                                                  | Line |
| --------------------------------------------------------------------------------------------------------------------- | ---- |
| [src/Requirement/UpdateProcess/Strategy/Conditions.ts](../../src/Requirement/UpdateProcess/Strategy/Conditions.ts#L2) | 2    |
| [src/Requirement/UpdateProcess/Strategy/Strategies.ts](../../src/Requirement/UpdateProcess/Strategy/Strategies.ts#L2) | 2    |
| [src/Requirement/UpdateProcess/UpdateProcess.ts](../../src/Requirement/UpdateProcess/UpdateProcess.ts#L2)             | 2    |

</div>
