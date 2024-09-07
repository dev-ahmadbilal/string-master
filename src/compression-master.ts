import * as LZString from 'lz-string';
/**
 * CompressionMaster class provides methods for compressing and decompressing strings.
 */
export class CompressionMaster {
  /**
   * Compresses a string using LZ-string compression algorithm.
   * @param input - The string to compress.
   * @returns The compressed string.
   * @example
   * const compressed = CompressionMaster.compress('Hello, world!');
   * console.log(compressed); // Compressed string
   */
  static compress(input: string): string {
    return LZString.compress(input);
  }

  /**
   * Decompresses a string using LZ-string compression algorithm.
   * @param input - The compressed string to decompress.
   * @returns The decompressed string.
   * @example
   * const decompressed = CompressionMaster.decompress(compressedString);
   * console.log(decompressed); // 'Hello, world!'
   */
  static decompress(input: string): string {
    return LZString.decompress(input);
  }
}
