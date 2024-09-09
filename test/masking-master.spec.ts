import { MaskingMaster } from '../src/masking-master';

describe('MaskingMaster', () => {
  describe('maskCreditCard', () => {
    it('should mask all but the last 4 digits of the credit card number', () => {
      expect(MaskingMaster.maskCreditCard('1234567812345678')).toBe('************5678');
      expect(MaskingMaster.maskCreditCard('9876543210123456')).toBe('************3456');
      expect(MaskingMaster.maskCreditCard('1234')).toBe('1234'); // Edge case: short credit card number
    });
  });

  describe('maskEmail', () => {
    it('should mask the email address, revealing only the first letter and domain', () => {
      expect(MaskingMaster.maskEmail('john.doe@example.com')).toBe('j*******@example.com');
      expect(MaskingMaster.maskEmail('alice@domain.com')).toBe('a****@domain.com');
      expect(MaskingMaster.maskEmail('invalid-email')).toBe('invalid-email'); // Invalid email format
    });
  });

  describe('maskSSN', () => {
    it('should mask the SSN, revealing only the last 4 digits', () => {
      expect(MaskingMaster.maskSSN('123-45-6789')).toBe('***-**-6789');
      expect(MaskingMaster.maskSSN('98.652.4321')).toBe('**.***.4321');
      expect(MaskingMaster.maskSSN('1_12_34125_6789')).toBe('*_**_*****_6789'); // Edge case: different format
    });
  });

  describe('maskString', () => {
    it('should mask the string by replacing characters with the specified mask character', () => {
      expect(MaskingMaster.maskString('SensitiveData', 2, 2)).toBe('Se*********ta');
      expect(MaskingMaster.maskString('ExampleText', 3, 4, '#')).toBe('Exa####Text');
      expect(MaskingMaster.maskString('Short', 1, 1)).toBe('S***t'); // Edge case: short string
    });
  });
});
