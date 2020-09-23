import { Requirement, RequirementConfiguration } from '../../Shared/types';
import { collect } from '../Collector/Collector';
import { create } from '../Factory/Factory';

export const list = (configuration: RequirementConfiguration): Requirement[] => create(collect(configuration));
