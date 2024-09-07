export class CaseMaster {
  // Convert to camelCase
  toCamelCase(input: string): string {
    return this.convertCase(input, 'camel');
  }

  // Convert to snake_case
  toSnakeCase(input: string): string {
    return this.convertCase(input, 'snake');
  }

  // Convert to PascalCase
  toPascalCase(input: string): string {
    return this.convertCase(input, 'pascal');
  }

  // Convert to kebab-case
  toKebabCase(input: string): string {
    return this.convertCase(input, 'kebab');
  }

  // Convert to SCREAMING_SNAKE_CASE
  toScreamingSnakeCase(input: string): string {
    return this.convertCase(input, 'screaming-snake');
  }

  // Convert to Sentence case
  toSentenceCase(input: string): string {
    return this.convertCase(input, 'sentence');
  }

  // Convert to Title Case
  toTitleCase(input: string): string {
    return this.convertCase(input, 'title');
  }

  // Smart case converter
  smartCaseConvert(
    input: string,
    targetCase: 'camel' | 'snake' | 'pascal' | 'kebab' | 'screaming-snake' | 'sentence' | 'title',
  ): string {
    return this.convertCase(input, targetCase);
  }

  // Internal method to handle case conversion
  private convertCase(input: string, targetCase: string): string {
    // Basic sanitization
    input = input.replace(/^[^a-zA-Z]+/, '');
    // Replace non-alphabetical characters (excluding - and _) with a space
    input = input.replace(/[^a-zA-Z0-9-_]+/g, ' ');

    switch (targetCase) {
      case 'camel':
        return this.toCamelCaseHelper(input);
      case 'snake':
        return this.toSnakeCaseHelper(input);
      case 'pascal':
        return this.toPascalCaseHelper(input);
      case 'kebab':
        return this.toKebabCaseHelper(input);
      case 'screaming-snake':
        return this.toScreamingSnakeCaseHelper(input);
      case 'sentence':
        return this.toSentenceCaseHelper(input);
      case 'title':
        return this.toTitleCaseHelper(input);
      default:
        return input;
    }
  }

  // Helper methods for each case conversion
  private toCamelCaseHelper(input: string): string {
    return input
      .replace(/([^\w\s]|_|\s)+/g, ' ')
      .split(' ')
      .map((word, index) =>
        index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join('');
  }

  private toSnakeCaseHelper(input: string): string {
    return input.replace(/([^\w\s]|-|\s)+/g, '_').toLowerCase();
  }

  private toPascalCaseHelper(input: string): string {
    return input
      .replace(/([^\w\s]|_|\s)+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  private toKebabCaseHelper(input: string): string {
    return input.replace(/([^\w\s]|_|\s)+/g, '-').toLowerCase();
  }

  private toScreamingSnakeCaseHelper(input: string): string {
    return input.replace(/([^\w\s]|-|\s)+/g, '_').toUpperCase();
  }

  private toSentenceCaseHelper(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  private toTitleCaseHelper(input: string): string {
    return input
      .replace(/([^\w\s]|_|\s)+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
