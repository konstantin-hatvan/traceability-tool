import { Requirement } from '../Requirement/types'

export interface TraceLinkAnnotation {
    file: string;
    line: number;
    identifier: string;
    description: string;
};

export interface TraceLink {
    destination: Requirement;
    annotation: TraceLinkAnnotation;
};
