import { Implementation, ImplementationConfiguration } from '../../Shared/types';
import { collect } from '../Collector/Collector';
import { createImplementations } from '../Factory/Factory';

export const list = (configuration: ImplementationConfiguration): Promise<Implementation[]> => createImplementations(collect(configuration), configuration);
