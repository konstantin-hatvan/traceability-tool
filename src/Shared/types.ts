import { Node } from 'unist';

export type TraceLocationType = 'requirement' | 'implementation';

export interface TraceLocation {
    type: TraceLocationType;
    file: string;
};

export interface Requirement extends TraceLocation {
    type: 'requirement';
    ast: Node;
    id: string;
};

export interface Implementation extends TraceLocation {
    type: 'implementation';
    line: number;
    requirement: string;
};

export interface TraceLink {
    origin: Requirement;
    destination: Implementation;
};

export interface TraceGraph {
    links: TraceLink[];
    locations: TraceLocation[];
};

export interface TraceLocationConfiguration {
    startingpoint: string;
    excludes: string[];
}

export interface RequirementConfiguration extends TraceLocationConfiguration {};

export interface ImplementationConfiguration extends TraceLocationConfiguration {
    annotation: string;
};

export interface Configuration {
    requirement: RequirementConfiguration;
    implementation: ImplementationConfiguration;
};

export interface KeyValueStore {
    [key: string]: string;
};
