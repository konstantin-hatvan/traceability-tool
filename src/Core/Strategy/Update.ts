import visit from 'unist-util-visit';
import { Annotation } from "../../Annotation/types";
import { Requirement } from "../../Requirement/types";
import { requirementHasTracelinks, createTracelinkBlock } from '../common';

/** @requirement #[ TracelinkTable.Update ]# #( Update tracelinks of a requirement if annotations and tracelinks exist )# */
export const updateStrategy = {
    shouldExecute: (requirement: Requirement, linkedAnnotations: Annotation[]) => linkedAnnotations.length > 0 && requirementHasTracelinks(requirement),
    execute: (requirement: Requirement, annotations: Annotation[]) => {
        const tracelinkBlock = createTracelinkBlock(annotations, requirement);

        visit(requirement.ast, 'html', (node, index, parent) => {
            if (node.value === '<div class="tracey tracey-plugin-tracelinktable">' && parent) {
                parent.children.splice(index, tracelinkBlock.length, ...tracelinkBlock);
            }
        });
    },
};
