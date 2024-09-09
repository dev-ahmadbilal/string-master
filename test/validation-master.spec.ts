import { ValidationMaster } from '../src/validation-master';

describe('ValidationMaster', () => {
  describe('isAlpha', () => {
    it('should return true for alphabetic characters', () => {
      expect(ValidationMaster.isAlpha('abc')).toBe(true);
      expect(ValidationMaster.isAlpha('xyz')).toBe(true);
    });

    it('should return false for non-alphabetic characters', () => {
      expect(ValidationMaster.isAlpha('abc123')).toBe(false);
      expect(ValidationMaster.isAlpha('hello!')).toBe(false);
    });
  });

  describe('isAlphaNumeric', () => {
    it('should return true for alphanumeric characters', () => {
      expect(ValidationMaster.isAlphaNumeric('abc123')).toBe(true);
      expect(ValidationMaster.isAlphaNumeric('abc')).toBe(true);
      expect(ValidationMaster.isAlphaNumeric('123')).toBe(true);
    });

    it('should return false for non-alphanumeric characters', () => {
      expect(ValidationMaster.isAlphaNumeric('abc!123')).toBe(false);
      expect(ValidationMaster.isAlphaNumeric('hello@world')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty or whitespace-only strings', () => {
      expect(ValidationMaster.isEmpty('')).toBe(true);
      expect(ValidationMaster.isEmpty('   ')).toBe(true);
      expect(ValidationMaster.isEmpty('\t\t')).toBe(true);
    });

    it('should return false for non-empty strings with content', () => {
      expect(ValidationMaster.isEmpty('abc')).toBe(false);
      expect(ValidationMaster.isEmpty('  text  ')).toBe(false);
    });
  });

  describe('isLower', () => {
    it('should return true for lowercase strings', () => {
      expect(ValidationMaster.isLower('abc')).toBe(true);
      expect(ValidationMaster.isLower('hello')).toBe(true);
    });

    it('should return false for non-lowercase strings', () => {
      expect(ValidationMaster.isLower('Abc')).toBe(false);
      expect(ValidationMaster.isLower('HELLO')).toBe(false);
      expect(ValidationMaster.isLower('Hello World')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('should return true for numeric strings', () => {
      expect(ValidationMaster.isNumeric('123')).toBe(true);
      expect(ValidationMaster.isNumeric('456789')).toBe(true);
    });

    it('should return false for non-numeric strings', () => {
      expect(ValidationMaster.isNumeric('123a')).toBe(false);
      expect(ValidationMaster.isNumeric('abc')).toBe(false);
    });
  });

  describe('isUpper', () => {
    it('should return true for uppercase strings', () => {
      expect(ValidationMaster.isUpper('ABC')).toBe(true);
      expect(ValidationMaster.isUpper('HELLO')).toBe(true);
    });

    it('should return false for non-uppercase strings', () => {
      expect(ValidationMaster.isUpper('Abc')).toBe(false);
      expect(ValidationMaster.isUpper('hello')).toBe(false);
      expect(ValidationMaster.isUpper('Hello World')).toBe(false);
    });
  });

  describe('startsWith', () => {
    it('should return true if the string starts with the given substring', () => {
      expect(ValidationMaster.startsWith('Hello, world!', 'Hello')).toBe(true);
      expect(ValidationMaster.startsWith('abc123', 'abc')).toBe(true);
    });

    it('should return false if the string does not start with the given substring', () => {
      expect(ValidationMaster.startsWith('Hello, world!', 'world')).toBe(false);
      expect(ValidationMaster.startsWith('abc123', '123')).toBe(false);
    });
  });

  describe('endsWith', () => {
    it('should return true if the string ends with any of the specified suffixes', () => {
      expect(ValidationMaster.endsWith('hello', 'lo', 'world')).toBe(true);
      expect(ValidationMaster.endsWith('file.txt', '.txt', '.docx')).toBe(true);
    });

    it('should return false if the string does not end with any of the specified suffixes', () => {
      expect(ValidationMaster.endsWith('hello', 'hi')).toBe(false);
      expect(ValidationMaster.endsWith('file.docx', '.txt')).toBe(false);
    });
  });

  describe('equalsIgnoreCase', () => {
    it('should return true if the strings are equal ignoring case', () => {
      expect(ValidationMaster.equalsIgnoreCase('Hello', 'hello')).toBe(true);
      expect(ValidationMaster.equalsIgnoreCase('TEST', 'test')).toBe(true);
    });

    it('should return false if the strings are not equal ignoring case', () => {
      expect(ValidationMaster.equalsIgnoreCase('Hello', 'world')).toBe(false);
      expect(ValidationMaster.equalsIgnoreCase('abc', 'ABC ')).toBe(false);
    });
  });

  describe('contains', () => {
    it('should return true if the string contains the specified substring', () => {
      expect(ValidationMaster.contains('hello world', 'world')).toBe(true);
      expect(ValidationMaster.contains('javascript', 'script')).toBe(true);
    });

    it('should return false if the string does not contain the specified substring', () => {
      expect(ValidationMaster.contains('hello world', 'earth')).toBe(false);
      expect(ValidationMaster.contains('javascript', 'Java')).toBe(false);
    });
  });

  describe('isAnagram', () => {
    it('should return true if the strings are anagrams of each other', () => {
      expect(ValidationMaster.isAnagram('listen', 'silent')).toBe(true);
      expect(ValidationMaster.isAnagram('evil', 'vile')).toBe(true);
    });

    it('should return false if the strings are not anagrams of each other', () => {
      expect(ValidationMaster.isAnagram('hello', 'world')).toBe(false);
      expect(ValidationMaster.isAnagram('python', 'java')).toBe(false);
    });
  });

  describe('isPalindrome', () => {
    it('should return true if the string is a palindrome', () => {
      expect(ValidationMaster.isPalindrome('A man, a plan, a canal, Panama')).toBe(true);
      expect(ValidationMaster.isPalindrome('racecar')).toBe(true);
    });

    it('should return false if the string is not a palindrome', () => {
      expect(ValidationMaster.isPalindrome('hello')).toBe(false);
      expect(ValidationMaster.isPalindrome('world')).toBe(false);
    });
  });
});
