import { FrequencyMaster } from '../src/frequency-master';

describe('FrequencyMaster', () => {
  describe('countWordFrequency', () => {
    it('should count the frequency of each word in a text', () => {
      const text = 'hello world hello';
      const result = FrequencyMaster.countWordFrequency(text);
      expect(result).toEqual({ hello: 2, world: 1 });
    });

    it('should handle an empty string', () => {
      const result = FrequencyMaster.countWordFrequency('');
      expect(result).toEqual({});
    });

    it('should handle a string with only spaces', () => {
      const result = FrequencyMaster.countWordFrequency('     ');
      expect(result).toEqual({});
    });

    it('should handle a string with different cases', () => {
      const text = 'Hello hello WORLD world';
      const result = FrequencyMaster.countWordFrequency(text);
      expect(result).toEqual({ hello: 2, world: 2 });
    });
  });

  describe('countCharacterFrequency', () => {
    it('should count the frequency of each character in a text', () => {
      const text = 'hello';
      const result = FrequencyMaster.countCharacterFrequency(text);
      expect(result).toEqual({ h: 1, e: 1, l: 2, o: 1 });
    });

    it('should handle an empty string', () => {
      const result = FrequencyMaster.countCharacterFrequency('');
      expect(result).toEqual({});
    });

    it('should handle a string with different cases', () => {
      const text = 'Hello Hello';
      const result = FrequencyMaster.countCharacterFrequency(text);
      expect(result).toEqual({ h: 2, e: 2, l: 4, o: 2, ' ': 1 });
    });
  });

  describe('findMostFrequentWords', () => {
    it('should find the most frequent words in a text', () => {
      const text = 'hello world hello';
      const result = FrequencyMaster.findMostFrequentWords(text, 1);
      expect(result).toEqual([{ word: 'hello', count: 2 }]);
    });

    it('should return all words if no limit is provided', () => {
      const text = 'hello world hello';
      const result = FrequencyMaster.findMostFrequentWords(text);
      expect(result).toEqual([
        { word: 'hello', count: 2 },
        { word: 'world', count: 1 },
      ]);
    });

    it('should handle an empty string', () => {
      const result = FrequencyMaster.findMostFrequentWords('');
      expect(result).toEqual([]);
    });
  });

  describe('findLeastFrequentWords', () => {
    it('should find the least frequent words in a text', () => {
      const text = 'hello world hello';
      const result = FrequencyMaster.findLeastFrequentWords(text, 1);
      expect(result).toEqual([{ word: 'world', count: 1 }]);
    });

    it('should return all words if no limit is provided', () => {
      const text = 'hello world hello';
      const result = FrequencyMaster.findLeastFrequentWords(text);
      expect(result).toEqual([
        { word: 'world', count: 1 },
        { word: 'hello', count: 2 },
      ]);
    });

    it('should handle an empty string', () => {
      const result = FrequencyMaster.findLeastFrequentWords('');
      expect(result).toEqual([]);
    });
  });

  describe('getTopNCharacters', () => {
    it('should get the top N most frequent characters in a text', () => {
      const text = 'hello';
      const result = FrequencyMaster.getTopNCharacters(text, 2);
      expect(result).toEqual([
        { character: 'l', count: 2 },
        { character: 'h', count: 1 },
      ]);
    });

    it('should return all characters if no limit is provided', () => {
      const text = 'hello';
      const result = FrequencyMaster.getTopNCharacters(text);
      expect(result).toEqual([
        { character: 'l', count: 2 },
        { character: 'h', count: 1 },
        { character: 'e', count: 1 },
        { character: 'o', count: 1 },
      ]);
    });

    it('should handle an empty string', () => {
      const result = FrequencyMaster.getTopNCharacters('');
      expect(result).toEqual([]);
    });
  });
});
