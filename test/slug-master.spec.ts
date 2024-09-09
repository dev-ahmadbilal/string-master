import { SlugMaster } from '../src/slug-master';

describe('SlugMaster', () => {
  beforeEach(() => {
    // Reset custom rules before each test
    SlugMaster.setCustomRules([]);
  });

  describe('slugify', () => {
    it('should convert a string to a URL-friendly slug', () => {
      expect(SlugMaster.slugify('Hello World!')).toBe('hello-world');
      expect(SlugMaster.slugify('JavaScript Mastery')).toBe('javascript-mastery');
      expect(SlugMaster.slugify('   Extra   Spaces   ')).toBe('extra-spaces');
      expect(SlugMaster.slugify('Special & Characters @#!')).toBe('special-characters');
    });
  });

  describe('slugifyWithOptions', () => {
    it('should convert a string to a slug with custom options', () => {
      expect(SlugMaster.slugifyWithOptions('Hello World!', { separator: '_' })).toBe('hello_world');
      expect(SlugMaster.slugifyWithOptions('JavaScript Mastery', { lowercase: false })).toBe('JavaScript-Mastery');
      expect(SlugMaster.slugifyWithOptions('   Extra   Spaces   ', { separator: '_', lowercase: false })).toBe(
        'Extra_Spaces',
      );
      expect(SlugMaster.slugifyWithOptions('Special & Characters @#!', { separator: '_' })).toBe('special_characters');
    });

    it('should default to hyphen and lowercase if options are not provided', () => {
      expect(SlugMaster.slugifyWithOptions('Default Options')).toBe('default-options');
      expect(SlugMaster.slugifyWithOptions('Another Test', {})).toBe('another-test');
    });
  });

  describe('setCustomRules', () => {
    it('should apply custom rules to slugification', () => {
      SlugMaster.setCustomRules([{ rule: /and/g, replacement: 'n' }]);
      expect(SlugMaster.slugify('Rock and Roll')).toBe('rock-n-roll');

      SlugMaster.setCustomRules([{ rule: /o/g, replacement: '0' }]);
      expect(SlugMaster.slugify('Hello World!')).toBe('hell0-w0rld');
    });

    it('should clear custom rules if an empty array is set', () => {
      SlugMaster.setCustomRules([{ rule: /and/g, replacement: 'n' }]);
      expect(SlugMaster.slugify('Rock and Roll')).toBe('rock-n-roll');

      SlugMaster.setCustomRules([]);
      expect(SlugMaster.slugify('Rock and Roll')).toBe('rock-and-roll');
    });
  });
});
