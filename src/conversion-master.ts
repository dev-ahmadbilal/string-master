/**
 * ConversionMaster class provides methods for converting strings and values
 * into different types such as boolean, float, integer, etc.
 */
export class ConversionMaster {
  /**
   * Converts the value to a boolean.
   *
   * @example
   * new ConversionMaster('yes').toBoolean(); // true
   * new ConversionMaster('on').toBoolean(); // true
   * new ConversionMaster('0').toBoolean();   // false
   * new ConversionMaster('true').toBoolean();  // true
   *
   * @returns A boolean representation of the value.
   */
  static toBoolean(value: string): boolean {
    const s = value.toLowerCase();
    return s === 'true' || s === 'yes' || s === 'on' || s === '1';
  }

  /**
   * Converts the value to a floating-point number with optional precision.
   *
   * @example
   * new ConversionMaster('123.456').toFloat(2); // 123.46
   * new ConversionMaster('123.456').toFloat();  // 123.456
   *
   * @param precision The number of decimal places to round to (optional).
   * @returns A floating-point number.
   */
  static toFloat(value: string, precision?: number): number {
    const num = parseFloat(value);
    return precision ? parseFloat(num.toFixed(precision)) : num;
  }

  /**
   * Converts the value to an integer.
   *
   * @example
   * new ConversionMaster('42').toInt();   // 42
   * new ConversionMaster('0x1A').toInt(); // 26 (hexadecimal)
   *
   * @returns An integer representation of the value.
   */
  static toInt(value: string): number {
    // If the string starts with '0x' or '-0x', parse as hexadecimal
    return /^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10);
  }

  /**
   * Converts a JSON object to a string.
   *
   * @example
   * const jsonString = ConversionMaster.fromJson({ name: 'John' });
   * console.log(jsonString); // Output: '{"name":"John"}'
   *
   * @returns The stringified JSON.
   */
  static fromJson(value: object): string {
    return JSON.stringify(value);
  }

  /**
   * Converts the value to a JSON object.
   *
   * @example
   * new ConversionMaster('{"name": "John"}').toJson(); // { name: 'John' }
   *
   * @returns The parsed JSON object.
   */
  static toJson(value: string): object {
    return JSON.parse(value);
  }

  /**
   * Converts a string to Base64 encoding.
   * @param input - The string to encode.
   * @returns The Base64 encoded string.
   * @example
   * const encoded = TransformMaster.toBase64('Hello World!');
   * console.log(encoded); // Output: 'SGVsbG8gV29ybGQh'
   */
  static toBase64(input: string): string {
    return Buffer.from(input, 'utf8').toString('base64');
  }

  /**
   * Decodes a Base64 encoded string.
   * @param input - The Base64 encoded string.
   * @returns The decoded string.
   * @example
   * const decoded = TransformMaster.fromBase64('SGVsbG8gV29ybGQh');
   * console.log(decoded); // Output: 'Hello World!'
   */
  static fromBase64(input: string): string {
    return Buffer.from(input, 'base64').toString('utf8');
  }

  /**
   * Converts a string to hexadecimal representation.
   * @param input - The string to convert.
   * @returns The hexadecimal representation of the string.
   * @example
   * const hex = TransformMaster.toHex('Hello');
   * console.log(hex); // Output: '48656c6c6f'
   */
  static toHex(input: string): string {
    return Buffer.from(input, 'utf8').toString('hex');
  }

  /**
   * Converts a hexadecimal string to its UTF-8 representation.
   * @param input - The hexadecimal string to convert.
   * @returns The UTF-8 representation of the hexadecimal string.
   * @example
   * const utf8 = TransformMaster.fromHex('48656c6c6f');
   * console.log(utf8); // Output: 'Hello'
   */
  static fromHex(input: string): string {
    return Buffer.from(input, 'hex').toString('utf8');
  }
}
