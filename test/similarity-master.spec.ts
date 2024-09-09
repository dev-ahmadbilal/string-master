import { SimilarityMaster } from '../src/similarity-master';

describe('SimilarityMaster', () => {
  describe('hasSimilarString', () => {
    it('should return true if the target string is in the collection', () => {
      const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
      expect(sm.hasSimilarString('apple', 0.8)).toBe(true);
    });

    it('should return false if the target string is not similar enough', () => {
      const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
      expect(sm.hasSimilarString('orange', 0.9)).toBe(false);
    });

    it('should return true for a similar string with a sufficient threshold', () => {
      const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
      expect(sm.hasSimilarString('apples', 0.8)).toBe(true);
    });

    it('should return false when exact matches are excluded', () => {
      const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
      expect(sm.hasSimilarString('ankle', 0.8, false)).toBe(false);
    });
  });

  describe('getSimilarStrings', () => {
    it('should return an array of similarity scores for the target string', () => {
      const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
      const results = sm.getSimilarStrings('apple', 'dice');
      expect(results).toHaveLength(3);
      expect(results).toContainEqual(expect.objectContaining({ element: 'apple', similarity: 1.0 }));
    });

    it('should calculate similarity using different algorithms', () => {
      const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
      const resultsDice = sm.getSimilarStrings('apple', 'dice');
      const resultsLevenshtein = sm.getSimilarStrings('apple', 'levenshtein');
      const resultsJaccard = sm.getSimilarStrings('apple', 'jaccard');

      expect(resultsDice).not.toEqual(resultsLevenshtein);
      expect(resultsDice).not.toEqual(resultsJaccard);
      expect(resultsLevenshtein).not.toEqual(resultsJaccard);
    });
  });

  describe('calculateSimilarity', () => {
    it('should correctly compute similarity using Dice coefficient', () => {
      expect(SimilarityMaster.calculateSimilarity('apple', 'apples', 'dice')).toBeCloseTo(0.8889, 4);
    });

    it('should correctly compute similarity using Levenshtein distance', () => {
      expect(SimilarityMaster.calculateSimilarity('apple', 'apples', 'levenshtein')).toBeCloseTo(0.8, 1);
    });

    it('should correctly compute similarity using Jaccard index', () => {
      expect(SimilarityMaster.calculateSimilarity('apple', 'apples', 'jaccard')).toBeCloseTo(0.8, 1);
    });

    it('should return low similarity for different strings using Dice coefficient', () => {
      expect(SimilarityMaster.calculateSimilarity('apple', 'orange', 'dice')).toBeCloseTo(0.0, 1);
    });

    it('should return minimum similarity (0 similarity) for completely different strings using Levenshtein distance', () => {
      expect(SimilarityMaster.calculateSimilarity('apple', 'orange', 'levenshtein')).toBeCloseTo(0.2, 1);
    });

    it('should return low similarity for different strings using Jaccard index', () => {
      expect(SimilarityMaster.calculateSimilarity('apple', 'orange', 'jaccard')).toBeCloseTo(0.0, 1); // Different strings
    });

    it('should correctly compute similarity using Jaro-Winkler', () => {
      expect(SimilarityMaster.calculateSimilarity('hello', 'hallo', 'jaro-winkler')).toBeCloseTo(0.88, 3);
    });

    it('should return high similarity for identical strings using Jaro-Winkler', () => {
      expect(SimilarityMaster.calculateSimilarity('hello', 'hello', 'jaro-winkler')).toBeCloseTo(1.0, 1);
    });

    it('should return high similarity for empty strings using Jaro-Winkler', () => {
      expect(SimilarityMaster.calculateSimilarity('', '', 'jaro-winkler')).toBeCloseTo(1.0, 1);
    });

    it('should handle empty strings using Dice coefficient', () => {
      expect(SimilarityMaster.calculateSimilarity('', 'apple', 'dice')).toBeCloseTo(0.0, 1);
      expect(SimilarityMaster.calculateSimilarity('apple', '', 'dice')).toBeCloseTo(0.0, 1);
      expect(SimilarityMaster.calculateSimilarity('', '', 'dice')).toBeCloseTo(1.0, 1); // Both empty
    });

    it('should handle empty strings using Levenshtein distance', () => {
      expect(SimilarityMaster.calculateSimilarity('', 'apple', 'levenshtein')).toBeCloseTo(0.0, 1);
      expect(SimilarityMaster.calculateSimilarity('apple', '', 'levenshtein')).toBeCloseTo(0.0, 1);
      expect(SimilarityMaster.calculateSimilarity('', '', 'levenshtein')).toBeCloseTo(1.0, 1); // Both empty
    });

    it('should handle empty strings using Jaccard index', () => {
      expect(SimilarityMaster.calculateSimilarity('', 'apple', 'jaccard')).toBeCloseTo(0.0, 1);
      expect(SimilarityMaster.calculateSimilarity('apple', '', 'jaccard')).toBeCloseTo(0.0, 1);
      expect(SimilarityMaster.calculateSimilarity('', '', 'jaccard')).toBeCloseTo(1.0, 1); // Both empty
    });

    it('should handle empty strings using Jaro Winkler index', () => {
      expect(SimilarityMaster.calculateSimilarity('', 'apple', 'jaro-winkler')).toBeCloseTo(0.0, 1);
      expect(SimilarityMaster.calculateSimilarity('apple', '', 'jaro-winkler')).toBeCloseTo(0.0, 1);
      expect(SimilarityMaster.calculateSimilarity('', '', 'jaro-winkler')).toBeCloseTo(1.0, 1); // Both empty
    });
  });

  describe('compareMultipleStrings', () => {
    it('should return an empty array and null best match if no targets are provided', () => {
      const result = SimilarityMaster.compareMultipleStrings('apple', [], 'dice');
      expect(result.ratings).toHaveLength(0);
      expect(result.bestMatch).toBeNull();
      expect(result.bestMatchIndex).toBe(-1);
    });

    it('should correctly identify the best match', () => {
      const result = SimilarityMaster.compareMultipleStrings('apple', ['apples', 'banana', 'grape'], 'dice');
      expect(result.bestMatch).toEqual(expect.objectContaining({ target: 'apples' }));
    });

    it('should calculate multiple similarity scores and return them in an object', () => {
      const result = SimilarityMaster.compareMultipleStrings('apple', ['apples', 'banana', 'grape'], 'dice');
      expect(result.ratings).toHaveLength(3);
      expect(result.ratings).toContainEqual(expect.objectContaining({ target: 'apples' }));
    });
  });
});
