import { Requirement, CollectorConfiguration } from '../../Shared/types';
import { collect } from '../Collector/Collector';
import { create } from '../Factory/Factory';

export const list = (configuration: CollectorConfiguration): Requirement[] => create(collect(configuration));
