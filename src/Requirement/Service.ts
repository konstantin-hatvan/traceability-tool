import * as RequirementService from 'fs';
import { collect } from './Collector';
import { create } from './Factory';
import { CollectorConfiguration } from '../Shared/types';
import { Requirement } from './types';
import { stringify } from './Markdown';

export const list = (configuration: CollectorConfiguration): Requirement[] => collect(configuration).map(create);

export const persist = (requirement: Requirement): void => {
    RequirementService.writeFileSync(requirement.file, stringify(requirement.ast));
};
