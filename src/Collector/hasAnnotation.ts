import * as fs from 'fs';
import { CollectorCondition } from './types';
import * as constants from '../Shared/constants';

/**
 * Check if the file contains an annotation
 * @param annotation The annotation marker
 */
export const hasAnnotation: CollectorCondition = (file: string) => fs.readFileSync(file).indexOf(constants.annotation) >= 0;
