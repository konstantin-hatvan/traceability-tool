import * as fs from 'fs';
import { ImplementationConfiguration } from '../../Shared/types';
import { createCollector, isNotExcluded } from '../../Collector';
import { CollectorCondition } from '../../Collector/types';

/**
 * Check if the file contains an annotation
 * @param annotation The annotation marker
 */
const hasAnnotation = (annotation: string): CollectorCondition => (file: string) => fs.readFileSync(file).indexOf(annotation) >= 0;

export const collect = (configuration: ImplementationConfiguration): string[] => createCollector([
    isNotExcluded(configuration.excludes), /** @requirement #[ Implementation/Collector ]# #( Implementation files must not be excluded )# */
    hasAnnotation(configuration.annotation), /** @requirement #[ Implementation/Collector ]# #( Implementation files must have an annotation )# */
])(configuration.startingpoints);
