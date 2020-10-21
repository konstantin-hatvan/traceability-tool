#!/usr/bin/env node

import { Configuration, Plugin, PluginParameters } from './types';
import * as TraceLinkService from './TraceLink';
import * as RequirementService from './Requirement';
import * as AnnotationService from './Annotation';
import merge from 'lodash.merge';
import * as path from 'path';
import { plugin as TracelinktablePlugin } from './tracey-plugin-tracelinktable';
import { plugin as ChildrequirementsPlugin } from './tracey-plugin-childrequirements';
import { plugin as BreadcrumbsPlugin } from './tracey-plugin-breadcrumbs';

/**
 * Merge the user configuration with the default configuration
 */
const loadConfiguration = () => {
    const result = require(path.resolve('tracey.config.js'));

    const defaultConfiguration: Configuration = {
        annotation: {
            excludes: [],
            startingpoints: [
                '**',
            ],
        },
        requirement: {
            excludes: [],
            startingpoints: [
                '**',
            ],
        },
    };

    return merge(defaultConfiguration, result);
}

/**
 * Run the program
 * @param configuration The configuration
 */
const main = async (configuration: Configuration) => {
    const requirements = RequirementService.list(configuration.requirement);
    const annotations = await AnnotationService.list(configuration.annotation);
    const tracelinks = await TraceLinkService.list(requirements, annotations);

    const pluginInput: PluginParameters = {
        requirements,
        annotations,
        tracelinks,
    };

    const plugins: Plugin[] = [
        TracelinktablePlugin,
        ChildrequirementsPlugin,
        BreadcrumbsPlugin,
    ];

    const pluginResult = plugins.reduce((result, plugin) => plugin(result), pluginInput);

    pluginResult.requirements.forEach(requirement => {
        RequirementService.persist(requirement);
    });
};

main(loadConfiguration()).then(() => {
    console.log('Process finished');
});
