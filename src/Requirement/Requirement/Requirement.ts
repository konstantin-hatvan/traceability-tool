import fs from 'fs';
import { Node, Parent } from 'unist';
import visit from 'unist-util-visit';
import { Root } from 'mdast';
import { Requirement, RequirementConfiguration, TraceLink } from '../../Shared/types';
import { parse, stringify, parseFrontmatter, createTraceyBlock } from '../../Markdown';
import { collect } from '../Collector/Collector';

const createRequirements = (files: string[]): Requirement[] => files.flatMap(file => {
    const ast = parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    const { id } = parseFrontmatter(ast);

    return [{
        type: 'requirement',
        file,
        id,
        ast,
    }];
});

/**
 * @requirement RequirementUpdate
 */
const removeTraceyBlock = (requirement: Requirement): Requirement => {
    visit(requirement.ast, 'html', (node, index, parent) => {
        if (node.value === '<div class="tracey">' && parent) {
            parent.children.splice(index);
        }
    });

    return requirement;
};

/**
 * @requirement RequirementUpdate
 */
const shouldUpdate = (traceabilityInformation: Node[]): boolean => {
    const table = <Parent>traceabilityInformation[1];
    return table.children.length > 1;
};

const save = (requirement: Requirement) => {
    fs.writeFileSync(requirement.file, stringify(<Root>requirement.ast));
};

export const list = (configuration: RequirementConfiguration): Requirement[] => createRequirements(collect(configuration.startingpoint, configuration.excludes));

/**
 * @requirement RequirementUpdate
 */
export const update = (requirement: Requirement, traceLinks: TraceLink[]) => {
    const cleanRequirement = removeTraceyBlock(requirement);
    const traceyBlock = createTraceyBlock(traceLinks);

    if (shouldUpdate(traceyBlock)) {
        const ast = <Parent>cleanRequirement.ast;

        save({
            ...cleanRequirement,
            ast: {
                ...ast,
                children: [
                    ...ast.children,
                    ...traceyBlock,
                ],
            },
        });

        return;
    }

    save(cleanRequirement);
};
