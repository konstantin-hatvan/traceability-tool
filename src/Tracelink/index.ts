import { Tracelink } from './types';
import { Requirement } from '../Requirement/types';
import { Annotation } from '../Annotation/types';

/**
 * List all tracelinks
 * @param requirements A list of tracelocations
 */
export const list = (requirements: Requirement[], annotations: Annotation[]): Tracelink[] => annotations.flatMap(annotation => {
    const requirement = requirements.find(requirement => requirement.id === annotation.identifier);

    if (!requirement) {
        console.log(`
WARNING: Requirement with the ID ${annotation.identifier} does not exist but was annotated in ${annotation.file} on line ${annotation.line}
Possible errors:
- The Requirement file with the identifier ${annotation.identifier} is excluded
- The annotation is wrong

`);
        return [];
    } else {
        return {
            requirement,
            annotation,
        };
    }
});
