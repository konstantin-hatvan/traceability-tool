import { hasAnnotation } from '../../Collector';
import { TraceLocation } from '../../TraceLocation/types';

export const collect = (traceLocations: TraceLocation[]): TraceLocation[] => traceLocations.reduce((result: TraceLocation[], traceLocation: TraceLocation) => {
    const file = traceLocation.file;

    if (hasAnnotation(file)) {
        result.push(traceLocation);
    }

    return result;
}, []);
