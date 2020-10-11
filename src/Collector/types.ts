export type Collector = (startingpoints: string[]) => string[];

export type CollectorCondition = (file: string) => boolean;
