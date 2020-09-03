import fs from 'fs';
import readline from 'readline';
import { Implementation, ImplementationConfiguration } from '../Shared/types';
import { constants } from '../Shared/constants';
import { collect } from './Collector';
import { parse } from './Annotation';

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
                const requirements = parse(content);

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
