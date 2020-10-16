import * as fs from 'fs';
import * as constants from '../Shared/constants';
import { CollectorConfiguration } from '../Shared/types';
import { createCollector, isNotExcluded } from '../Collector';
import { CollectorCondition } from '../Collector/types';

/**
 * Check if the file contains an annotation
 * @param annotation The annotation marker
 * @requirement #[ TraceLink.Collect ]# #( Files must contain an annotation )#
 */
const hasAnnotation: CollectorCondition = (file: string) => fs.readFileSync(file).indexOf(constants.annotation) >= 0;

/**
 * Collect all files that pass all conditions
 * @param configuration The configuration
 */
export const collect = (configuration: CollectorConfiguration): string[] => createCollector([
    isNotExcluded(configuration.excludes), /** @requirement #[ TraceLink.Collect ]# #( Files must not be excluded )# */
    hasAnnotation, /** @requirement #[ TraceLink.Collect ]# #( Files must contain an annotation )# */
])(configuration.startingpoints);
