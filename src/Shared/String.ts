/**
 * Slice a substring in between begin and end characters
 * @param str A string
 * @param begin The starting character
 * @param end The end character
 */
export const sliceBetween = (str: string, begin: string, end: string): string => str.slice(str.indexOf(begin) + begin.length, str.indexOf(end));
