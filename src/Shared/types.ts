import { Root } from 'mdast';

interface TraceLocation {
    type: string;
    file: string;
};

export interface Requirement extends TraceLocation {
    type: 'requirement';
    ast: Root;
    id: string;
    synopsis: string;
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
