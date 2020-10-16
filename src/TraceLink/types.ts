import { Requirement } from '../Requirement/types'
import { Annotation } from '../Annotation/types';

export interface TraceLink {
    destination: Requirement;
    annotation: Annotation;
};
