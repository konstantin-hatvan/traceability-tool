import { TraceLink } from './types';
import { Requirement } from '../Requirement/types';
import { Service as TraceLinkAnnotationService } from './Annotation';
import { collect } from './Collector';
import { CollectorConfiguration } from '../Shared/types';

/**
 * List all tracelinks
 * @param requirements A list of tracelocations
 */
export const list = async (configuration: CollectorConfiguration, requirements: Requirement[]): Promise<TraceLink[]> => {
    const files = collect(configuration);
    const traceLinkAnnotations = await TraceLinkAnnotationService.list(files);
    return traceLinkAnnotations.flatMap(annotation => {
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
};
