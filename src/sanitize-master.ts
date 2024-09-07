export class SanitizeMaster {
  /**
   * Escapes HTML characters in a string to prevent HTML injection attacks.
   * @param input The string to escape.
   * @example SanitizeMaster.escapeHtml('<div>Hello & welcome!</div>'); // '&lt;div&gt;Hello &amp; welcome!&lt;/div&gt;'
   */
  static escapeHtml(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Removes control characters from a string.
   * Control characters are non-printable characters such as ASCII control codes.
   * @param input The string from which to remove control characters.
   * @example SanitizeMaster.removeControlCharacters('Hello\u0001World\u0002'); // 'HelloWorld'
   */
  static removeControlCharacters(input: string): string {
    // eslint-disable-next-line no-control-regex
    return input.replace(/[\x00-\x1F\x7F]/g, '');
  }

  /**
   * Sanitizes a string for safe display by combining escaping HTML characters
   * and removing control characters.
   * @param input The string to sanitize.
   * @example SanitizeMaster.sanitizeForDisplay('<div>Hello\u0001World</div>'); // '&lt;div&gt;HelloWorld&lt;/div&gt;'
   */
  static sanitizeForDisplay(input: string): string {
    const escapedHtml = this.escapeHtml(input);
    return this.removeControlCharacters(escapedHtml);
  }
}
