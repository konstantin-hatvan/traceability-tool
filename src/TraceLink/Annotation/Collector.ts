import { hasAnnotation } from '../../Collector';
import { TraceLocation } from '../../TraceLocation/types';

/**
 * Collect files that contain an annotation
 * @param traceLocations A list of trace locations
 * @requirement #[ TraceLink.Collect ]# #( Files must contain an annotation )#
 */
export const collect = (traceLocations: TraceLocation[]): TraceLocation[] => traceLocations.reduce((result: TraceLocation[], traceLocation: TraceLocation) => {
    const file = traceLocation.file;

    if (hasAnnotation(file)) {
        result.push(traceLocation);
    }

    return result;
}, []);
