import { Configuration, Plugin, PluginParameters } from '../types';
import { plugin as TracelinktablePlugin } from '../tracey-plugin-tracelinktable';
import { plugin as ChildrequirementsPlugin } from '../tracey-plugin-childrequirements';
import { plugin as BreadcrumbsPlugin } from '../tracey-plugin-breadcrumbs';
import { plugin as RequirementsummaryPlugin } from '../tracey-plugin-requirementsummary';

const getPlugins = (configuration: Configuration): Plugin[] => {
    return [
        TracelinktablePlugin,
        ChildrequirementsPlugin,
        BreadcrumbsPlugin,
        RequirementsummaryPlugin({ file: 'docs/requirements/Requirements.md' }),
    ];
};

const pipeDataThroughPlugins = (data: PluginParameters, plugins: Plugin[]): PluginParameters => plugins.reduce((result, plugin) => plugin(result), data);

export const runPlugins = (configuration: Configuration, data: PluginParameters): PluginParameters => {
    const plugins = getPlugins(configuration);
    return pipeDataThroughPlugins(data, plugins);
};
