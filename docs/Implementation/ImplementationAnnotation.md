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

| Traceability Link                                                                                         |
| --------------------------------------------------------------------------------------------------------- |
| [src/Implementation/ImplementationAnnotation.ts](../../src/Implementation/ImplementationAnnotation.ts#L2) |

</div>
