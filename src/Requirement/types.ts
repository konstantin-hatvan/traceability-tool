import { Root } from 'mdast';

export interface Requirement {
    file: string;
    ast: Root;
    id: string;
};
