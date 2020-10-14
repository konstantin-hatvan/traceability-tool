import { TraceLocation } from '../TraceLocation/types'

export interface TraceLinkAnnotation {
    location: TraceLocation;
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
    destination: TraceLocation;
    annotation: TraceLinkAnnotation;
};
