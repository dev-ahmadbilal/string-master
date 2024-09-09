import { SimilarityMaster } from './similarity-master';

export class SearchMaster {
  /**
   * Finds the index of the first occurrence of a substring.
   *
   * @param input - The string to search within.
   * @param substring - The substring to find.
   * @returns The index of the first occurrence of the substring, or -1 if not found.
   * @example
   * const index = SearchMaster.indexOf('Hello, world!', 'world');
   * console.log(index); // Output: 7
   */
  static indexOf(input: string, substring: string): number {
    return input.indexOf(substring);
  }

  /**
   * Finds the index of the last occurrence of a substring.
   *
   * @param input - The string to search within.
   * @param substring - The substring to find.
   * @returns The index of the last occurrence of the substring, or -1 if not found.
   * @example
   * const index = SearchMaster.lastIndexOf('Hello, world! world!', 'world');
   * console.log(index); // Output: 13
   */
  static lastIndexOf(input: string, substring: string): number {
    return input.lastIndexOf(substring);
  }

  /**
   * Finds the nth occurrence of a substring in a string.
   *
   * @param input - The string to search within.
   * @param substring - The substring to find.
   * @param occurrence - The nth occurrence to find (1-based index).
   * @returns The index of the nth occurrence, or -1 if not found.
   * @example
   * const nthIndex = SearchMaster.nthIndexOf('abcabcabc', 'abc', 2);
   * console.log(nthIndex); // Output: 3
   */
  static nthIndexOf(input: string, substring: string, occurrence: number): number {
    let count = 0;
    let index = -1;

    while (count < occurrence && (index = input.indexOf(substring, index + 1)) !== -1) {
      count++;
    }

    return count === occurrence ? index : -1;
  }

  /**
   * Finds all matches of a regular expression pattern in a string.
   *
   * @param input - The string to search within.
   * @param pattern - The regular expression pattern to match.
   * @returns An array of matches found, or an empty array if no matches are found.
   * @example
   * const matches = SearchMaster.matchAll('Hello 123, world 456!', /\d+/g);
   * console.log(matches); // Output: ['123', '456']
   */
  static matchAll(input: string, pattern: RegExp): string[] {
    return [...input.matchAll(pattern)].map((match) => match[0]);
  }

  /**
   * Finds and returns the first word in a string that matches a regular expression.
   *
   * @param input - The string to search within.
   * @param pattern - The regular expression pattern to match.
   * @returns The first matching word, or an empty string if no match is found.
   * @example
   * const firstMatch = SearchMaster.findFirst('Hello 123 world', /\d+/);
   * console.log(firstMatch); // Output: '123'
   */
  static findFirst(input: string, pattern: RegExp): string {
    const match = input.match(pattern);
    return match ? match[0] : '';
  }

  /**
   * Performs a fuzzy search to find strings that approximately match the query.
   *
   * @param input - The string to search within.
   * @param query - The substring to match approximately.
   * @param maxDistance - Maximum edit distance allowed (default is 2).
   * @returns An array of matched substrings that are within the specified distance.
   * @example
   * const results = SearchMaster.fuzzySearch('Hello, wrld!', 'world', 1);
   * console.log(results); // Output: ['wrld']
   */
  static fuzzySearch(input: string, query: string, maxDistance: number = 2): string[] {
    const matches: string[] = [];
    const words = input.split(/\s+/).map((word) => word.replace(/[.,!?]/g, ''));
    // Convert maxDistance to a similarity threshold
    const maxSimilarity = 1 - maxDistance / Math.max(query.length, ...words.map((word) => word.length));

    for (const word of words) {
      const similarity = SimilarityMaster.calculateSimilarity(word, query, 'levenshtein');
      if (similarity >= maxSimilarity) {
        matches.push(word);
      }
    }

    return matches;
  }

  /**
   * Highlights all occurrences of a substring by wrapping them in a specified tag.
   *
   * @param input - The string to search within.
   * @param substring - The substring to highlight.
   * @param tag - The HTML tag or format to wrap around matches (default is `<mark>`).
   * @returns The modified string with highlights.
   * @example
   * const highlighted = SearchMaster.highlight('Hello, world!', 'world');
   * console.log(highlighted); // Output: 'Hello, <mark>world</mark>!'
   */
  static highlight(input: string, substring: string, tag: string = 'mark'): string {
    const escapedSubstr = substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSubstr})`, 'gi');
    return input.replace(regex, `<${tag}>$1</${tag}>`);
  }

  /**
   * Finds words near each other within a specified distance in a string.
   *
   * @param input - The string to search within.
   * @param word1 - The first word to find.
   * @param word2 - The second word to find.
   * @param maxDistance - The maximum number of words between them.
   * @returns `true` if the words are found within the specified distance, otherwise `false`.
   * @example
   * const proximity = SearchMaster.proximitySearch('The quick brown fox jumps over the lazy dog', 'fox', 'dog', 5);
   * console.log(proximity); // Output: true
   */
  static proximitySearch(text: string, word1: string, word2: string, maxDistance: number): boolean {
    const words = text.split(/\s+/); // Split the text into words

    let index1: number | null = null;
    let index2: number | null = null;

    // Find the positions of word1 and word2
    for (let i = 0; i < words.length; i++) {
      if (words[i] === word1) {
        index1 = i;
      }
      if (words[i] === word2) {
        index2 = i;
      }

      // Check if both words have been found
      if (index1 !== null && index2 !== null) {
        if (Math.abs(index1 - index2) <= maxDistance) {
          return true; // Words are within the specified distance
        }
      }
    }

    return false; // Words are not within the specified distance
  }
}
