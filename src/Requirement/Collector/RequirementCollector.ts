import * as fs from 'fs';
import * as path from 'path';

/**
 * Combine the provided paths
 * @param pathSegment The path segment to be prepended
 * @param location The path to be appended
 */
const prependPathSegment = (pathSegment: string) => (location: string): string => path.join(pathSegment, location);

/**
 * List the contents of the provided directory while preserving the relative path
 * @param location The origin directory
 */
const readdirPreserveRelativePath = (location: string) => fs.readdirSync(location).map(prependPathSegment(location));

/**
 * Recursively list the contents of the provided directory
 * while preserving the relative path to the origin
 * @param location The origin directory
 */
const readdirRecursive = (location: string) => readdirPreserveRelativePath(location)
    .reduce((result: string[], currentValue: string): string[] => fs.statSync(currentValue).isDirectory()
        ? result.concat(readdirRecursive(currentValue))
        : result.concat(currentValue), []);

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
