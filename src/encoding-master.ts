/**
 * EncodingMaster provides methods for encoding and decoding strings in various formats, starting with Base64.
 */
export class EncodingMaster {
  /**
   * Encodes a string to Base64 format.
   * @param input - The string to encode.
   * @returns The Base64 encoded string.
   * @example
   * const encoded = EncodingMaster.base64Encode('Hello World!');
   * console.log(encoded); // Output: 'SGVsbG8gV29ybGQh'
   */
  static base64Encode(input: string): string {
    return Buffer.from(input, 'utf8').toString('base64');
  }

  /**
   * Decodes a Base64 encoded string.
   * @param input - The Base64 encoded string to decode.
   * @returns The decoded string.
   * @example
   * const decoded = EncodingMaster.base64Decode('SGVsbG8gV29ybGQh');
   * console.log(decoded); // Output: 'Hello World!'
   */
  static base64Decode(input: string): string {
    return Buffer.from(input, 'base64').toString('utf8');
  }

  /**
   * Encodes a string to URL-safe Base64 format.
   * @param input - The string to encode.
   * @returns The URL-safe Base64 encoded string.
   * @example
   * const encoded = EncodingMaster.urlSafeBase64Encode('Hello World!');
   * console.log(encoded); // Output: 'SGVsbG8gV29ybGQh'
   */
  static urlSafeBase64Encode(input: string): string {
    return EncodingMaster.base64Encode(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  /**
   * Decodes a URL-safe Base64 encoded string.
   * @param input - The URL-safe Base64 encoded string to decode.
   * @returns The decoded string.
   * @example
   * const decoded = EncodingMaster.urlSafeBase64Decode('SGVsbG8gV29ybGQh');
   * console.log(decoded); // Output: 'Hello World!'
   */
  static urlSafeBase64Decode(input: string): string {
    const base64 = input
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .concat('='.repeat((4 - (input.length % 4)) % 4));
    return EncodingMaster.base64Decode(base64);
  }
}
