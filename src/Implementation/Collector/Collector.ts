import * as fs from 'fs';
import { CollectorConfiguration } from '../../Shared/types';
import { createCollector, isNotExcluded } from '../../Collector';
import { CollectorCondition } from '../../Collector/types';
import * as constants from '../../Shared/constants';

/**
 * Check if the file contains an annotation
 * @param annotation The annotation marker
 */
const hasAnnotation: CollectorCondition = (file: string) => fs.readFileSync(file).indexOf(constants.annotation) >= 0;

export const collect = (configuration: CollectorConfiguration): string[] => createCollector([
    isNotExcluded(configuration.excludes), /** @requirement #[ Implementation/Collector ]# #( Implementation files must not be excluded )# */
    hasAnnotation, /** @requirement #[ Implementation/Collector ]# #( Implementation files must have an annotation )# */
])(configuration.startingpoints);
