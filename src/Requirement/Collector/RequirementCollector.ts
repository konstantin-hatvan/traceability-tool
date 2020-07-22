import path from 'path';
import readdirRecursive from '../../Shared/readdirRecursive';

/**
 * Check if a file is a requirement document
 * A requirement document is a Markdown file
 * @param file The file to be checked
 */
const isRequirement = (file: string): boolean => path.parse(file).ext === '.md';

/**
 * Collect all requirement documents
 * @param startingpoint The origin directory
 */
const collect = (startingpoint: string): string[] => readdirRecursive(startingpoint).filter(isRequirement);

const RequirementCollector = {
    collect,
};

export default RequirementCollector;
