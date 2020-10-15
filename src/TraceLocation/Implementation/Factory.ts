import { Implementation } from '../types';

/**
 * Create an implementation
 * @param file A file
 */
export const create = (file: string): Implementation => ({
    file,
    type: 'implementation',
});
