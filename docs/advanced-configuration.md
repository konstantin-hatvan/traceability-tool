# Advanced Configuration

The configuration is separated into multiple blocks.

## Requirement

### `requirement.excludes`

**Default**: `[]`

Use this configuration option to exclude multiple files from processing. Excludes are regular expressions and must be escaped.

#### Example

```js
{
    requirement: {
        excludes: [
            'index\\.md',
        ],
    },
}
```

### `requirement.startingpoint`

**Default**: `.`

Use this configuration option to configure the startingpoint directory.

## Implementation

### `implementation.excludes`

**Default**: `[]`

Use this configuration option to exclude multiple files from processing. Excludes are regular expressions and must be escaped.

#### Example

```js
{
    implementation: {
        excludes: [
            '.*\\.test\\..*',
        ],
    },
}
```


### `implementation.startingpoint`

**Default**: `.`

Use this configuration option to configure the startingpoint directory.
