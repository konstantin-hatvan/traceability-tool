---
id: Annotation.Syntax
parent: Annotation
synopsis: The annotation uses a language-independent syntax
---

# Annotation Syntax

The annotation must be language independent. Therefore, the program uses a custom, language-independent syntax.

-   The annotation marker is `@requirement`
-   The requirement identifiers are comma-separated and wrapped by `#[`
-   The description is wrapped by `#(`

<div class="tracey tracey-plugin-tracelinktable">

| File                                                                | Line | Description                                                         |
| ------------------------------------------------------------------- | ---- | ------------------------------------------------------------------- |
| [src/Annotation/Factory.ts](../../../src/Annotation/Factory.ts#L19) | 19   | The description is wrapped by `#(`                                  |
| [src/Annotation/Factory.ts](../../../src/Annotation/Factory.ts#L21) | 21   | The requirement identifiers are comma-separated and wrapped by `#[` |

</div>
