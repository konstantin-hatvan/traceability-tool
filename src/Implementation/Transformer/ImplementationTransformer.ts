import fs from 'fs';
import readline from 'readline';
import { requirementAnnotation } from '../../Shared/constants';
import { ImplementationData } from '../../Shared/types';

/**
 * Remove any comment tokens from provided string
 * @param str A string with a code comment
 */
const removeComment = (str: string): string => str.substring(str.indexOf(requirementAnnotation)).trim();

/**
 * Remove the requirement annotation from given string
 * @param str A string with a requirement annotation
 */
const removeAnnotation = (str: string): string => str.substring(requirementAnnotation.length).trim();

/**
 * Transform a comma separated list to an array
 * @param str A comma separated list
 */
const splitCommaSeparatedList = (str: string): string[] => str.split(',');

/**
 * Remove any trailing or leading whitespace from the strings of an array
 * @param strs An array of strings
 */
const trimArray = (strs: string[]): string[] => strs.map(str => str.trim());

/**
 * Parse the given code comment with requirement annotation into an array of requirement ids
 * @param str A code comment with a requirement annotation
 */
const getRequirementIds = (str: string): string[] => trimArray(
    splitCommaSeparatedList(
        removeAnnotation(
            removeComment(str)
        )
    )
);

/**
 * Transform implementation files into an ImplementationData data structure
 * @param files A list of implementation files
 */
const transform = async (files: string[]): Promise<ImplementationData[]> => {
    let output: ImplementationData[] = [];

    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        let line = 1;

        const rl = readline.createInterface({
            input: fs.createReadStream(file),
            crlfDelay: Infinity,
        });

        for await (const content of rl) {
            if (content.indexOf(requirementAnnotation) >= 0) {
                const requirements = getRequirementIds(content);

                requirements.forEach(requirement => output.push({
                    file,
                    line,
                    requirement,
                }));
            }
            line++;
        }
    }

    return output;
};

const ImplementationTransformer = {
    transform,
};

export default ImplementationTransformer;
