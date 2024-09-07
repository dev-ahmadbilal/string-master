export class TrimMaster {
  /**
   * Removes specified characters from the start of the string, or whitespace if none is specified.
   *
   * @example
   * TrimMaster.trimStart('   Hello', ' '); // 'Hello'
   *
   * @param input The input string.
   * @param chars Optional characters to trim. Defaults to whitespace.
   * @returns The modified string.
   */
  static trimStart(input: string, chars?: string): string {
    const pattern = chars ? new RegExp('^[' + chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ']+', 'g') : /^\s+/g;
    return input.replace(pattern, '');
  }

  /**
   * Removes specified characters from the end of the string, or whitespace if none is specified.
   *
   * @example
   * TrimMaster.trimEnd('Hello   ', ' '); // 'Hello'
   *
   * @param input The input string.
   * @param chars Optional characters to trim. Defaults to whitespace.
   * @returns The modified string.
   */
  static trimEnd(input: string, chars?: string): string {
    const pattern = chars ? new RegExp('[' + chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ']+$', 'g') : /\s+$/g;
    return input.replace(pattern, '');
  }

  /**
   * Collapses multiple spaces into a single space.
   *
   * @example
   * TrimMaster.collapseWhitespace('Hello   World! '); // 'Hello World!'
   *
   * @param input The input string.
   * @returns The string with collapsed whitespace.
   */
  static collapseWhitespace(input: string): string {
    return input.replace(/\s+/g, ' ').trim();
  }
}
