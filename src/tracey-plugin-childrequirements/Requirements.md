---
id: ChildRequirements
synopsis: The plugin generates tracelinks between hierarchical requirements
---

# Plugin: Child Requirements

This plugin enables the developer to connect requirements in a parent-child relationship. These relationships will then be rendered as a table of tracelinks in each requirement.

-   Developers can specify the parent requirement by using the frontmatter property `parent` on the child requirement
-   The value of the `parent` property must be a valid requirement identifier
-   Child requirements will be rendered as a table of tracelinks on the parent requirement
