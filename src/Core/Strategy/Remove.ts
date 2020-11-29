import visit from 'unist-util-visit';
import { Annotation } from '../../Annotation/types';
import { Requirement } from '../../Requirement/types';

/** @requirement #[ TracelinkTable.Remove ]# #( Remove tracelinks from a requirement if no annotations exist )# */
export const removeStrategy = {
    shouldExecute: (requirement: Requirement, linkedAnnotations: Annotation[]) => linkedAnnotations.length <= 0,
    execute: (requirement: Requirement, linkedAnnotations: Annotation[]) => {
        visit(requirement.ast, 'html', (node, index, parent) => {
            if (node.value === '<div class="tracey tracey-plugin-tracelinktable">' && parent) {
                parent.children.splice(index, 3);
            }
        });
    },
};
