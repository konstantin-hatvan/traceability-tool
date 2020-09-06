/**
 * Slice a substring in between begin and end characters
 * @param str A string
 * @param begin The starting character
 * @param end The end character
 */
export const sliceBetween = (str: string, begin: string, end: string): string => str.slice(str.indexOf(begin), str.indexOf(end));

/**
 * Remove delimitors of a wrapped string
 * @param wrappedString A string wrapped with delimitors
 */
export const unWrap = (wrappedString: string): string => wrappedString.slice(1, wrappedString.length);
