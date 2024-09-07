export class EntropyMaster {
  /**
   * Calculates the Shannon entropy of a given string.
   * @param input - The string to analyze.
   * @returns The entropy value, a measure of the randomness of the string.
   * @example
   * const entropy = EntropyMaster.calculateEntropy('password123');
   * console.log(entropy); // Output: a value representing entropy (e.g., 3.18)
   */
  static calculateEntropy(input: string): number {
    const len = input.length;
    const frequencies = new Map<string, number>();

    for (const char of input) {
      frequencies.set(char, (frequencies.get(char) || 0) + 1);
    }

    return Array.from(frequencies.values())
      .map((freq) => freq / len)
      .reduce((sum, p) => sum - p * Math.log2(p), 0);
  }

  /**
   * Suggests if a string is strong, moderate, or weak based on its entropy.
   * @param input - The string to analyze.
   * @returns A string describing the strength: 'Strong', 'Moderate', 'Weak'.
   * @example
   * const strength = EntropyMaster.getStrength('password123');
   * console.log(strength); // Output: 'Moderate'
   */
  static getStrength(input: string): 'Strong' | 'Moderate' | 'Weak' {
    const entropy = EntropyMaster.calculateEntropy(input);
    if (entropy > 3.3) return 'Strong';
    if (entropy > 2.0) return 'Moderate';
    return 'Weak';
  }
}
