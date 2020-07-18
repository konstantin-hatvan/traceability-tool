import fs from 'fs';
import unified from 'unified';
import parse from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import Requirement from '../Requirement';

/**
 * Create a Requirement instance from the provided requirements document
 * @param location The location of the requirements document
 */
const fromFile = (location: string): Requirement => {
    const ast = unified()
        .use(parse)
        .use(frontmatter, ['yaml'])
        .parse(fs.readFileSync(location));

    return new Requirement(location, ast);
};

const RequirementFactory = {
    fromFile,
};

export default RequirementFactory;
