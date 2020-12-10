import { TableRow } from 'mdast';
import visit from 'unist-util-visit';
import { Annotation } from "../../Annotation/types";
import { Requirement } from "../../Requirement/types";
import { requirementHasTracelinks, createTracelinkBlock } from '../common';

const parseTracelinkToAnnotation = (requirement: Requirement, tracelink: TableRow): Annotation => {
    const [
        { children: [ { title: file } ] },
        { children: [ { value: line } ]},
        { children: [ { value: description } ]},
    ] = tracelink.children;

    return {
        description: <string>description,
        file: <string>file,
        identifier: requirement.id,
        line: parseInt(<string>line),
    };
};

const isEqualAnnotation = (existingAnnotation: Annotation) => (linkedAnnotation: Annotation): boolean => {
    const hasSameDescription = linkedAnnotation.description === existingAnnotation.description;
    const hasSameFile = linkedAnnotation.file === existingAnnotation.file;
    const hasSameIdentifier = linkedAnnotation.identifier === existingAnnotation.identifier;
    return hasSameDescription && hasSameFile && hasSameIdentifier;
};

/** @requirement #[ TracelinkTable.Update ]# #( Update tracelinks of a requirement if annotations and tracelinks exist )# */
export const updateStrategy = {
    shouldExecute: (requirement: Requirement, linkedAnnotations: Annotation[]) => linkedAnnotations.length > 0 && requirementHasTracelinks(requirement),
    execute: (requirement: Requirement, annotations: Annotation[]) => {
        let linkedAnnotations = [ ...annotations ];

        visit(requirement.ast, 'html', (blockStart, index, parent) => {
            if (blockStart.value === '<div class="tracey tracey-plugin-tracelinktable">' && parent) {
                // Start with an empty list of update annotations
                let updateAnnotations: Annotation[] = [];

                visit(parent.children[index + 1], 'tableRow', (tableRow: TableRow, index) => {
                    if (index > 0) {
                        // Parse existing tracelink into annotation
                        const existingAnnotation = parseTracelinkToAnnotation(requirement, tableRow);
                        let linkedAnnotationIndex = linkedAnnotations.findIndex(isEqualAnnotation(existingAnnotation));

                        // If it is included in the linked annotations
                        if (linkedAnnotationIndex > -1) {
                            // Add it to the list of update annotations
                            updateAnnotations.push(linkedAnnotations[linkedAnnotationIndex]);

                            // Remove it from the list of linked annotations
                            linkedAnnotations.splice(linkedAnnotationIndex, 1);
                        }
                    }
                });

                // Add remaining linked annotations to the update annotations
                updateAnnotations.push(...linkedAnnotations);

                // Create a tracey block from the update annotations
                const tracelinkBlock = createTracelinkBlock(updateAnnotations, requirement);

                // write the tracey block into the requirement
                parent.children.splice(index, tracelinkBlock.length, ...tracelinkBlock);
            }
        });
    },
};
