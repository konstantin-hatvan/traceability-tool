import { Requirement } from "../Requirement/types";
import { Plugin } from "../types";
import visit from 'unist-util-visit'
import path from "path";
import { createHTML, createLink, createParagraph, createText } from "../tracey-plugin-utility";

const requirementHasParent = (requirement: Requirement): boolean => Object.prototype.hasOwnProperty.call(requirement, 'parent');

const walkRootline = (current: Requirement, requirements: Requirement[]): Requirement[] => {
    if (requirementHasParent(current)) {
        const parent = requirements.find(aRequirement => aRequirement.id === current.parent);
        if (parent) {
            return [
                current,
                ...walkRootline(parent, requirements),
            ];
        }
    }

    return [ current ];
};

const removeBreadcrumbs = (original: Requirement): Requirement => {
    const requirement = { ...original };

    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey tracey-plugin-breadcrumbs">' && parent) {
            parent.children.splice(index, 3);
        }
    });

    return requirement;
};

const createBreadcrumbs = (requirement: Requirement, parents: Requirement[]) => {
    const updatedParents = parents.map((parent, index) => {
        const relativeLink = path.relative(path.parse(requirement.file).dir, parent.file);

        if (index < parents.length - 1) {
            return [
                createLink(parent.id, relativeLink),
                createText(' > '),
            ];
        }

        return [
            createLink(parent.id, relativeLink),
        ];
    }).flat();

    const paragraph = createParagraph(updatedParents);
    const begin = createHTML('<div class="tracey tracey-plugin-breadcrumbs">')
    const end = createHTML('</div>')

    return [
        begin,
        paragraph,
        end,
    ];
};

const updateBreadcrumbs = (original: Requirement, parents: Requirement[]) => {
    const requirement = { ...original };
    const breadcrumbs = createBreadcrumbs(requirement, parents);
    let shouldAddBreadcrumbsToTop = true;


    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey tracey-plugin-breadcrumbs">' && parent) {
            parent.children.splice(index, breadcrumbs.length, ...breadcrumbs);
            shouldAddBreadcrumbsToTop = false;
        }
    });

    if (shouldAddBreadcrumbsToTop) {
        visit(requirement.ast, 'yaml', (node, index, parent) => {
            requirement.ast.children.splice(index + 1, 0, ...breadcrumbs);
        });
    }

    return requirement;
};

export const plugin: Plugin = ({ requirements, annotations, tracelinks }) => {
    const updatedRequirements = requirements.map(theRequirement => {
        const rootline = walkRootline(theRequirement, requirements);

        if (rootline.length > 1) {
            let [ self, ...parents ] = rootline;
            return updateBreadcrumbs(theRequirement, parents);
        }

        return removeBreadcrumbs(theRequirement);
    });

    return {
        requirements: updatedRequirements,
        annotations,
        tracelinks,
    };
};
