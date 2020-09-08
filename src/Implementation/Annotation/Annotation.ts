/** @requirement #[Implementation/Annotation]# #(Parse the raw annotation string)# */
import { ImplementationAnnotation } from '../../Shared/types';
import { preprocess } from './preprocess';
import { process } from './process';

/**
 * Parse the provided annotation string into its properties
 * @param lineWithAnnotation A string with an annotation
 * @param annotation The configured annotation marker
 */
export const parse = (lineWithAnnotation: string, annotation: string): ImplementationAnnotation => {
    const sanitizedLineWithAnnotation = preprocess(lineWithAnnotation, annotation);
    const { description, requirements } = process(sanitizedLineWithAnnotation);

    return {
        description,
        requirements,
    };
};
