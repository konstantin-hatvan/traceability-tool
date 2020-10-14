import * as fs from 'fs';
import * as readline from 'readline';
import * as constants from '../../Shared/constants'
import { TraceLocation } from '../../TraceLocation/types';
import { TraceLinkAnnotation } from '../types';

/**
 * Slice a substring in between begin and end characters
 * @param str A string
 * @param begin The starting character
 * @param end The end character
 */
const sliceBetween = (str: string, begin: string, end: string): string => str.slice(str.indexOf(begin) + begin.length, str.indexOf(end));

const parseAnnotation = (content: string) => ({
    description: sliceBetween(content, '#(', ')#').trim(),
    identifiers: sliceBetween(content, '#[', ']#').trim().split(',').map(identifier => identifier.trim()),
});

export const create = async (location: TraceLocation): Promise<TraceLinkAnnotation[]> => {
    let line = 1;
    let output: TraceLinkAnnotation[] = [];

    const rl = readline.createInterface({
        input: fs.createReadStream(location.file),
        crlfDelay: Infinity,
    });

    for await (const content of rl) {
        if (content.indexOf(constants.annotation) >= 0) {
            const { description, identifiers } = parseAnnotation(content);

            identifiers.forEach(identifier => output.push({
                location,
                line,
                identifier,
                description,
            }));
        }
        line++;
    }

    return output;
};
