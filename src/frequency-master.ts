export class FrequencyMaster {
  /**
   * Counts the frequency of each word in the given text.
   * @param text - The text to analyze.
   * @returns An object where keys are words and values are their counts.
   * @example
   * ```typescript
   * const text = "hello world hello";
   * const result = FrequencyMaster.countWordFrequency(text);
   * console.log(result); // { hello: 2, world: 1 }
   * ```
   */
  static countWordFrequency(text: string): Record<string, number> {
    const wordCounts: Record<string, number> = {};
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    for (const word of words) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    return wordCounts;
  }

  /**
   * Counts the frequency of each character in the given text.
   * @param text - The text to analyze.
   * @returns An object where keys are characters and values are their counts.
   * @example
   * ```typescript
   * const text = "hello";
   * const result = FrequencyMaster.countCharacterFrequency(text);
   * console.log(result); // { h: 1, e: 1, l: 2, o: 1 }
   * ```
   */
  static countCharacterFrequency(text: string): Record<string, number> {
    const charCounts: Record<string, number> = {};
    const chars = text.toLowerCase().split('');

    for (const char of chars) {
      charCounts[char] = (charCounts[char] || 0) + 1;
    }

    return charCounts;
  }

  /**
   * Finds the most frequent words in the given text.
   * @param text - The text to analyze.
   * @param limit - Optional limit on the number of most frequent words to return.
   * @returns An array of objects where each object has a `word` and `count` property.
   * @example
   * ```typescript
   * const text = "hello world hello";
   * const result = FrequencyMaster.findMostFrequentWords(text, 1);
   * console.log(result); // [{ word: "hello", count: 2 }]
   * ```
   */
  static findMostFrequentWords(text: string, limit?: number): { word: string; count: number }[] {
    const wordCounts = FrequencyMaster.countWordFrequency(text);
    const sortedWords = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);

    return limit ? sortedWords.slice(0, limit) : sortedWords;
  }

  /**
   * Finds the least frequent words in the given text.
   * @param text - The text to analyze.
   * @param limit - Optional limit on the number of least frequent words to return.
   * @returns An array of objects where each object has a `word` and `count` property.
   * @example
   * ```typescript
   * const text = "hello world world";
   * const result = FrequencyMaster.findLeastFrequentWords(text, 1);
   * console.log(result); // [{ word: "hello", count: 1 }]
   * ```
   */
  static findLeastFrequentWords(text: string, limit?: number): { word: string; count: number }[] {
    const wordCounts = FrequencyMaster.countWordFrequency(text);
    const sortedWords = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => a.count - b.count);

    return limit ? sortedWords.slice(0, limit) : sortedWords;
  }

  /**
   * Gets the top N most frequent characters in the given text.
   * @param text - The text to analyze.
   * @param limit - Optional limit on the number of most frequent characters to return.
   * @returns An array of objects where each object has a `character` and `count` property.
   * @example
   * ```typescript
   * const text = "hello";
   * const result = FrequencyMaster.getTopNCharacters(text, 2);
   * console.log(result); // [{ character: "l", count: 2 }, { character: "h", count: 1 }]
   * ```
   */
  static getTopNCharacters(text: string, limit?: number): { character: string; count: number }[] {
    const charCounts = FrequencyMaster.countCharacterFrequency(text);
    const sortedChars = Object.entries(charCounts)
      .map(([char, count]) => ({ character: char, count }))
      .sort((a, b) => b.count - a.count);

    return limit ? sortedChars.slice(0, limit) : sortedChars;
  }
}
