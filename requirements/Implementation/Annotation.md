---
id: Implementation/Annotation
---

# Annotating requirements in the source code

-   By default, the annotation uses the property `@requirement`
-   The annotation property can be configured by using `implementation.annotation`
-   The annotation uses the schema `@requirement #[ __identifiers__ ]# #( __description__ )#`
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
| [src/index.ts](../../src/index.ts#L13)                                                               | 13   | The annotation uses a default property                                |
| [src/index.ts](../../src/index.ts#L23)                                                               | 23   | The annotation property is configurable                               |

</div>
