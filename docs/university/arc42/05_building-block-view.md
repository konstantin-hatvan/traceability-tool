# Building Block View

## Components

Tracey consists of the components `Common`, `Requirement`, `Annotation` and `Application`. 

### Common

The `Common` component provides common functionality and general abstractions for all other components.

### Requirement

The `Requirement` component is responsible for collecting requirement data from the file system and writing requirement data back to the file system.
The component consists of the `Collector`, `Factory`, `Markdown` and `Service` module.

### Annotation

The `Annotation` component is responsible for collecting annotation data from the file system.
The component consists of the `Collector`, `Factory` and `Service` module.

### Application

The `Application` component is used to wire everything together.
It handles the configuration, uses the `Requirement` and `Annotation` component to collect or persist data and it manages the plugin API.
The component consists of the `Configuration` and the `Plugin` module.

## Pattern Language

The `Collector` and `Factory` modules describe shared patterns among the `Requirement` and `Annotation` component.

### Collector

> A Collector lists files from the file system

A `Collector` pattern describes a module that recursively walk the file system from a provided startingpoint.
Additionally, the `Collector` is given a set of conditions.
The `Collector` checks each file against all conditions.
The output is a list of all files found underneath the provided startingpoint that pass all provided conditions.

### Factory

> A Factory creates a data structure from a file

A `Factory` pattern describes a module that receives the output of a `Collector` pattern as input and transforms it to a data structure.
There are no additional rules on how to achieve that.
