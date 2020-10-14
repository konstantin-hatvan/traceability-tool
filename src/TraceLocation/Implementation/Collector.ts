import { CollectorConfiguration } from '../../Shared/types';
import { createCollector, isNotExcluded, hasAnnotation } from '../../Collector';

export const collect = (configuration: CollectorConfiguration): string[] => createCollector([
    isNotExcluded(configuration.excludes), /** @requirement #[ Implementation/Collector ]# #( Implementation files must not be excluded )# */
    hasAnnotation, /** @requirement #[ Implementation/Collector ]# #( Implementation files must have an annotation )# */
])(configuration.startingpoints);
