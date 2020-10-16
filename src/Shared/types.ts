export interface CollectorConfiguration {
    startingpoints: string[];
    excludes: string[];
}

export interface Configuration {
    requirement: CollectorConfiguration;
    annotation: CollectorConfiguration;
};
