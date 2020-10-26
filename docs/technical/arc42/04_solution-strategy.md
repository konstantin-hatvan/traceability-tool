# Solution Strategy

## Quality Goals

### Lightweight

Tracey has a small set of rules that are easy to learn and follow.
In short summary the rules are:

- Document the requirements in markdown files
- Assign each requirement a unique identifier in the frontmatter
- Use the frontmatter identifier in the source code annotations

This makes the system very easy to use and easy to learn.

### Extensibility

Tracey allows extension of the core functionality through plugins.
Plugins are functions and only have follow a single rule.
They function output has to be the same shape as the function input.
Plugins also conform to the lightweight quality goal.

### Scientific Contribution

The scientific contribution builds upon the systematic literature review of [Wang et al., “Requirements Traceability Technologies and Technology Transfer Decision Support: A Systematic Review.”](https://www.sciencedirect.com/science/article/abs/pii/S0164121218301754). 
In this paper, Wang et al. summarize the current state of requirements traceability technology and also list current challenges as well as future areas of research. 
This project is focused on the _lightweight_ and _automated_ challenges and research directions.

### Gradual Adoptability

Tracey has few requirements regarding the project, namely the existence of a Node.js execution environment and the use of the lightweight workflow.
Other than that there are no requirements regarding project setup, structure and environment.
This makes it easily possible to introduce Tracey into existing projects.

## Technology Decisions

TypeScript was chosen as implementation language because it is closely related to the development stack at LIMESODA (JavaScript, PHP) and Konstantin Hatvan is familiar with it. Moreove, TypeScript offers the benefits of a typed language while still being JavaScript. Another reason was the additional educational benefit for Konstantin Hatvan.

Another technical decision was to implement Tracey using functional programming concepts. This decision was made because following these principles leads to testable code by design. Additionally, after the initial software design prototype it seemed like an object oriented approach would not reap any benefits over a functional approach.
