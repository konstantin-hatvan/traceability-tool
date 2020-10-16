import { TraceLink } from './types';
import { Requirement } from '../Requirement/types';
import { Annotation } from '../Annotation/types';

/**
 * List all tracelinks
 * @param requirements A list of tracelocations
 */
export const list = async (requirements: Requirement[], annotations: Annotation[]): Promise<TraceLink[]> => annotations.flatMap(annotation => {
    const destination = requirements.find(requirement => {
        if (requirement.id === annotation.identifier) {
            return true;
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
WARNING: Requirement with the ID ${annotation.identifier} does not exist but was annotated in ${annotation.file} on line ${annotation.line}
Possible errors:
- The Requirement file with the identifier ${annotation.identifier} is excluded
- The annotation is wrong

`);
    };

    return [];
});
