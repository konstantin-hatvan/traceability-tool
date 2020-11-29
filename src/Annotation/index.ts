import { create } from './Factory';
import { Annotation } from './types';
import { CollectorConfiguration } from '../types';
import { collect } from './Collector';

/**
 * List all annotations
 * @param configuration The collector configuration for annotations
 */
export const list = async (configuration: CollectorConfiguration): Promise<Annotation[]> => {
    const annotationPromises = collect(configuration).map(create);
    const annotations = await Promise.all(annotationPromises);
    return annotations.flat();
};
