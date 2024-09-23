/**
 * MaskingMaster class handles data masking for sensitive information like credit card numbers, email addresses, etc.
 */
export class MaskingMaster {
  /**
   * Masks all but the last 4 digits of a credit card number.
   * @param creditCardNumber - The credit card number to mask.
   * @returns The masked credit card number.
   * @example
   * const masked = MaskingMaster.maskCreditCard('1234567812345678');
   * console.log(masked); // Output: '************5678'
   */
  static maskCreditCard(creditCardNumber: string): string {
    return creditCardNumber.slice(-4).padStart(creditCardNumber.length, '*');
  }

  /**
   * Masks an email address, revealing only the first letter of the username and the domain.
   * @param email - The email address to mask.
   * @returns The masked email.
   * @example
   * const maskedEmail = MaskingMaster.maskEmail('john.doe@example.com');
   * console.log(maskedEmail); // Output: 'j****@example.com'
   */
  static maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    if (!domain) return email; // Invalid email format

    const maskedUsername = username[0] + '*'.repeat(Math.max(username.length - 1, 0));
    return `${maskedUsername}@${domain}`;
  }

  /**
   * Masks a Social Security Number (SSN), revealing only the last 4 digits.
   * @param ssn - The SSN to mask.
   * @returns The masked SSN.
   * @example
   * const maskedSSN = MaskingMaster.maskSSN('123-45-6789');
   * console.log(maskedSSN); // Output: '***-**-6789'
   */
  static maskSSN(input: string): string {
    const length = input.length;
    const visibleLength = 4;
    let alphanumericCount = 0;

    // Find the position from where to start revealing the last `visibleLength` characters
    let revealStart = length;
    for (let i = length - 1; i >= 0; i--) {
      if (/[a-zA-Z0-9]/.test(input[i])) {
        alphanumericCount++;
        if (alphanumericCount === visibleLength) {
          revealStart = i;
          break;
        }
      }
    }

    // Mask all alphanumeric characters except for the last `visibleLength` characters
    let result = '';
    for (let i = 0; i < length; i++) {
      if (i >= revealStart) {
        result += input[i];
      } else {
        result += /[a-zA-Z0-9]/.test(input[i]) ? '*' : input[i];
      }
    }

    return result;
  }

  /**
   * Masks a generic string by replacing characters with a specified masking character.
   * @param input - The input string to mask.
   * @param start - The number of characters to leave unmasked at the start.
   * @param end - The number of characters to leave unmasked at the end.
   * @param maskChar - The character to use for masking. Default is '*'.
   * @returns The masked string.
   * @example
   * const maskedString = MaskingMaster.maskString('SensitiveData', 2, 2);
   * console.log(maskedString); // Output: 'Se********ta'
   */
  static maskString(input: string, start: number, end: number, maskChar: string = '*'): string {
    const maskedSection = maskChar.repeat(Math.max(0, input.length - start - end));
    return input.slice(0, start) + maskedSection + input.slice(-end);
  }
}
