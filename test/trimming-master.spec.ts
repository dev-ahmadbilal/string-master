import { TrimmingMaster } from '../src/trimming-master';

describe('TrimmingMaster', () => {
  describe('trimStart', () => {
    it('should remove specified characters from the start of the string', () => {
      expect(TrimmingMaster.trimStart('---Hello', '-')).toBe('Hello');
      expect(TrimmingMaster.trimStart('***World', '*')).toBe('World');
    });

    it('should remove whitespace from the start of the string if no characters are specified', () => {
      expect(TrimmingMaster.trimStart('   Hello')).toBe('Hello');
      expect(TrimmingMaster.trimStart('\t\tWorld')).toBe('World');
    });

    it('should return the original string if no characters to trim and no leading whitespace', () => {
      expect(TrimmingMaster.trimStart('Hello')).toBe('Hello');
    });

    it('should handle special characters properly', () => {
      expect(TrimmingMaster.trimStart('???Hello', '?')).toBe('Hello');
      expect(TrimmingMaster.trimStart('??!Hello', '?')).toBe('!Hello');
    });
  });

  describe('trimEnd', () => {
    it('should remove specified characters from the end of the string', () => {
      expect(TrimmingMaster.trimEnd('Hello---', '-')).toBe('Hello');
      expect(TrimmingMaster.trimEnd('World***', '*')).toBe('World');
    });

    it('should remove whitespace from the end of the string if no characters are specified', () => {
      expect(TrimmingMaster.trimEnd('Hello   ')).toBe('Hello');
      expect(TrimmingMaster.trimEnd('World\t\t')).toBe('World');
    });

    it('should return the original string if no characters to trim and no trailing whitespace', () => {
      expect(TrimmingMaster.trimEnd('Hello')).toBe('Hello');
    });

    it('should handle special characters properly', () => {
      expect(TrimmingMaster.trimEnd('Hello???', '?')).toBe('Hello');
      expect(TrimmingMaster.trimEnd('Hello??!', '?')).toBe('Hello??!');
    });
  });

  describe('collapseWhitespace', () => {
    it('should collapse multiple spaces into a single space', () => {
      expect(TrimmingMaster.collapseWhitespace('Hello   World!')).toBe('Hello World!');
      expect(TrimmingMaster.collapseWhitespace('   Multiple    spaces   here   ')).toBe('Multiple spaces here');
    });

    it('should trim leading and trailing whitespace and collapse spaces in between', () => {
      expect(TrimmingMaster.collapseWhitespace('   Hello   World!   ')).toBe('Hello World!');
    });

    it('should return the original string if there is no extra whitespace', () => {
      expect(TrimmingMaster.collapseWhitespace('Hello World!')).toBe('Hello World!');
    });

    it('should handle strings with only whitespace', () => {
      expect(TrimmingMaster.collapseWhitespace('    ')).toBe('');
      expect(TrimmingMaster.collapseWhitespace('\t\t')).toBe('');
    });
  });
});
