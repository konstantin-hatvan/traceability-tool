import { CollectorConfiguration } from '../../Shared/types';
import { createCollector, isNotExcluded, hasAnnotation } from '../../Collector';

/**
 * Collect all implementation files that pass all conditions
 * @param configuration The configuration
 */
export const collect = (configuration: CollectorConfiguration): string[] => createCollector([
    isNotExcluded(configuration.excludes), /** @requirement #[ TraceLink.Collect ]# #( Files must not be excluded )# */
    hasAnnotation, /** @requirement #[ TraceLink.Collect ]# #( Files must contain an annotation )# */
])(configuration.startingpoints);
