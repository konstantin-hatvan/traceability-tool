import * as fs from 'fs';
import * as readline from 'readline';
import * as constants from '../../Shared/constants'
import { TraceLinkAnnotation } from '../types';

/**
 * Slice a substring in between begin and end characters
 * @param str A string
 * @param begin The starting character
 * @param end The end character
 */
const sliceBetween = (str: string, begin: string, end: string): string => str.slice(str.indexOf(begin) + begin.length, str.indexOf(end));

/**
 * Parse the description and the requirement identifiers from an annotation
 * @param content The source line with the annotation marker
 */
const parseAnnotation = (content: string) => ({
    /** @requirement #[ TraceLink.Annotation ]# #( The description is wrapped by `#(` )# */
    description: sliceBetween(content, '#(', ')#').trim(),
    /** @requirement #[ TraceLink.Annotation ]# #( The requirement identifiers are comma-separated and wrapped by `#[` )# */
    identifiers: sliceBetween(content, '#[', ']#').trim().split(',').map(identifier => identifier.trim()),
});

/**
 * Create trace link annotations
 * @param location A trace location
 */
export const create = async (file: string): Promise<TraceLinkAnnotation[]> => {
    let line = 1;
    let output: TraceLinkAnnotation[] = [];

    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity,
    });

    for await (const content of rl) {
        if (content.indexOf(constants.annotation) >= 0) {
            const { description, identifiers } = parseAnnotation(content);

            identifiers.forEach(identifier => output.push({
                file,
                line,
                identifier,
                description,
            }));
        }
        line++;
    }

    return output;
};
