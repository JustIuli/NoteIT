/**
 *  @return {number}
 * @param str {string}
 * @description Returns the number of words in a particular piece of text that is provided
 */
const wordCounter = (str: string): number => {
    const words = str.match(/\S+/g);
    if (words && words.length !== 0) {
        return words.length;
    } else {
        return 0;
    }
}

export default wordCounter;
