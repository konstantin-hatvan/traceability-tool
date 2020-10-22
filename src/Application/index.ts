import { Configuration, PluginParameters } from '../types';
import { list as listTracelinks } from '../Tracelink';
import { list as listRequirements, persist as persistRequirement } from '../Requirement';
import { list as listAnnotations } from '../Annotation';
import { getConfiguration } from './Configuration';
import { runPlugins } from './Plugin';

const getData = async (configuration: Configuration): Promise<PluginParameters> => {
    const requirements = listRequirements(configuration.requirement);
    const annotations = await listAnnotations(configuration.annotation);
    const tracelinks = listTracelinks(requirements, annotations);

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
        persistRequirement(requirement);
    });
};
