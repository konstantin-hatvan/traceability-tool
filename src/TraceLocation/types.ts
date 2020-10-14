import { Root } from 'mdast';

export interface TraceLocation {
    type: string;
    file: string;
};

export interface Requirement extends TraceLocation {
    type: 'requirement';
    ast: Root;
    id: string;
};

export interface Implementation extends TraceLocation {
    type: 'implementation';
};
