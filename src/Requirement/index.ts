import * as fs from 'fs';
import { collect } from './Collector';
import { create } from './Factory';
import { CollectorConfiguration } from '../types';
import { Requirement } from './types';
import { stringify } from './Markdown';

/**
 * Check if requirement identifiers are unique
 * @requirement #[ Requirement.Identifier ]# #( Requirement identifiers must be unique )#
 */
const checkIdentifiers = (requirements: Requirement[]) => {
    const ids = requirements.map(requirement => requirement.id);
    const duplicateIds = ids.reduce((result: string[], id: string, index) => {
        if (!result.includes(id) && ids.indexOf(id) !== index) {
            result.push(id);
        }

        return result;
    }, []);
    const groupedDuplicates = duplicateIds.map(id => requirements.filter(requirement => requirement.id === id));

    if (groupedDuplicates.length) {
        const errorMessage = groupedDuplicates.map(group => ([
            `ERROR: Requirement identifier '${group[0].id}' is not unique`,
            'It was found in the following files:',
            ...group.map(duplicate => duplicate.file),
            'Please make sure requirement identifiers are unique',
            'Aborting!',
            '',
        ].join('\n')))
        .join('\n');

        throw new Error(errorMessage); /** @requirement #[ Requirement.Identifier ]# #( If requirement identifiers are not unique an error message is displayed )# */
    }
}

export const list = (configuration: CollectorConfiguration): Requirement[] => {
    const requirements = collect(configuration).map(create);
    checkIdentifiers(requirements);

    return requirements;
};

export const persist = (requirement: Requirement): void => {
    fs.writeFileSync(requirement.file, stringify(requirement.ast));
};
