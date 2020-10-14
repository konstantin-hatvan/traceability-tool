import { Service as TraceLocationService } from '../TraceLocation';
import { Service as TraceLinkService } from '../TraceLink';
import { Mutations as RequirementMutations, Service as RequirementService } from '../TraceLocation/Requirement'
import { Configuration } from '../Shared/types';
import { Requirement } from '../TraceLocation/types';

export const main = async (configuration: Configuration) => {
    const traceLocations = TraceLocationService.list(configuration);
    const traceLinks = await TraceLinkService.list(traceLocations);
    const requirements = <Requirement[]>traceLocations.filter(traceLocation => traceLocation.type === 'requirement');

    requirements.forEach(requirement => {
        const linkedTraceLinks = traceLinks.filter(traceLink => traceLink.destination === requirement);
        const updatedRequirement = RequirementMutations.updateTraceLinks(requirement, linkedTraceLinks);
        RequirementService.persist(updatedRequirement);
    });
};
