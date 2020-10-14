import { TraceLink } from './types';
import { TraceLocation, Requirement } from '../TraceLocation/types';
import { Service as TraceLinkAnnotationService } from './Annotation';

export const list = async (traceLocations: TraceLocation[]): Promise<TraceLink[]> => {
    const traceLinkAnnotations = await TraceLinkAnnotationService.list(traceLocations);
    return traceLinkAnnotations.flatMap(annotation => {
        const destination = traceLocations.find(traceLocation => {
            if (traceLocation.type === 'requirement') {
                const requirement = <Requirement>traceLocation;
                if (requirement.id === annotation.identifier) {
                    return true;
                }
            }

            return false;
        });

        if (destination) {
            return {
                destination,
                annotation,
            };
        }

        if (!destination) {
            console.log(`
WARNING: Requirement with the ID ${annotation.identifier} does not exist but was annotated in ${annotation.location.file} on line ${annotation.line}
Possible errors:
- The Requirement file with the identifier ${annotation.identifier} is excluded
- The annotation is wrong

`);
        };

        return [];
    });
};
