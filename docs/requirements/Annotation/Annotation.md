---
id: Annotation.Syntax
parent: Annotation
synopsis: Annotations are language-independent
---

<div class="tracey tracey-plugin-breadcrumbs">

[Annotation](../Annotation.md "Annotation")

</div>

# Annotation Syntax

The annotation must be language independent. Therefore, the program uses a custom, language-independent syntax.

-   The annotation marker is `@requirement`
-   The requirement identifiers are comma-separated and wrapped by `#[`
-   The description is wrapped by `#(`

<div class="tracey tracey-plugin-tracelinktable">

| File                                                                                            | Line | Description                                                        |
| ----------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ |
| [src/Annotation/Factory.ts](../../../src/Annotation/Factory.ts#L19 "src/Annotation/Factory.ts") | 19   | The description is wrapped by #(                                   |
| [src/Annotation/Factory.ts](../../../src/Annotation/Factory.ts#L21 "src/Annotation/Factory.ts") | 21   | The requirement identifiers are comma-separated and wrapped by #\[ |

</div>
