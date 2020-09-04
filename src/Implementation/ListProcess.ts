import { Implementation, ImplementationConfiguration } from '../Shared/types';
import { collect } from './Collector';
import { createImplementations } from './Factory';

export const list = (configuration: ImplementationConfiguration): Promise<Implementation[]> => createImplementations(collect(configuration), configuration);
