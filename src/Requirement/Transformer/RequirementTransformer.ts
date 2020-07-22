import fs from 'fs';
import unified from 'unified';
import parse from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import visit from 'unist-util-visit';
import { RequirementId, RequirementData, KeyValuePair } from '../../Shared/types';

/**
 * Parse a requirement file into an abstract syntax tree
 * @param file A requirement file
 */
const parseRequirement = (file: string): any => unified()
    .use(parse)
    .use(frontmatter, ['yaml'])
    .parse(fs.readFileSync(file));

/**
 * Parse the frontmatter of an abstract syntax tree of a requirement file
 * @param ast An abstract syntax tree
 */
const parseFrontmatter = (ast: any): KeyValuePair[] => {
    let output: KeyValuePair[] = [];

    visit(ast, 'yaml', (node: any) => {
        const entries: string[] = node.value.split('\n').map((entry: string) => entry.trim());
        output = entries.map(entry => {
            const [key, value] = entry.split(':').map(token => token.trim())
            return {
                key,
                value,
            };
        });
    });

    return output;
};

/**
 * Get the ID of a requirement file
 * @param file A requirement file
 */
const getRequirementId = (file: string): RequirementId => {
    const ast = parseRequirement(file);
    const frontmatter = parseFrontmatter(ast);

    return frontmatter.reduce((result: RequirementId, keyValuePair: KeyValuePair) => {
        if (keyValuePair.key === 'id') {
            result = keyValuePair.value;
        }

        return result;
    }, '');
};

/**
 * Transform a single requirement file into a RequirementData data structure
 * @param file A requirement file
 */
const transformRequirement = (file: string): RequirementData => ({
    file,
    id: getRequirementId(file),
});

/**
 * Transform requirement files into a RequirementData data structure
 * @param files A list of requirement files
 */
const transform = (files: string[]): RequirementData[] => files.map(transformRequirement);

const RequirementTransformer = {
    transform,
};

export default RequirementTransformer;
