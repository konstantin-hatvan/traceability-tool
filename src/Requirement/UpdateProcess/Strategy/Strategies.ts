import { strategy as addTraceyStrategy } from './Add';
import { strategy as updateTraceyStrategy } from './Update';
import { strategy as deleteTraceyStrategy } from './Delete';
import { strategy as defaultTraceyStrategy } from './Default';

export const strategies = [
    addTraceyStrategy,
    updateTraceyStrategy,
    deleteTraceyStrategy,
];

export const defaultStrategy = defaultTraceyStrategy;
