/**
 * ObfuscationMaster class contains methods to obfuscate and deobfuscate text for lightweight security purposes.
 */
export class ObfuscationMaster {
  /**
   * Obfuscates text by converting each character to its char code and then shifting it by a given offset.
   * @param input - The input string to obfuscate.
   * @param offset - The offset value to shift char codes. Default is 3.
   * @returns The obfuscated string.
   * @example
   * const obfuscated = ObfuscationMaster.obfuscate('Hello World', 3);
   * console.log(obfuscated); // Output might be something like 'Khoor#Zruog'
   */
  static obfuscate(input: string, offset: number = 3): string {
    return input
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) + offset))
      .join('');
  }

  /**
   * Deobfuscates text that was previously obfuscated with a given offset.
   * @param input - The obfuscated string to deobfuscate.
   * @param offset - The offset value that was used for obfuscation. Default is 3.
   * @returns The original string.
   * @example
   * const deobfuscated = ObfuscationMaster.deobfuscate('Khoor#Zruog', 3);
   * console.log(deobfuscated); // Output: 'Hello World'
   */
  static deobfuscate(input: string, offset: number = 3): string {
    return input
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) - offset))
      .join('');
  }

  /**
   * Simple XOR-based obfuscation method for lightweight security.
   * @param input - The input string to obfuscate.
   * @param key - A single-character key for XOR operation.
   * @returns The obfuscated string.
   * @example
   * const obfuscatedXOR = ObfuscationMaster.obfuscateXOR('Hello World', 'K');
   * console.log(obfuscatedXOR); // Output: an XOR-based obfuscated string
   */
  static obfuscateXOR(input: string, key: string): string {
    return input
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(0)))
      .join('');
  }

  /**
   * Deobfuscates an XOR-based obfuscated string using the same key.
   * @param input - The obfuscated string to deobfuscate.
   * @param key - The same single-character key used for XOR obfuscation.
   * @returns The original string.
   * @example
   * const original = ObfuscationMaster.deobfuscateXOR(obfuscatedXOR, 'K');
   * console.log(original); // Output: 'Hello World'
   */
  static deobfuscateXOR(input: string, key: string): string {
    return ObfuscationMaster.obfuscateXOR(input, key); // XOR is symmetric
  }
}
