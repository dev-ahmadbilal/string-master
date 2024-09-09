export class TemplateMaster {
  /**
   * Fills a template string with provided values.
   * @param template - The template string containing placeholders.
   * @param values - An object with key-value pairs where keys correspond to placeholders in the template.
   * @returns The filled template string.
   * @example
   * const result = TemplateMaster.fill('Hello, {name}!', { name: 'John' });
   * console.log(result); // Output: "Hello, John!"
   */
  static fill(template: string, values: { [key: string]: string | number }): string {
    return template.replace(/{(.*?)}/g, (_, key) => {
      return Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : `{${key}}`;
    });
  }

  /**
   * Fills a template string with provided values using a custom delimiter.
   * @param template - The template string containing placeholders.
   * @param values - An object with key-value pairs where keys correspond to placeholders in the template.
   * @param delimiter - The delimiter for placeholders (default is '{}').
   * @returns The filled template string.
   * @example
   * const result = TemplateMaster.fillWithDelimiter('Hello, [name]!', { name: 'John' }, '[]');
   * console.log(result); // Output: "Hello, John!"
   */
  // static fillWithDelimiter(
  //   template: string,
  //   values: { [key: string]: string | number },
  //   delimiter: [string, string] = ['{', '}'],
  // ): string {
  //   const [startDelimiter, endDelimiter] = delimiter;
  //   const regex = new RegExp(`${startDelimiter}(.*?)${endDelimiter}`, 'g');
  //   return template.replace(regex, (_, key) => {
  //     return Object.prototype.hasOwnProperty.call(values, key)
  //       ? String(values[key])
  //       : `${startDelimiter}${key}${endDelimiter}`;
  //   });
  // }
  static fillWithDelimiter(
    template: string,
    values: { [key: string]: string | number },
    delimiter: [string, string] = ['{', '}'],
  ): string {
    // Escape delimiters for the regex, but do not affect the output string
    const [startDelimiter, endDelimiter] = delimiter;
    const startDelimiterEscaped = startDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const endDelimiterEscaped = endDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(`${startDelimiterEscaped}(.*?)${endDelimiterEscaped}`, 'g');

    return template.replace(regex, (_, key) => {
      return Object.prototype.hasOwnProperty.call(values, key)
        ? String(values[key])
        : `${startDelimiter}${key}${endDelimiter}`;
    });
  }

  /**
   * Escapes special characters in the template string to prevent injection attacks.
   * @param template - The template string with potential special characters.
   * @returns The escaped template string.
   * @example
   * const result = TemplateMaster.escape('Hello, {name}! <script>alert("XSS")</script>');
   * console.log(result); // Output: "Hello, {name}! &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"
   */
  static escape(template: string): string {
    return template.replace(/[&<>"']/g, (match) => {
      switch (match) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return match;
      }
    });
  }

  /**
   * Parses a template string with placeholders into a template function.
   * @param template - The template string containing placeholders.
   * @returns A function that takes values and returns the filled template string.
   * @example
   * const templateFunc = TemplateMaster.toFunction('Hello, {name}!');
   * const result = templateFunc({ name: 'John' });
   * console.log(result); // Output: "Hello, John!"
   */
  static toFunction(template: string): (values: { [key: string]: string | number }) => string {
    return (values: { [key: string]: string | number }) => TemplateMaster.fill(template, values);
  }
}
