/**
 * Options for customizing how initials are extracted or parsed.
 */
type InitialsOptions = {
  /**
   * The number of characters for the initials. Defaults to 2 if not provided.
   */
  length?: number;
  /**
   * A record of existing names mapped to their preferred initials.
   */
  existing?: Record<string, string>;
};

/**
 * Represents a parsed name with optional initials and email.
 */
interface ParsedName {
  name: string;
  initials?: string;
  email?: string;
}

export class InitialsMaster {
  private static readonly DEFAULT_INITIALS_LENGTH: number = 2;

  // Regular expressions for extracting initials
  private static readonly NON_LETTER_CHARACTERS: string = ' -\\/:-@\\[-`\\{-\\~';
  private static readonly ONLY_UPPERCASE_PATTERN: RegExp = /^[A-Z]+$/;
  private static readonly INITIALS_IN_PARENTHESES_PATTERN: RegExp = /$begin:math:text$([^)]+)$end:math:text$/;
  private static readonly EMAIL_PATTERN: RegExp = /^[^\s]+@[^\s]+$/;
  private static readonly DOMAIN_IN_EMAIL_PATTERN: RegExp = /@[^\s]+/;
  private static readonly EMAIL_EXTRACTION_PATTERN: RegExp = /[\w._-]+@[\w.-]+[\w]/g;
  private static readonly FIRST_LETTER_OF_WORDS_PATTERN: RegExp = new RegExp(
    `(^|[${InitialsMaster.NON_LETTER_CHARACTERS}])[^${InitialsMaster.NON_LETTER_CHARACTERS}]`,
    'g',
  );
  private static readonly NON_CHARACTER_PATTERN: RegExp = new RegExp(`[${InitialsMaster.NON_LETTER_CHARACTERS}]`, 'g');

  /**
   * Extracts initials from a single or multiple names.
   * @param nameOrNames A string or an array of strings containing the names.
   * @param options Custom options for extracting initials.
   * @returns Initials of the provided name(s).
   *
   * @example
   * // Extract initials for a single name
   * const initials = InitialsMaster.extractInitials('John Doe');
   * console.log(initials); // Output: 'JD'
   *
   * @example
   * // Extract initials for multiple names
   * const initials = InitialsMaster.extractInitials(['John Doe', 'Jane Smith']);
   * console.log(initials); // Output: ['JD', 'JS']
   *
   * @example
   * // Extract initials with a length of 3
   * const initials = InitialsMaster.extractInitials('John Doe', { length: 3 });
   * console.log(initials); // Output: 'Joh'
   */
  static extractInitials(nameOrNames: string | string[], options: InitialsOptions = {}): string | string[] {
    const normalizedOptions = this.normalizeOptions(options);

    if (Array.isArray(nameOrNames)) {
      return this.getInitialsForMultipleNames(nameOrNames, normalizedOptions);
    }

    return this.getInitialsForSingleName(nameOrNames, normalizedOptions);
  }

  /**
   * Adds initials to a name or an array of names.
   * @param nameOrNames A string or an array of strings containing the names.
   * @param options Custom options for extracting initials.
   * @returns Names with appended initials.
   *
   * @example
   * // Add initials to a single name
   * const nameWithInitials = InitialsMaster.addInitialsTo('John Doe');
   * console.log(nameWithInitials); // Output: 'John Doe (JD)'
   *
   * @example
   * // Add initials to multiple names
   * const namesWithInitials = InitialsMaster.addInitialsTo(['John Doe', 'Jane Smith']);
   * console.log(namesWithInitials); // Output: ['John Doe (JD)', 'Jane Smith (JS)']
   */
  static addInitialsTo(nameOrNames: string | string[], options: InitialsOptions = {}): string | string[] {
    const normalizedOptions = this.normalizeOptions(options);

    if (Array.isArray(nameOrNames)) {
      return this.addInitialsToMultipleNames(nameOrNames, normalizedOptions);
    }

    return this.addInitialsToSingleName(nameOrNames, normalizedOptions);
  }

  /**
   * Parses a name or an array of names to extract components such as initials and email.
   * @param nameOrNames A string or an array of strings containing the names.
   * @param options Custom options for parsing names.
   * @returns Parsed name(s) with possible initials and email.
   *
   * @example
   * // Parse a single name
   * const parsedName = InitialsMaster.parse('John Doe <john.doe@example.com>');
   * console.log(parsedName); // Output: { name: 'John Doe', initials: 'JD', email: 'john.doe@example.com' }
   *
   * @example
   * // Parse multiple names
   * const parsedNames = InitialsMaster.parse(['John Doe <john.doe@example.com>', 'Jane Smith']);
   * console.log(parsedNames); // Output: [{ name: 'John Doe', initials: 'JD', email: 'john.doe@example.com' }, { name: 'Jane Smith', initials: 'JS' }]
   */
  static parse(nameOrNames: string | string[], options: InitialsOptions = {}): ParsedName | ParsedName[] {
    const normalizedOptions = this.normalizeOptions(options);

    if (Array.isArray(nameOrNames)) {
      return this.parseMultipleNames(nameOrNames, normalizedOptions);
    }

    return this.parseSingleName(nameOrNames, normalizedOptions);
  }

  /**
   * Generates an acronym from a given phrase.
   *
   * @param phrase - The phrase from which to generate an acronym.
   * @returns A string representing the acronym of the phrase.
   * @example
   * const acronym = NameMaster.generateAcronym("As Soon As Possible"); // "ASAP"
   */
  static generateAcronym(phrase: string): string {
    return phrase
      .split(' ')
      .filter((word) => word.length > 0) // Filter out any empty strings
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }

  /**
   * Extracts the first letter of each word in the given text.
   * @param text - The text to analyze.
   * @returns A string containing the first letter of each word.
   * @example
   * ```typescript
   * const result = InitialsMaster.getFirstLetterOfEachWord("Hello World Example");
   * console.log(result); // "HWE"
   * ```
   */
  static getFirstLetterOfEachWord(text: string): string {
    return text
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join('');
  }

  /**
   * Creates initials from the given phrase, optionally excluding certain words.
   * @param phrase - The phrase to analyze.
   * @param exclude - Optional list of words to exclude from the initials.
   * @returns A string containing the initials.
   * @example
   * ```typescript
   * const result = InitialsMaster.createInitialsFromPhrase("The Quick Brown Fox", ["the", "of"]);
   * console.log(result); // "QBF"
   * ```
   */
  static createInitialsFromPhrase(phrase: string, exclude: string[] = []): string {
    const words = phrase
      .split(/\s+/)
      .filter((word) => !exclude.includes(word.toLowerCase()))
      .map((word) => word.charAt(0).toUpperCase());

    return words.join('');
  }

  /**
   * Creates an abbreviation for a full name using the initials of the first and middle names and the full last name.
   * @param fullName - The full name to abbreviate.
   * @returns An abbreviated form of the full name.
   * @example
   * ```typescript
   * const result = InitialsMaster.abbreviateName("John Michael Smith");
   * console.log(result); // "J.M.S."
   * ```
   */
  static abbreviateName(fullName: string): string {
    const parts = fullName.split(/\s+/);
    if (parts.length < 2) return fullName; // Not enough parts to abbreviate

    const initials = parts
      .slice(0, -1)
      .map((part) => part.charAt(0).toUpperCase())
      .join('.');
    const lastName = parts[parts.length - 1];
    return `${initials}.${lastName.charAt(0).toUpperCase()}.`;
  }

  /**
   * Generates a custom acronym from a phrase, optionally including or excluding specific words.
   * @param phrase - The phrase to create an acronym from.
   * @param exclude - Optional list of words to exclude from the acronym.
   * @returns The acronym.
   * @example
   * ```typescript
   * const result = InitialsMaster.generateCustomAcronym("For Your Information", ["for", "your"]);
   * console.log(result); // "I"
   * ```
   */
  static generateCustomAcronym(phrase: string, exclude: string[] = []): string {
    const words = phrase
      .split(/\s+/)
      .filter((word) => !exclude.includes(word.toLowerCase()))
      .map((word) => word.charAt(0).toUpperCase());

    return words.join('');
  }

  private static getInitialsForSingleName(name: string, options: Required<InitialsOptions>): string {
    const length = options.length;
    const initials = this.findPreferredInitials(name, options);
    if (initials) return initials;

    name = this.cleanName(name);
    if (!name) return '';

    // Get all matches for the first letter of each word
    const matches = name.match(this.FIRST_LETTER_OF_WORDS_PATTERN)?.map((match) => match[match.length - 1]) || [];

    // Join the first letters first, and then add more characters from words if length exceeds the number of words
    if (matches.length >= length) {
      return matches.slice(0, length).join('');
    }

    // If there aren't enough initials, start taking more characters from words
    let remainingLength = length - matches.length;
    const words = name.split(' ').filter(Boolean);
    let result = matches.join('');

    for (let i = 0; i < words.length && remainingLength > 0; i++) {
      const remainingChars = words[i].slice(1, remainingLength + 1);
      result += remainingChars;
      remainingLength -= remainingChars.length;
    }

    return result;
  }

  private static getInitialsForMultipleNames(names: string[], options: Required<InitialsOptions>): string[] {
    return names.map((name) => this.getInitialsForSingleName(name, options));
  }

  private static addInitialsToSingleName(name: string, options: Required<InitialsOptions>): string {
    const parsedName = this.parseSingleName(name, options);
    return this.formatParsedName(parsedName);
  }

  private static addInitialsToMultipleNames(names: string[], options: Required<InitialsOptions>): string[] {
    return this.parseMultipleNames(names, options).map(this.formatParsedName);
  }

  private static parseSingleName(name: string, options: Required<InitialsOptions>): ParsedName {
    const email = this.extractEmail(name);
    if (email) {
      // Remove the email from the name string
      name = name.replace(email, '').trim();
    }

    const initials = this.findPreferredInitials(name, options) || this.getInitialsForSingleName(name, options);

    // Construct the parsed name object, omitting 'email' if it's undefined
    const parsedName: ParsedName = { name: this.cleanName(name), initials };
    if (email) {
      parsedName.email = email;
    }

    return parsedName;
  }

  private static parseMultipleNames(names: string[], options: Required<InitialsOptions>): ParsedName[] {
    return names.map((name) => this.parseSingleName(name, options));
  }

  private static findPreferredInitials(name: string, options: Required<InitialsOptions>): string {
    return options.existing?.[name] || this.extractParenthesizedInitials(name) || '';
  }

  private static extractParenthesizedInitials(name: string): string {
    const match = name.match(this.INITIALS_IN_PARENTHESES_PATTERN);
    return match ? match[1].trim() : '';
  }

  private static extractEmail(name: string): string | undefined {
    const match = name.match(this.EMAIL_EXTRACTION_PATTERN);
    return match ? match[0] : undefined;
  }

  private static cleanName(name: string): string {
    return name.replace(this.NON_CHARACTER_PATTERN, ' ').trim();
  }

  private static computePossibleInitials(name: string): string[] {
    const words = name.split(' ').filter(Boolean);
    const initialsArray = words.map((word) => this.getPossibleInitialsForWord(word));
    return this.combineAll(initialsArray);
  }

  private static getPossibleInitialsForWord(word: string): string[] {
    const options: string[] = [];
    for (let i = word.length; i > 0; i--) {
      options.push(word.slice(0, i));
    }
    return options;
  }

  private static combineAll(arrays: string[][]): string[] {
    if (!arrays.length) return [];

    const [firstArray, ...restArrays] = arrays;
    if (!restArrays.length) return firstArray;

    const combinations: string[] = [];
    firstArray.forEach((prefix) => {
      this.combineAll(restArrays).forEach((suffix) => combinations.push(prefix + suffix));
    });

    return combinations;
  }

  private static formatParsedName({ name, initials, email }: ParsedName): string {
    const nameWithInitials = initials ? `${name} (${initials})` : name;
    return email ? `${nameWithInitials} <${email}>` : nameWithInitials;
  }

  private static normalizeOptions(options: InitialsOptions): Required<InitialsOptions> {
    return {
      length: options.length ?? this.DEFAULT_INITIALS_LENGTH,
      existing: options.existing ?? {},
    };
  }
}
