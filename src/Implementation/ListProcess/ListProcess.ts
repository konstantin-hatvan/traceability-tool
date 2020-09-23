import { Implementation, ImplementationConfiguration } from '../../Shared/types';
import { collect } from '../Collector/Collector';
import { create } from '../Factory/Factory';

export const listWithRequirement = async (configuration: ImplementationConfiguration, requirementId: string): Promise<Implementation[]> => {
    const implementations = await create(collect(configuration), configuration);
    return implementations.filter((implementation: Implementation) => implementation.requirement === requirementId);
};
