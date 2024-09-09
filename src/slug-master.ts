export class SlugMaster {
  private static customRules: Array<{ rule: RegExp; replacement: string }> = [];

  /**
   * Converts a string to a URL-friendly slug.
   * @example SlugMaster.slugify('Hello World!'); // 'hello-world'
   * @example SlugMaster.slugify('JavaScript Mastery'); // 'javascript-mastery'
   */
  static slugify(input: string): string {
    let slug = input
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .trim() // Trim leading/trailing whitespace
      .replace(/\s+/g, '-'); // Replace spaces with hyphens

    // Apply custom rules if defined
    for (const rule of this.customRules) {
      if (rule.rule.test(slug)) {
        slug = slug.replace(rule.rule, rule.replacement);
      }
    }

    return slug;
  }

  /**
   * Converts a string to a slug with additional options.
   * @param options An object with customizable options for the slugification process.
   * @example SlugMaster.slugifyWithOptions('Hello World!', { separator: '_', lowercase: false });
   * // 'Hello_World'
   */
  static slugifyWithOptions(input: string, options: { separator?: string; lowercase?: boolean } = {}): string {
    const separator = options.separator || '-'; // Default separator is hyphen
    const lowercase = options.lowercase !== undefined ? options.lowercase : true; // Default is lowercase

    let slug = input
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .trim() // Trim leading/trailing whitespace
      .replace(/\s+/g, separator); // Replace spaces with the custom separator

    if (lowercase) {
      slug = slug.toLowerCase();
    }

    // Apply custom rules if defined
    for (const rule of this.customRules) {
      if (rule.rule.test(slug)) {
        slug = slug.replace(rule.rule, rule.replacement);
      }
    }

    return slug;
  }

  /**
   * Sets custom rules for the slugification process.
   * @param rules Array of objects containing a RegExp rule and its replacement string.
   * @example SlugMaster.setCustomRules([{ rule: /and/g, replacement: 'n' }]);
   * SlugMaster.slugify('Rock and Roll'); // 'rock-n-roll'
   */
  static setCustomRules(rules: Array<{ rule: RegExp; replacement: string }>): void {
    this.customRules = rules;
  }
}
