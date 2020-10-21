import * as fs from 'fs';
import { collect } from './Collector';
import { create } from './Factory';
import { CollectorConfiguration } from '../types';
import { Requirement } from './types';
import { stringify } from './Markdown';

export const list = (configuration: CollectorConfiguration): Requirement[] => collect(configuration).map(create);

export const persist = (requirement: Requirement): void => {
    fs.writeFileSync(requirement.file, stringify(requirement.ast));
};
