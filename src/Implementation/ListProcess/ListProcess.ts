import { Implementation, CollectorConfiguration } from '../../Shared/types';
import { collect } from '../Collector/Collector';
import { create } from '../Factory/Factory';

export const list = async (configuration: CollectorConfiguration): Promise<Implementation[]> => create(collect(configuration));
