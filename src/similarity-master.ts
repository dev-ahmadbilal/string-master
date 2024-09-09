/**
 * SimilarityMaster provides mechanisms for checking similarity between strings.
 */
export class SimilarityMaster {
  private elements: Set<string>;

  constructor(strings: string[] = []) {
    this.elements = new Set(strings);
  }

  /**
   * Check if the collection contains any string similar to the target up to the provided threshold.
   * @param target - The string to compare against the collection elements.
   * @param threshold - The minimum similarity score required for a match.
   * @param includeExactMatches - Whether to include exact matches (default is true).
   * @returns True if the collection contains a similar string; otherwise, false.
   * @example
   * const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
   * sm.hasSimilarString('apples', 0.8); // Returns true if the similarity is above 0.8
   */
  hasSimilarString(target: string, threshold: number, includeExactMatches = true): boolean {
    for (const str of this.elements) {
      if (!str) continue;

      if (includeExactMatches && str === target) {
        return true;
      }

      const similarityScore = SimilarityMaster.calculateSimilarity(str, target);
      if (similarityScore >= threshold) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get all similarity scores for the target string against the collection elements.
   * @param target - The string to compare against.
   * @param algorithm - The algorithm to use for calculating similarity.
   * @returns An array of objects with each collection element and its similarity score.
   * @example
   * const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
   * sm.getSimilarStrings('apple', 'dice'); // Returns array with similarity scores for each element
   */
  getSimilarStrings(
    target: string,
    algorithm: 'dice' | 'levenshtein' | 'jaccard' = 'dice',
  ): Array<{ element: string; similarity: number }> {
    const results: Array<{ element: string; similarity: number }> = [];
    for (const str of this.elements) {
      results.push({
        element: str,
        similarity: SimilarityMaster.calculateSimilarity(str, target, algorithm),
      });
    }
    return results;
  }

  /**
   * Calculates the similarity between two strings using a specified algorithm.
   * @param source - The source string.
   * @param target - The target string to compare against.
   * @param algorithm - The algorithm to use ('dice', 'levenshtein', or 'jaccard').
   * @returns The similarity score based on the chosen algorithm.
   * @example
   * SimilarityMaster.calculateSimilarity('apple', 'apples', 'levenshtein'); // Returns similarity score
   */
  static calculateSimilarity(
    source: string,
    target: string,
    algorithm: 'dice' | 'levenshtein' | 'jaccard' | 'jaro-winkler' = 'dice',
  ): number {
    switch (algorithm) {
      case 'dice':
        return SimilarityMaster.diceCoefficient(source, target);

      case 'levenshtein':
        return SimilarityMaster.levenshteinDistance(source, target);

      case 'jaccard':
        return SimilarityMaster.jaccardIndex(source, target);

      case 'jaro-winkler':
        return SimilarityMaster.jaroWinkler(source, target);

      default:
        return 0.0;
    }
  }

  /**
   * Computes the Dice Coefficient similarity between two strings.
   */
  private static diceCoefficient(source: string, target: string): number {
    source = source.replace(/\s+/g, '');
    target = target.replace(/\s+/g, '');

    if (source === target) return 1.0;
    if (source.length < 2 || target.length < 2) return 0.0;

    const sourceBigrams = new Map<string, number>();
    for (let i = 0; i < source.length - 1; i++) {
      const bigram = source.substring(i, i + 2);
      sourceBigrams.set(bigram, (sourceBigrams.get(bigram) || 0) + 1);
    }

    let intersectionSize = 0;
    for (let i = 0; i < target.length - 1; i++) {
      const bigram = target.substring(i, i + 2);
      const count = sourceBigrams.get(bigram) || 0;

      if (count > 0) {
        sourceBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (source.length + target.length - 2);
  }

  /**
   * Computes the Levenshtein Distance between two strings.
   */
  private static levenshteinDistance(source: string, target: string): number {
    const distances: number[][] = Array.from({ length: source.length + 1 }, () => []);
    for (let i = 0; i <= source.length; i++) distances[i][0] = i;
    for (let j = 0; j <= target.length; j++) distances[0][j] = j;

    for (let i = 1; i <= source.length; i++) {
      for (let j = 1; j <= target.length; j++) {
        const cost = source[i - 1] === target[j - 1] ? 0 : 1;
        distances[i][j] = Math.min(distances[i - 1][j] + 1, distances[i][j - 1] + 1, distances[i - 1][j - 1] + cost);
      }
    }

    const maxLen = Math.max(source.length, target.length);
    const distance = distances[source.length][target.length];

    // Return normalized similarity score between 0 and 1
    return maxLen === 0 ? 1.0 : 1.0 - distance / maxLen;
  }

  /**
   * Computes the Jaccard Index similarity between two strings using bigrams.
   */
  private static jaccardIndex(source: string, target: string): number {
    // Return 1 if both strings are empty
    if (source === '' && target === '') {
      return 1.0;
    }

    const getBigrams = (str: string): Set<string> => {
      const bigrams = new Set<string>();
      for (let i = 0; i < str.length - 1; i++) {
        bigrams.add(str.substring(i, i + 2));
      }
      return bigrams;
    };

    const sourceBigrams = getBigrams(source);
    const targetBigrams = getBigrams(target);

    const intersection = new Set([...sourceBigrams].filter((bigram) => targetBigrams.has(bigram)));
    const union = new Set([...sourceBigrams, ...targetBigrams]);

    return union.size === 0 ? 0 : intersection.size / union.size;
  }

  /**
   * Computes the Jaro-Winkler similarity between two strings.
   * @param source - The first string.
   * @param target - The second string.
   * @returns The Jaro-Winkler similarity score between the two strings.
   * @example
   * const similarity = SimilarityMaster.jaroWinkler('hello', 'hallo');
   * console.log(similarity); // Output: 0.944
   */
  static jaroWinkler(source: string, target: string): number {
    const jaro = (a: string, b: string): number => {
      const lenA = a.length;
      const lenB = b.length;
      if (lenA === 0) return lenB === 0 ? 1 : 0;

      const matchDistance = Math.floor(Math.max(lenA, lenB) / 2) - 1;
      const aMatches = Array(lenA).fill(false);
      const bMatches = Array(lenB).fill(false);

      let matches = 0;
      for (let i = 0; i < lenA; i++) {
        const start = Math.max(0, i - matchDistance);
        const end = Math.min(i + matchDistance + 1, lenB);
        for (let j = start; j < end; j++) {
          if (bMatches[j]) continue;
          if (a[i] !== b[j]) continue;
          aMatches[i] = true;
          bMatches[j] = true;
          matches++;
          break;
        }
      }

      if (matches === 0) return 0;

      let t = 0;
      let k = 0;
      for (let i = 0; i < lenA; i++) {
        if (!aMatches[i]) continue;
        while (!bMatches[k]) k++;
        if (a[i] !== b[k]) t++;
        k++;
      }
      t /= 2;

      const m = matches;
      const jaro = (m / lenA + m / lenB + (m - t) / m) / 3;

      const l = Math.min(
        [...source].findIndex((ch, i) => ch !== target[i]),
        4,
      );
      return jaro + l * 0.1 * (1 - jaro);
    };

    return jaro(source, target);
  }

  /**
   * Compares multiple strings to a source string for similarity scoring.
   * @param source - The source string.
   * @param targets - The strings to compare to the source.
   * @param algorithm - The algorithm to use for comparison.
   * @returns An object containing all ratings, the best match, and its index.
   * @example
   * SimilarityMaster.compareMultipleStrings('apple', ['apples', 'banana'], 'jaccard');
   */
  static compareMultipleStrings(
    source: string,
    targets: string[],
    algorithm: 'dice' | 'levenshtein' | 'jaccard' = 'dice',
  ): {
    ratings: Array<{ target: string; rating: number }>;
    bestMatch: { target: string; rating: number } | null;
    bestMatchIndex: number;
  } {
    if (!targets.length) {
      return { ratings: [], bestMatch: null, bestMatchIndex: -1 };
    }

    const ratings = targets.map((target) => ({
      target,
      rating: SimilarityMaster.calculateSimilarity(source, target, algorithm),
    }));

    let bestMatchIndex = 0;
    ratings.forEach((rating, index) => {
      if (
        (algorithm === 'levenshtein' && rating.rating < ratings[bestMatchIndex].rating) ||
        ((algorithm === 'dice' || algorithm === 'jaccard') && rating.rating > ratings[bestMatchIndex].rating)
      ) {
        bestMatchIndex = index;
      }
    });

    return {
      ratings,
      bestMatch: ratings[bestMatchIndex] || null,
      bestMatchIndex,
    };
  }
}
