import { Annotation } from "./Annotation/types";
import { Requirement } from "./Requirement/types";
import { TraceLink } from "./TraceLink/types";

export interface CollectorConfiguration {
    startingpoints: string[];
    excludes: string[];
}

export interface Configuration {
    requirement: CollectorConfiguration;
    annotation: CollectorConfiguration;
};

export interface PluginParameters {
    requirements: Requirement[];
    annotations: Annotation[];
    tracelinks: TraceLink[];
};

export type Plugin = (input: PluginParameters) => PluginParameters;
