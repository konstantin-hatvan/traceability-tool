import { create } from './Factory';
import { TraceLinkAnnotation } from '../types';

/**
 * List all tracelink annotations
 * @param traceLocations A list of trace locations
 */
export const list = async (files: string[]): Promise<TraceLinkAnnotation[]> => {
    const traceLinkAnnotationsPromise = files.map(create);
    const traceLinkAnnotations = await Promise.all(traceLinkAnnotationsPromise);
    return traceLinkAnnotations.flat();
};
