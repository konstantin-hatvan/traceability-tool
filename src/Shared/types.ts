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

export interface RequirementConfiguration {
    startingpoint: string;
    excludes: string[];
};

export interface ImplementationConfiguration {
    startingpoint: string;
    excludes: string[];
};

export interface Configuration {
    requirement: RequirementConfiguration;
    implementation: ImplementationConfiguration;
};

export interface KeyValueStore {
    [key: string]: string;
};
