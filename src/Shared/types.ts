//External dependencies
import { Node } from 'unist';

export type TraceabilityLocationType = 'requirement' | 'implementation';

export interface TraceabilityLocation {
    type: TraceabilityLocationType;
    file: string;
};

export interface Requirement extends TraceabilityLocation {
    type: 'requirement';
    ast: Node;
    id: string;
};

export interface Implementation extends TraceabilityLocation {
    type: 'implementation';
    line: number;
    requirement: string;
};

export interface TraceabilityLink {
    origin: Requirement;
    destination: Implementation;
};

export interface TraceabilityGraph {
    links: TraceabilityLink[];
    locations: TraceabilityLocation[];
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
