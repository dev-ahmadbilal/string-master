/**
 * ManipulateMaster class provides various string manipulation utilities
 * such as trimming, collapsing spaces, extracting substrings, and more.
 */

import { Latin_Map } from './utils/latin-map';

export class ManipulateMaster {
  /**
   * Extracts the string between two given substrings.
   *
   * @example
   * ManipulateMaster.between('Hello [World]!', '[', ']'); // 'World'
   *
   * @param input The full input string.
   * @param left The substring that marks the start of the extraction.
   * @param right The substring that marks the end of the extraction.
   * @returns The string between the left and right substrings.
   */
  static between(input: string, left: string, right: string): string {
    const startPos = input.indexOf(left);
    if (startPos === -1) return ''; // 'left' not found

    const endPos = input.indexOf(right, startPos + left.length);
    if (endPos === -1) return ''; // 'right' not found

    return input.slice(startPos + left.length, endPos);
  }

  /**
   * Removes a specific prefix from the start of the string.
   *
   * @example
   * ManipulateMaster.chompLeft('HelloWorld', 'Hello'); // 'World'
   *
   * @param input The input string.
   * @param prefix The prefix to remove.
   * @returns The string without the prefix.
   */
  static chompLeft(input: string, prefix: string): string {
    return input.startsWith(prefix) ? input.slice(prefix.length) : input;
  }

  /**
   * Removes a specific suffix from the end of the string.
   *
   * @example
   * ManipulateMaster.chompRight('HelloWorld', 'World'); // 'Hello'
   *
   * @param input The input string.
   * @param suffix The suffix to remove.
   * @returns The string without the suffix.
   */
  static chompRight(input: string, suffix: string): string {
    return input.endsWith(suffix) ? input.slice(0, -suffix.length) : input;
  }

  /**
   * Removes all characters except for letters and numbers.
   *
   * @example
   * ManipulateMaster.removeNonAlphaNumeric('Hello, World! 123'); // 'HelloWorld123'
   *
   * @param input The input string.
   * @returns The string with only alphanumeric characters.
   */
  static removeNonAlphaNumeric(input: string): string {
    return input.replace(/[^a-zA-Z0-9]/g, '');
  }

  /**
   * Truncates the string to a specified length and adds an ellipsis if necessary.
   *
   * @example
   * ManipulateMaster.truncate('This is a long string', 10); // 'This is a...'
   *
   * @param input The input string.
   * @param length The maximum length of the string.
   * @returns The truncated string with an ellipsis if necessary.
   */
  static truncate(input: string, length: number): string {
    return input.length <= length ? input : input.slice(0, length).trimEnd() + '...';
  }

  /**
   * Replaces all occurrences of a target string with another string.
   *
   * @example
   * ManipulateMaster.replaceAll('foo bar foo', 'foo', 'baz'); // 'baz bar baz'
   *
   * @param input The input string.
   * @param target The string to be replaced.
   * @param replacement The string to replace with.
   * @returns The modified string.
   */
  static replaceAll(input: string, target: string, replacement: string): string {
    return input.split(target).join(replacement);
  }

  /**
   * Reverses the string.
   *
   * @example
   * ManipulateMaster.reverse('abc'); // 'cba'
   *
   * @param input The input string.
   * @returns The reversed string.
   */
  static reverse(input: string): string {
    return input.split('').reverse().join('');
  }

  /**
   * Extracts the first N characters, or the last N characters if N is negative.
   *
   * @example
   * ManipulateMaster.getLeft('HelloWorld', 5); // 'Hello'
   * ManipulateMaster.getLeft('HelloWorld', -5); // 'World'
   *
   * @param input The input string.
   * @param N The number of characters to extract.
   * @returns The extracted string.
   */
  static getLeft(input: string, N: number): string {
    return N >= 0 ? input.substr(0, N) : ManipulateMaster.getRight(input, -N);
  }

  /**
   * Extracts the last N characters, or the first N if N is negative.
   *
   * @example
   * ManipulateMaster.getRight('HelloWorld', 5); // 'World'
   * ManipulateMaster.getRight('HelloWorld', -5); // 'Hello'
   *
   * @param input The input string.
   * @param N The number of characters to extract.
   * @returns The extracted string.
   */
  static getRight(input: string, N: number): string {
    return N >= 0 ? input.substr(input.length - N, N) : ManipulateMaster.getLeft(input, -N);
  }

  /**
   * Removes all occurrences of specified characters.
   *
   * @example
   * ManipulateMaster.removeAll('Hello World', ' ', 'l'); // 'HeoWord'
   *
   * @param input The input string.
   * @param chars The characters to remove.
   * @returns The modified string.
   */
  static removeAll(input: string, ...chars: string[]): string {
    let result = input;
    for (const char of chars) {
      result = result.split(char).join('');
    }
    return result;
  }

  /**
   * Converts a string into an array of lines, normalizing newlines (Windows to Unix).
   * @example ManipulateMaster.lines('Hello\r\nWorld\r\n!'); // ['Hello', 'World', '!']
   */
  static lines(input: string): string[] {
    return input.replace(/\r\n/g, '\n').split('\n');
  }

  /**
   * Removes punctuation from the string.
   * @example ManipulateMaster.stripPunctuation('Hello, world!'); // 'Hello world'
   */
  static stripPunctuation(input: string): string {
    return input.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
  }

  /**
   * Ensures that the string starts with the specified prefix. If not, it prepends the prefix.
   * @example CheckMaster.ensureLeft('world', 'hello '); // 'hello world'
   */
  static ensureLeft(input: string, prefix: string): string {
    return input.startsWith(prefix) ? input : prefix + input;
  }

  /**
   * Ensures that the string ends with the specified suffix. If not, it appends the suffix.
   * @example CheckMaster.ensureRight('hello', ' world'); // 'hello world'
   */
  static ensureRight(input: string, suffix: string): string {
    return input.endsWith(suffix) ? input : input + suffix;
  }

  /**
   * Converts non-Latin characters in the string to their Latin equivalents based on the latin_map.
   *
   * @returns A new string with non-Latin characters replaced.
   * @example
   * const result = ManipulateMaster.latinise("Olá, mundo!"); // "Ola, mundo!"
   */
  static latinise(input: string): string {
    // eslint-disable-next-line no-useless-escape
    return input.replace(/[^A-Za-z0-9\[\] ]/g, (char) => Latin_Map[char] || char);
  }

  /**
   * This function adds ordinalize support to every String object.
   * @param str The subject string.
   * @returns Return all found numbers their sequence like '22nd'.
   * @example
   *
   *     const inflection = require( 'inflection' );
   *
   *     inflection.ordinalize( 'the 1 pitch' ); // 'the 1st pitch'
   */
  static ordinalize(str: string) {
    const strArr = str.split(' ');
    const j = strArr.length;

    for (let i = 0; i < j; i++) {
      const k = parseInt(strArr[i], 10);

      if (!isNaN(k)) {
        const ltd = strArr[i].substring(strArr[i].length - 2);
        const ld = strArr[i].substring(strArr[i].length - 1);
        let suf = 'th';

        if (ltd !== '11' && ltd !== '12' && ltd !== '13') {
          if (ld === '1') {
            suf = 'st';
          } else if (ld === '2') {
            suf = 'nd';
          } else if (ld === '3') {
            suf = 'rd';
          }
        }

        strArr[i] += suf;
      }
    }

    return strArr.join(' ');
  }
}
