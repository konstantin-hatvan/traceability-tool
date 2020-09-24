import { Implementation, ImplementationConfiguration } from '../../Shared/types';
import { collect } from '../Collector/Collector';
import { create } from '../Factory/Factory';

export const list = async (configuration: ImplementationConfiguration): Promise<Implementation[]> => create(collect(configuration), configuration);
