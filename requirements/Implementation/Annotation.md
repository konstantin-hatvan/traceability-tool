---
id: Implementation/Annotation
---

# Annotating requirements in the source code

-   Requirement identifiers are delimited by `#[ ... ]#`
-   Multiple requirement identifiers are listed in a comma separated list
-   The description is delimited by `#( ... )#`

<div class="tracey">

| File                                                                                                 | Line | Description                                                           |
| ---------------------------------------------------------------------------------------------------- | ---- | --------------------------------------------------------------------- |
| [src/Implementation/Annotation/Annotation.ts](../../src/Implementation/Annotation/Annotation.ts#L9)  | 9    | Parse the raw annotation string                                       |
| [src/Implementation/Annotation/preprocess.ts](../../src/Implementation/Annotation/preprocess.ts#L17) | 17   | Preprocess the raw annotation                                         |
| [src/Implementation/Annotation/process.ts](../../src/Implementation/Annotation/process.ts#L14)       | 14   | The description is delimited by `#(`                                  |
| [src/Implementation/Annotation/process.ts](../../src/Implementation/Annotation/process.ts#L21)       | 21   | Requirement identifiers are delimited by `#[`                         |
| [src/Implementation/Annotation/process.ts](../../src/Implementation/Annotation/process.ts#L22)       | 22   | Multiple requirement identifiers are listed in a comma separated list |

</div>
