import { TraceLocation } from '../TraceLocation/types'

export interface TraceLinkAnnotation {
    type: string;
    file: string;
    line: number;
    identifier: string;
    description: string;
};

export interface RequirementTraceLinkAnnotation {
    type: 'requirement';
}

export interface ImplementationTraceLinkAnnotation {
    type: 'implementation';
}

export interface TraceLink {
    origin: TraceLocation;
    destination: TraceLocation;
    annotation: TraceLinkAnnotation;
};
