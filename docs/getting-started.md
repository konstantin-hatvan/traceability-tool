# Getting Started

## Installation

`npm install tracey-cli --save-dev`

## Document Requirements

Document your project requirements in markdown files. Every requirement file is assigned a unique identifier as YAML frontmatter.

```md
---
id: MyRequirement
---

# My Requirement
<!-- ... -->
```

## Annotate Requirements

Annotate the requirement identifier in the source code. Use the `@requirement` annotation. An annotation consists of the requirement identifier and a description. The requirement identifier is written inside `#[` and `]#`. The description is written inside `#(` and `)#`.

```js
/** @requirement #[ MyRequirement ]# #( This is the description )# */
function myFunction() {
    // ...
}
```

## Configuration

Create a `tracey.config.js` in the project root and configure it according to the project. In the following example our requirements are documented in the `requirements` directory and our source code is within the `src` directory.

```js
module.exports = {
    requirement: {
        startingpoint: 'requirements', // The startingpoint directory for requirement files
    },
    implementation: {
        startingpoint: 'src', // The startingpoint directory for source code files
    },
};
```
## Generate Trace Links

Execute `tracey` in the project root.

## Advanced Configuration

For advanced configuration options have a look at the [Advanced Configuration](./advanced-configuration.md) Guide
