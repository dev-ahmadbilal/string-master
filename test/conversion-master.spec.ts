import { ConversionMaster } from '../src/conversion-master';

describe('ConversionMaster', () => {
  describe('toBoolean', () => {
    it('should convert "yes" to true', () => {
      expect(ConversionMaster.toBoolean('yes')).toBe(true);
    });

    it('should convert "no" to false', () => {
      expect(ConversionMaster.toBoolean('no')).toBe(false);
    });

    it('should convert "on" to true', () => {
      expect(ConversionMaster.toBoolean('on')).toBe(true);
    });

    it('should convert "off" to false', () => {
      expect(ConversionMaster.toBoolean('off')).toBe(false);
    });

    it('should convert "1" to true', () => {
      expect(ConversionMaster.toBoolean('1')).toBe(true);
    });

    it('should convert "0" to false', () => {
      expect(ConversionMaster.toBoolean('0')).toBe(false);
    });

    it('should convert "true" to true', () => {
      expect(ConversionMaster.toBoolean('true')).toBe(true);
    });

    it('should convert "false" to false', () => {
      expect(ConversionMaster.toBoolean('false')).toBe(false);
    });
  });

  describe('toFloat', () => {
    it('should convert string to float with precision', () => {
      expect(ConversionMaster.toFloat('123.456', 2)).toBe(123.46);
    });

    it('should convert string to float without precision', () => {
      expect(ConversionMaster.toFloat('123.456')).toBe(123.456);
    });

    it('should handle non-numeric strings gracefully', () => {
      expect(ConversionMaster.toFloat('abc')).toBeNaN();
    });
  });

  describe('toInt', () => {
    it('should convert decimal string to integer', () => {
      expect(ConversionMaster.toInt('42')).toBe(42);
    });

    it('should convert hexadecimal string to integer', () => {
      expect(ConversionMaster.toInt('0x1A')).toBe(26);
    });

    it('should handle non-numeric strings gracefully', () => {
      expect(ConversionMaster.toInt('abc')).toBeNaN();
    });
  });

  describe('toJson', () => {
    it('should convert a JSON string to an object', () => {
      expect(ConversionMaster.toJson('{"name": "John"}')).toEqual({ name: 'John' });
    });

    it('should throw an error for invalid JSON', () => {
      expect(() => ConversionMaster.toJson('{name: John}')).toThrow(SyntaxError);
    });
  });

  describe('fromJson', () => {
    it('should convert a JSON object to a string', () => {
      expect(ConversionMaster.fromJson({ name: 'John' })).toBe('{"name":"John"}');
    });

    it('should handle nested objects', () => {
      const nestedObj = { user: { name: 'John', age: 30 }, active: true };
      expect(ConversionMaster.fromJson(nestedObj)).toBe('{"user":{"name":"John","age":30},"active":true}');
    });

    it('should convert an empty object to an empty JSON string', () => {
      expect(ConversionMaster.fromJson({})).toBe('{}');
    });

    it('should handle arrays in JSON objects', () => {
      const objWithArray = { name: 'John', hobbies: ['reading', 'gaming'] };
      expect(ConversionMaster.fromJson(objWithArray)).toBe('{"name":"John","hobbies":["reading","gaming"]}');
    });
  });

  describe('toBase64', () => {
    it('should convert a string to Base64', () => {
      expect(ConversionMaster.toBase64('Hello World!')).toBe('SGVsbG8gV29ybGQh');
    });
  });

  describe('fromBase64', () => {
    it('should convert Base64 to a string', () => {
      expect(ConversionMaster.fromBase64('SGVsbG8gV29ybGQh')).toBe('Hello World!');
    });
  });

  describe('toHex', () => {
    it('should convert a string to hexadecimal', () => {
      expect(ConversionMaster.toHex('Hello')).toBe('48656c6c6f');
    });
  });

  describe('fromHex', () => {
    it('should convert hexadecimal to a string', () => {
      expect(ConversionMaster.fromHex('48656c6c6f')).toBe('Hello');
    });
  });
});
