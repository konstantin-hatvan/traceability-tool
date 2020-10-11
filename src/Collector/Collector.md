# Collector

A Collector represents the initial link between the file system and the domain model.

- A Collector computes a set of file system paths
- A Collector recursively walks the file system from a set of startingpoints
- A Collector decides wether it should collect a file based on a set of conditions
- For a file to be collected, it has to pass all conditions

## Signatures

```ts
type CollectorCondition = (file: string) => boolean;
type Collector = (conditions: CollectorCondition[]) => (startingpoints: string[]) => string[];
```

## Configuration

A Collector has two configuration options:

- `startingpoints`: A set of file system startingpoints. Beginning from each startingpoint the Collector walks the file system recursively
- `conditions`: A set of conditions. A file has to pass all conditions to be collected
