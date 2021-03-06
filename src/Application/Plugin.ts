import { Configuration, Plugin, PluginParameters } from '../types';
import { plugin as TracelinktablePlugin } from '../Core';

const getPlugins = (configuration: Configuration): Plugin[] => {
    return [
        TracelinktablePlugin,
        ...configuration.plugins,
    ];
};

const pipeDataThroughPlugins = (data: PluginParameters, plugins: Plugin[]): PluginParameters => plugins.reduce((result, plugin) => plugin(result), data);

export const runPlugins = (configuration: Configuration, data: PluginParameters): PluginParameters => {
    const plugins = getPlugins(configuration);
    return pipeDataThroughPlugins(data, plugins);
};
