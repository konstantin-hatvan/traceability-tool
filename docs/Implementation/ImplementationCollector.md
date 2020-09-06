---
id: ImplementationCollector
---

# ImplementationCollector

-   All files within the configured `implementation.startingpoint` are collected
-   Implementation files need a requirement annotation to be collected
-   Implementation files can be excluded in the configuration with `implementation.excludes`
-   The `implementation.excludes` configuration option accepts regular expressions

## Examples

Given the following file tree

```yaml
- src
    - main.ts
    - styles.scss
    - index.html
    - build
        - main.js
        - styles.css
```

and the following configuration

```js
module.exports = {
    implementation: {
        startingpoint: 'src',
        excludes: [
            'build',
        ],
    }
}
```

the resulting file list is going to be

```js
[
    'main.ts',
    'styles.scss',
    'index.html',
]
```

<div class="tracey">

| File                                                                                            | Line | Description                                                |
| ----------------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------- |
| [src/Implementation/Collector/Collector.ts](../../src/Implementation/Collector/Collector.ts#L1) | 1    | Implement requirements for collecting implementation files |

</div>
