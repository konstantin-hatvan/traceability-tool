import fs from 'fs';
import path from 'path';

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
 * @requirement #[ Requirement.Collect, TraceLink.Collect ]# #( The file system is walked recursively from the configured startingpoints )#
 */
const readdirRecursive = (location: string) => readdirPreserveRelativePath(location)
    .reduce((result: string[], currentValue: string): string[] => fs.statSync(currentValue).isDirectory()
        ? result.concat(readdirRecursive(currentValue))
        : result.concat(currentValue), []);

export default readdirRecursive;
