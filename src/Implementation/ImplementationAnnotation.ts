/**
 * @requirement ImplementationAnnotation
 */

import { constants } from '../Shared/constants';

const stripComment = (str: string): string => str.substring(str.indexOf(constants.requirement.annotation)).trim();

const stripAnnotation = (str: string): string => str.substring(constants.requirement.annotation.length).trim();

const stripWhitespace = (str: string): string => str.replace(/\s*/g, '');

const sanitizers = [
    stripComment,
    stripAnnotation,
    stripWhitespace,
];

const sanitize = (lineWithAnnotation: string): string => sanitizers.reduce((result, sanitizer) => sanitizer(result), lineWithAnnotation);

export const parse = (lineWithAnnotation: string): string[] => sanitize(lineWithAnnotation).split(',');
