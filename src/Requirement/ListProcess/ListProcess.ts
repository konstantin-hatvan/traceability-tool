import { Requirement, RequirementConfiguration } from '../../Shared/types';
import { collect } from '../Collector/Collector';
import { createRequirements } from '../Factory/Factory';

export const list = (configuration: RequirementConfiguration): Requirement[] => createRequirements(collect(configuration));
