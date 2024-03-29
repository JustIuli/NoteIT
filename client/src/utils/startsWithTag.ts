/**
 *  @return {boolean}
 * @param str {string}
 * @description Returns true if the provided string starts with :tag , else it returns false
 */
export const startsWithTag = (str:string): boolean => /^tag:.+/.test(str);