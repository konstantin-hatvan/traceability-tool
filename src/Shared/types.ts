import { Node } from 'unist';

export interface UpdateProcessCondition {
    (requirement: Requirement, traceLinks: TraceLink[]): boolean;
};

export interface UpdateProcessAction {
    (requirement: Requirement, traceLinks: TraceLink[]): void;
};

export interface UpdateProcessStrategy {
    condition: UpdateProcessCondition;
    action: UpdateProcessAction;
};

export interface TraceLocation {
    type: string;
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
    description: string;
};

export interface ImplementationAnnotation {
    requirements: string[];
    description: string;
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
    annotation: string;
};

export interface Configuration {
    requirement: RequirementConfiguration;
    implementation: ImplementationConfiguration;
};

export interface KeyValueStore {
    [key: string]: string;
};
