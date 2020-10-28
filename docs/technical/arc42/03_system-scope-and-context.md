# Context

Tracey collects data from the file system.
This data is passed through a chain of plugins.
In the end Tracey writes the updated data back to the file system.

![Business Context](./03_business-context.png "Business Context")

| Neighbor    | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| Developer   | Uses Tracey on the command line to generate tracelinks        |
| File System | Requirements and annotations are located in the project files |
| Plugin      | Data is passed through a chain of plugins                     |
