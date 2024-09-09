import { SearchMaster } from '../src/search-master';

describe('SearchMaster', () => {
  describe('indexOf', () => {
    it('should find the index of the first occurrence of a substring', () => {
      expect(SearchMaster.indexOf('Hello, world!', 'world')).toBe(7);
      expect(SearchMaster.indexOf('Hello, world!', 'Hello')).toBe(0);
      expect(SearchMaster.indexOf('Hello, world!', 'foo')).toBe(-1);
    });
  });

  describe('lastIndexOf', () => {
    it('should find the index of the last occurrence of a substring', () => {
      expect(SearchMaster.lastIndexOf('Hello, world! world!', 'world')).toBe(14);
      expect(SearchMaster.lastIndexOf('Hello, world!', 'Hello')).toBe(0);
      expect(SearchMaster.lastIndexOf('Hello, world!', 'foo')).toBe(-1);
    });
  });

  describe('nthIndexOf', () => {
    it('should find the nth occurrence of a substring', () => {
      expect(SearchMaster.nthIndexOf('abcabcabc', 'abc', 2)).toBe(3);
      expect(SearchMaster.nthIndexOf('abcabcabc', 'abc', 1)).toBe(0);
      expect(SearchMaster.nthIndexOf('abcabcabc', 'abc', 4)).toBe(-1);
    });
  });

  describe('matchAll', () => {
    it('should find all matches of a regular expression pattern', () => {
      expect(SearchMaster.matchAll('Hello 123, world 456!', /\d+/g)).toEqual(['123', '456']);
      expect(SearchMaster.matchAll('No numbers here', /\d+/g)).toEqual([]);
      expect(SearchMaster.matchAll('abc 123 def 456', /\d+/g)).toEqual(['123', '456']);
    });
  });

  describe('findFirst', () => {
    it('should find the first word that matches a regular expression', () => {
      expect(SearchMaster.findFirst('Hello 123 world', /\d+/)).toBe('123');
      expect(SearchMaster.findFirst('No numbers here', /\d+/)).toBe('');
      expect(SearchMaster.findFirst('abc 456 def 789', /\d+/)).toBe('456');
    });
  });

  describe('fuzzySearch', () => {
    it('should perform a fuzzy search with the given maximum edit distance', () => {
      expect(SearchMaster.fuzzySearch('Hello, wrld!', 'world', 2)).toEqual(['wrld']);
      expect(SearchMaster.fuzzySearch('Hello, world!', 'world', 1)).toEqual(['world']);
      expect(SearchMaster.fuzzySearch('Hello, worlds!', 'word', 1)).toEqual([]);
    });
  });

  describe('highlight', () => {
    it('should highlight all occurrences of a substring with the specified tag', () => {
      expect(SearchMaster.highlight('Hello, world!', 'world')).toBe('Hello, <mark>world</mark>!');
      expect(SearchMaster.highlight('Highlight this: test test test', 'test')).toBe(
        'Highlight this: <mark>test</mark> <mark>test</mark> <mark>test</mark>',
      );
      expect(SearchMaster.highlight('No matches here', 'test')).toBe('No matches here');
    });
  });

  describe('proximitySearch', () => {
    it('should find words near each other within the specified distance', () => {
      expect(SearchMaster.proximitySearch('The quick brown fox jumps over the lazy dog', 'fox', 'dog', 5)).toBe(true);
      expect(SearchMaster.proximitySearch('The quick brown fox jumps over the lazy dog', 'fox', 'dog', 2)).toBe(false);
      expect(SearchMaster.proximitySearch('A quick brown fox jumps', 'fox', 'jumps', 3)).toBe(true);
    });
  });
});
