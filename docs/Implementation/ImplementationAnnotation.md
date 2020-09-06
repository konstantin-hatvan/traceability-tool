---
id: ImplementationAnnotation
---

# ImplementationAnnotation

-   Requirements are specified using the `@requirement` annotation
-   The annotation has to be part of a code comment
-   There must not be any comment characters at the end of the line (like: `/* @requirement Requirement */`)
-   There can be multiple requirement identifiers listed as comma separated list

## Examples

```css
/*
 * Good
 *
 * @requirement StyleRequirement
 */
.selector {
    /* ... */
}

/*
 * Bad
 *
 * @requirement StyleRequirement */
.selector {
    /* ... */
}
```

<div class="tracey">

| File                                                                                                | Line | Description                       |
| --------------------------------------------------------------------------------------------------- | ---- | --------------------------------- |
| [src/Implementation/Annotation/Annotation.ts](../../src/Implementation/Annotation/Annotation.ts#L1) | 1    | Implement annotation requirements |

</div>
