export class InitialsMaster {
  /**
   * Extracts the initials from a given name.
   *
   * @param name - The full name from which to extract initials.
   * @returns A string containing the initials of the name.
   * @example
   * const initials = NameMaster.extractInitials("John Doe"); // "JD"
   */
  static extractInitials(name: string): string {
    return name
      .split(' ')
      .filter((part) => part.length > 0) // Filter out any empty strings
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
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
}
