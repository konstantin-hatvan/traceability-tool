import fs from 'fs';
import readline from 'readline';
import { Implementation, ImplementationConfiguration } from '../Shared/types';
import { constants } from '../Shared/constants';
import { collect } from './ImplementationCollector';

export const stripComment = (str: string): string => str.substring(str.indexOf(constants.requirement.annotation)).trim();

export const stripAnnotation = (str: string): string => str.substring(constants.requirement.annotation.length).trim();

export const splitCommaSeparatedList = (str: string): string[] => str.split(',');

export const trimArray = (strs: string[]): string[] => strs.map(str => str.trim());

export const getRequirementIds = (str: string): string[] => trimArray(
    splitCommaSeparatedList(
        stripAnnotation(
            stripComment(str)
        )
    )
);

export const createImplementations = async (files: string[]): Promise<Implementation[]> => {
    let output: Implementation[] = [];

    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        let line = 1;

        const rl = readline.createInterface({
            input: fs.createReadStream(file),
            crlfDelay: Infinity,
        });

        for await (const content of rl) {
            if (content.indexOf(constants.requirement.annotation) >= 0) {
                const requirements = getRequirementIds(content);

                requirements.forEach(requirement => output.push({
                    type: 'implementation',
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

export const list = (configuration: ImplementationConfiguration): Promise<Implementation[]> => createImplementations(collect(configuration.startingpoint, configuration.excludes));
