import * as fs from 'fs';
import * as constants from '../Shared/constants';
import { CollectorConfiguration } from '../Shared/types';
import { createCollector, CollectorCondition } from '../Common/Collector';

/**
 * Check if the file contains an annotation
 * @param annotation The annotation marker
 * @requirement #[ Annotation.Collect ]# #( Files must contain an annotation )#
 */
const hasAnnotation: CollectorCondition = (file: string) => fs.readFileSync(file).indexOf(constants.annotation) >= 0;

/**
 * Collect all files that pass all conditions
 * @param configuration The configuration
 */
export const collect = (configuration: CollectorConfiguration): string[] => createCollector(configuration, [
    hasAnnotation, /** @requirement #[ Annotation.Collect ]# #( Files must contain an annotation )# */
]);
