import fs from 'fs';
import readline from 'readline';
import { Implementation } from '../../Shared/types';
import { parse } from '../Annotation/Annotation';
import * as constants from '../../Shared/constants';

export const create = async (files: string[]): Promise<Implementation[]> => {
    let output: Implementation[] = [];

    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        let line = 1;

        const rl = readline.createInterface({
            input: fs.createReadStream(file),
            crlfDelay: Infinity,
        });

        for await (const content of rl) {
            if (content.indexOf(constants.annotation) >= 0) {
                const { description, requirements } = parse(content, constants.annotation);

                requirements.forEach(requirement => output.push({
                    type: 'implementation',
                    file,
                    line,
                    requirement,
                    description,
                }));
            }
            line++;
        }
    }

    return output;
};
