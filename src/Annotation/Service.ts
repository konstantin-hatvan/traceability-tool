import { create } from './Factory';
import { Annotation } from './types';
import { CollectorConfiguration } from '../types';
import { collect } from './Collector';

/**
 * List all tracelink annotations
 * @param traceLocations A list of trace locations
 */
export const list = async (configuration: CollectorConfiguration): Promise<Annotation[]> => {
    const annotationPromises = collect(configuration).map(create);
    const annotations = await Promise.all(annotationPromises);
    return annotations.flat();
};
