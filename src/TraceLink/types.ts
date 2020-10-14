import { TraceLocation } from '../TraceLocation/types'

export interface TraceLinkAnnotation {
    location: TraceLocation;
    line: number;
    identifier: string;
    description: string;
};

export interface TraceLink {
    destination: TraceLocation;
    annotation: TraceLinkAnnotation;
};
