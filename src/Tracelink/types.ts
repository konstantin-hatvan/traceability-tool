import { Requirement } from '../Requirement/types'
import { Annotation } from '../Annotation/types';

export interface Tracelink {
    destination: Requirement;
    annotation: Annotation;
};
