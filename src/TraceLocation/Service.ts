import { TraceLocation } from './types';
import { Service as RequirementService } from './Requirement';
import { Service as ImplementationService } from './Implementation';
import { Configuration } from '../Shared/types';

/**
 * List all tracelocations
 * @param configuration The configuration
 */
export const list = (configuration: Configuration): TraceLocation[] => {
    const requirements = RequirementService.list(configuration.requirement);
    const implementations = ImplementationService.list(configuration.implementation);

    return [
        ...requirements,
        ...implementations,
    ];
};
