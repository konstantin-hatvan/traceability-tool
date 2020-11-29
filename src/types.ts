import { Annotation } from "./Annotation/types";
import { Requirement } from "./Requirement/types";

export interface CollectorConfiguration {
    startingpoints: string[];
    excludes: string[];
}

export interface Configuration {
    requirement: CollectorConfiguration;
    annotation: CollectorConfiguration;
    plugins: Plugin[];
};

export interface PluginParameters {
    requirements: Requirement[];
    annotations: Annotation[];
};

export type Plugin = (input: PluginParameters) => PluginParameters;
