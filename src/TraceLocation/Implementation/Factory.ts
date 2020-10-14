import { Implementation } from '../types';

export const create = (file: string): Implementation => ({
    file,
    type: 'implementation',
});
