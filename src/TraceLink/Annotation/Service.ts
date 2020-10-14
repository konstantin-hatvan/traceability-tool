import { collect } from './Collector';
import { create } from './Factory';
import { TraceLocation } from '../../TraceLocation/types';
import { TraceLinkAnnotation } from '../types';

export const list = async (traceLocations: TraceLocation[]): Promise<TraceLinkAnnotation[]> => {
    const traceLinkAnnotationsPromise = collect(traceLocations).map(create);
    const traceLinkAnnotations = await Promise.all(traceLinkAnnotationsPromise);
    return traceLinkAnnotations.flat();
};
