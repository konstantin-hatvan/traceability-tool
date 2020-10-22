import { Annotation } from "./Annotation/types";
import { Requirement } from "./Requirement/types";
import { Tracelink } from "./Tracelink/types";

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
    tracelinks: Tracelink[];
};

export type Plugin = (input: PluginParameters) => PluginParameters;

export type ConfigurablePlugin = (configuration: any) => (input: PluginParameters) => PluginParameters;
