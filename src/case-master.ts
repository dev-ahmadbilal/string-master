/**
 * CasingMaster class provides methods for converting strings
 * between different case formats such as camelCase, snake_case, PascalCase, etc.
 */
export class CasingMaster {
  /**
   * Converts the input string to camelCase.
   *
   * @example
   * CasingMaster.toCamelCase('hello world'); // 'helloWorld'
   *
   * @param input The string to be converted.
   * @returns The string in camelCase format.
   */
  static toCamelCase(input: string): string {
    return CasingMaster.convertCase(input, 'camel');
  }

  /**
   * Converts the input string to snake_case.
   *
   * @example
   * CasingMaster.toSnakeCase('hello world'); // 'hello_world'
   *
   * @param input The string to be converted.
   * @returns The string in snake_case format.
   */
  static toSnakeCase(input: string): string {
    return CasingMaster.convertCase(input, 'snake');
  }

  /**
   * Converts the input string to PascalCase.
   *
   * @example
   * CasingMaster.toPascalCase('hello world'); // 'HelloWorld'
   *
   * @param input The string to be converted.
   * @returns The string in PascalCase format.
   */
  static toPascalCase(input: string): string {
    return CasingMaster.convertCase(input, 'pascal');
  }

  /**
   * Converts the input string to kebab-case.
   *
   * @example
   * CasingMaster.toKebabCase('hello world'); // 'hello-world'
   *
   * @param input The string to be converted.
   * @returns The string in kebab-case format.
   */
  static toKebabCase(input: string): string {
    return CasingMaster.convertCase(input, 'kebab');
  }

  /**
   * Converts the input string to SCREAMING_SNAKE_CASE.
   *
   * @example
   * CasingMaster.toScreamingSnakeCase('hello world'); // 'HELLO_WORLD'
   *
   * @param input The string to be converted.
   * @returns The string in SCREAMING_SNAKE_CASE format.
   */
  static toScreamingSnakeCase(input: string): string {
    return CasingMaster.convertCase(input, 'screaming-snake');
  }

  /**
   * Converts the input string to Sentence case.
   *
   * @example
   * CasingMaster.toSentenceCase('HELLO WORLD'); // 'Hello world'
   *
   * @param input The string to be converted.
   * @returns The string in Sentence case format.
   */
  static toSentenceCase(input: string): string {
    return CasingMaster.convertCase(input, 'sentence');
  }

  /**
   * Converts the input string to Title Case.
   *
   * @example
   * CasingMaster.toTitleCase('hello world'); // 'Hello World'
   *
   * @param input The string to be converted.
   * @returns The string in Title Case format.
   */
  static toTitleCase(input: string): string {
    return CasingMaster.convertCase(input, 'title');
  }

  /**
   * Smart case converter that allows converting to a target case format.
   *
   * @example
   * CasingMaster.smartCaseConvert('hello world', 'pascal'); // 'HelloWorld'
   *
   * @param input The string to be converted.
   * @param targetCase The case format to convert to.
   * @returns The converted string in the desired case format.
   */
  static smartCaseConvert(
    input: string,
    targetCase: 'camel' | 'snake' | 'pascal' | 'kebab' | 'screaming-snake' | 'sentence' | 'title',
  ): string {
    return CasingMaster.convertCase(input, targetCase);
  }

  /**
   * Internal method to handle the logic for case conversion based on the target case.
   *
   * @param input The string to be converted.
   * @param targetCase The case format to convert to.
   * @returns The converted string.
   */
  private static convertCase(input: string, targetCase: string): string {
    // Sanitize input by removing leading non-alphabetical characters
    input = input.replace(/^[^a-zA-Z]+/, '');
    // Replace non-alphabetical characters (except - and _) with a space
    input = input.replace(/[^a-zA-Z0-9-_]+/g, ' ');

    switch (targetCase) {
      case 'camel':
        return CasingMaster.toCamelCaseHelper(input);
      case 'snake':
        return CasingMaster.toSnakeCaseHelper(input);
      case 'pascal':
        return CasingMaster.toPascalCaseHelper(input);
      case 'kebab':
        return CasingMaster.toKebabCaseHelper(input);
      case 'screaming-snake':
        return CasingMaster.toScreamingSnakeCaseHelper(input);
      case 'sentence':
        return CasingMaster.toSentenceCaseHelper(input);
      case 'title':
        return CasingMaster.toTitleCaseHelper(input);
      default:
        return input;
    }
  }

  // Helper methods for each case conversion

  /**
   * Helper method to convert a string to camelCase.
   *
   * @param input The string to be converted.
   * @returns The camelCase formatted string.
   */
  private static toCamelCaseHelper(input: string): string {
    return input
      .replace(/([^\w\s]|_|\s)+/g, ' ')
      .split(' ')
      .map((word, index) =>
        index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join('');
  }

  /**
   * Helper method to convert a string to snake_case.
   *
   * @param input The string to be converted.
   * @returns The snake_case formatted string.
   */
  private static toSnakeCaseHelper(input: string): string {
    return input.replace(/([^\w\s]|-|\s)+/g, '_').toLowerCase();
  }

  /**
   * Helper method to convert a string to PascalCase.
   *
   * @param input The string to be converted.
   * @returns The PascalCase formatted string.
   */
  private static toPascalCaseHelper(input: string): string {
    return input
      .replace(/([^\w\s]|_|\s)+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  /**
   * Helper method to convert a string to kebab-case.
   *
   * @param input The string to be converted.
   * @returns The kebab-case formatted string.
   */
  private static toKebabCaseHelper(input: string): string {
    return input.replace(/([^\w\s]|_|\s)+/g, '-').toLowerCase();
  }

  /**
   * Helper method to convert a string to SCREAMING_SNAKE_CASE.
   *
   * @param input The string to be converted.
   * @returns The SCREAMING_SNAKE_CASE formatted string.
   */
  private static toScreamingSnakeCaseHelper(input: string): string {
    return input.replace(/([^\w\s]|-|\s)+/g, '_').toUpperCase();
  }

  /**
   * Helper method to convert a string to Sentence case.
   *
   * @param input The string to be converted.
   * @returns The Sentence case formatted string.
   */
  private static toSentenceCaseHelper(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  /**
   * Helper method to convert a string to Title Case.
   *
   * @param input The string to be converted.
   * @returns The Title Case formatted string.
   */
  private static toTitleCaseHelper(input: string): string {
    return input
      .replace(/([^\w\s]|_|\s)+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
