import { Annotation } from "../../Annotation/types";
import { Requirement } from "../../Requirement/types";
import { createTracelinkBlock, requirementHasTracelinks } from "../common";

/** @requirement #[ TracelinkTable.Add ]# #( Add tracelinks to a requirement if annotations exist but no tracelinks )# */
export const addStrategy = {
    shouldExecute: (requirement: Requirement, linkedAnnotations: Annotation[]) => linkedAnnotations.length > 0 && !requirementHasTracelinks(requirement),
    execute: (requirement: Requirement, annotations: Annotation[]) => requirement.ast.children.push(...createTracelinkBlock(annotations, requirement)),
};
