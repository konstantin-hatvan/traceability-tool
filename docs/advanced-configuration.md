# Advanced Configuration

The configuration is separated into multiple blocks.

## Requirement

### `requirement.excludes`

**Default**: `[]`

Use this configuration option to exclude multiple files from processing. Excludes follw the [gitignore spec](https://git-scm.com/docs/gitignore)

#### Example

```js
{
    requirement: {
        excludes: [
            'node_modules',
            'ExcludedRequirement.md',
        ],
    },
}
```

### `requirement.startingpoints`

**Default**: `[ '**' ]`

Use this configuration option to configure the startingpoint directories. Startingpoints use glob patterns

## Annotation

### `annotation.excludes`

**Default**: `[]`

Use this configuration option to exclude multiple files from processing. Excludes follw the [gitignore spec](https://git-scm.com/docs/gitignore)

#### Example

```js
{
    annotation: {
        excludes: [
            'node_modules',
            '*.test.ts',
        ],
    },
}
```


### `annotation.startingpoints`

**Default**: `[ '**' ]`

Use this configuration option to configure the startingpoint directories. Startingpoints use glob patterns
