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

interface CollectorConfiguration {
    startingpoints: string[];
    excludes: string[];
}

export interface RequirementConfiguration extends CollectorConfiguration { };

export interface ImplementationConfiguration extends CollectorConfiguration {
    annotation: string;
};

export interface Configuration {
    requirement: RequirementConfiguration;
    implementation: ImplementationConfiguration;
};
