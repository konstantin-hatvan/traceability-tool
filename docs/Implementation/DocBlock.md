---
id: DocBlock
---

# DocBlock

Developers annotate connected requirements in the source code by using a docblock property (`@requirement`).
Developers can list one or many requirement identifiers in a comma separated list.

## Examples

```js
/**
 * Single requirement identifier
 * @requirement REQ_01
 */
function foo() {
    // ...
}

/**
 * Multiple requirement identifiers in a comma separated list
 * @requirement REQ_01, REQ_02, REQ_03
 */
function bar() {
    // ...
}
```
