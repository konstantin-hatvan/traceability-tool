import { Configuration, PluginParameters } from '../types';
import * as TraceLinkService from '../TraceLink';
import * as RequirementService from '../Requirement';
import * as AnnotationService from '../Annotation';
import { getConfiguration } from './Configuration';
import { runPlugins } from './Plugin';

const getData = async (configuration: Configuration): Promise<PluginParameters> => {
    const requirements = RequirementService.list(configuration.requirement);
    const annotations = await AnnotationService.list(configuration.annotation);
    const tracelinks = await TraceLinkService.list(requirements, annotations);

    return {
        requirements,
        annotations,
        tracelinks,
    };
};

export const run = async () => {
    const configuration = getConfiguration();
    const data = await getData(configuration);
    const transformedData = runPlugins(configuration, data);

    // Persist changes
    transformedData.requirements.forEach(requirement => {
        RequirementService.persist(requirement);
    });
};
