export class ValidationMaster {
  /**
   * Checks if the string contains only alphabetic characters.
   * @example ValidationMaster.isAlpha('abc'); // true
   * @example ValidationMaster.isAlpha('abc123'); // false
   */
  static isAlpha(input: string): boolean {
    return /^[a-z\xDF-\xFF]+$/i.test(input);
  }

  /**
   * Checks if the string contains only alphanumeric characters.
   * @example ValidationMaster.isAlphaNumeric('abc123'); // true
   * @example ValidationMaster.isAlphaNumeric('abc!123'); // false
   */
  static isAlphaNumeric(input: string): boolean {
    return /^[a-z0-9\xDF-\xFF]+$/i.test(input);
  }

  /**
   * Checks if the string is empty or contains only whitespace.
   * @example ValidationMaster.isEmpty(''); // true
   * @example ValidationMaster.isEmpty('   '); // true
   * @example ValidationMaster.isEmpty('abc'); // false
   */
  static isEmpty(input: string): boolean {
    return input === null || input === undefined || /^[\s\xa0]*$/.test(input);
  }

  /**
   * Checks if the string is in lowercase.
   * @example ValidationMaster.isLower('abc'); // true
   * @example ValidationMaster.isLower('Abc'); // false
   */
  static isLower(input: string): boolean {
    return ValidationMaster.isAlpha(input) && input === input.toLowerCase();
  }

  /**
   * Checks if the string contains only numeric characters.
   * @example ValidationMaster.isNumeric('123'); // true
   * @example ValidationMaster.isNumeric('123a'); // false
   */
  static isNumeric(input: string): boolean {
    return /^[0-9]+$/.test(input);
  }

  /**
   * Checks if the string is in uppercase.
   * @example ValidationMaster.isUpper('ABC'); // true
   * @example ValidationMaster.isUpper('Abc'); // false
   */
  static isUpper(input: string): boolean {
    return ValidationMaster.isAlpha(input) && input === input.toUpperCase();
  }

  /**
   * Checks if a string starts with a given substring.
   *
   * @param input - The string to check.
   * @param substring - The substring to look for at the start.
   * @returns `true` if the input starts with the substring; otherwise, `false`.
   * @example
   * const starts = ValidationMaster.startsWith('Hello, world!', 'Hello');
   * console.log(starts); // Output: true
   */
  static startsWith(input: string, substring: string): boolean {
    return input.startsWith(substring);
  }

  /**
   * Checks if the string ends with any of the specified suffixes.
   * @example ValidationMaster.endsWith('hello', 'lo', 'world'); // true
   * @example ValidationMaster.endsWith('hello', 'hi'); // false
   */
  static endsWith(input: string, ...suffixes: string[]): boolean {
    return suffixes.some((suffix) => input.endsWith(suffix));
  }

  /**
   * Compares two strings, ignoring case.
   * @example ValidationMaster.equalsIgnoreCase('Hello', 'hello'); // true
   */
  static equalsIgnoreCase(input: string, compareTo: string): boolean {
    return input.toLowerCase() === compareTo.toLowerCase();
  }

  /**
   * Checks if the string contains the specified substring.
   * @example ValidationMaster.contains('hello world', 'world'); // true
   */
  static contains(input: string, substring: string): boolean {
    return input.indexOf(substring) >= 0;
  }

  /**
   * Checks if two strings are anagrams of each other.
   * @param str1 - The first string.
   * @param str2 - The second string.
   * @returns `true` if the strings are anagrams, otherwise `false`.
   * @example
   * const result = CheckMaster.isAnagram('listen', 'silent');
   * console.log(result); // Output: true
   */
  static isAnagram(str1: string, str2: string): boolean {
    const normalize = (str: string) =>
      str
        .replace(/[^a-zA-Z]/g, '')
        .toLowerCase()
        .split('')
        .sort()
        .join('');
    return normalize(str1) === normalize(str2);
  }

  /**
   * Checks if a string is a palindrome.
   * @param str - The string to check.
   * @returns `true` if the string is a palindrome, otherwise `false`.
   * @example
   * const result = CheckMaster.isPalindrome('A man, a plan, a canal, Panama');
   * console.log(result); // Output: true
   */
  static isPalindrome(str: string): boolean {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');
  }
}
