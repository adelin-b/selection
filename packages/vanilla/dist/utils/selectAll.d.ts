export type SelectAllSelectors = readonly (string | Element)[] | string | Element;
/**
 * Takes a selector (or array of selectors) and returns the matched nodes.
 * @param selector The selector or an Array of selectors.
 * @param doc
 * @returns {Array} Array of DOM-Nodes.
 */
export declare function selectAll(selector: SelectAllSelectors, doc?: Document): Element[];
