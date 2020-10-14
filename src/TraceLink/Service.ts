import { TraceLink } from './types';
import { TraceLocation, Requirement } from '../TraceLocation/types';
import { Service as TraceLinkAnnotationService } from './Annotation';

export const list = async (traceLocations: TraceLocation[]): Promise<TraceLink[]> => {
    const traceLinkAnnotations = await TraceLinkAnnotationService.list(traceLocations);
    return traceLinkAnnotations.flatMap(annotation => {
        const origin = traceLocations.find(traceLocation => {
            if (traceLocation.type === 'requirement') {
                const requirement = <Requirement>traceLocation;
                if (requirement.id === annotation.identifier) {
                    return true;
                }
            }

            return false;
        });

        // Destination should always exist because if not there would not be a TraceLinkAnnotation
        // Therefore there is no error handling for the case of undefined
        const destination = traceLocations.find(traceLocation => traceLocation.file === annotation.file);

        if (origin && destination) {
            return {
                origin,
                destination,
                annotation,
            };
        }

        if (!origin) {
            console.log(`
WARNING: Requirement with the ID ${annotation.identifier} does not exist but was annotated in ${annotation.file} on line ${annotation.line}
Possible errors:
- The Requirement file with the identifier ${annotation.identifier} is excluded
- The annotation is wrong

`);
        };

        return [];
    });
};
