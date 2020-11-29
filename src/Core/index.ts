import { Requirement } from '../Requirement/types';
import { Annotation } from '../Annotation/types';
import { Plugin } from '../types';
import { addStrategy } from './Strategy/Add';
import { updateStrategy } from './Strategy/Update';
import { removeStrategy } from './Strategy/Remove';
import { defaultStrategy } from './Strategy/Default';

const strategies = [
    updateStrategy,
    addStrategy,
    removeStrategy,
];

const determineStrategy = (requirement: Requirement, linkedAnnotations: Annotation[]) => strategies.find(strategy => strategy.shouldExecute(requirement, linkedAnnotations)) || defaultStrategy;

export const plugin: Plugin = ({ requirements, annotations }) => {
    requirements.forEach(requirement => {
        const linkedAnnotations = annotations.filter(annotation => annotation.identifier === requirement.id);
        const strategy = determineStrategy(requirement, linkedAnnotations);
        strategy.execute(requirement, linkedAnnotations);
    });

    return {
        requirements,
        annotations,
    };
};
