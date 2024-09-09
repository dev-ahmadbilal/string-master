import { InflectionMaster } from '../src/inflection-master';

describe('InflectionMaster', () => {
  describe('applyRules', () => {
    it('should return the same string if it is in the skip list', () => {
      const result = InflectionMaster['applyRules']('fish', [], ['fish']);
      expect(result).toBe('fish');
    });

    it('should apply a rule when a match is found', () => {
      const rules: [RegExp, string?][] = [[/cats$/i, 'dogs']];
      const result = InflectionMaster['applyRules']('cats', rules, []);
      expect(result).toBe('dogs');
    });

    it('should return the original string when no match is found', () => {
      const rules: [RegExp, string?][] = [[/cats$/i, 'dogs']];
      const result = InflectionMaster['applyRules']('birds', rules, []);
      expect(result).toBe('birds');
    });
  });

  describe('pluralize', () => {
    it('should pluralize a singular word correctly', () => {
      const result = InflectionMaster.pluralize('person');
      expect(result).toBe('people'); // Assuming the rules in Plural_Rules are correct
    });

    it('should return the plural form of a regular noun', () => {
      const result = InflectionMaster.pluralize('hat');
      expect(result).toBe('hats');
    });

    it('should not modify uncountable words', () => {
      const result = InflectionMaster.pluralize('information');
      expect(result).toBe('information'); // Assuming 'information' is in Uncountable_Words
    });
  });

  describe('singularize', () => {
    it('should singularize a plural word correctly', () => {
      const result = InflectionMaster.singularize('people');
      expect(result).toBe('person'); // Assuming the rules in Singular_Rules are correct
    });

    it('should return the singular form of a regular noun', () => {
      const result = InflectionMaster.singularize('hats');
      expect(result).toBe('hat');
    });

    it('should not modify uncountable words', () => {
      const result = InflectionMaster.singularize('information');
      expect(result).toBe('information'); // Assuming 'information' is in Uncountable_Words
    });
  });

  describe('inflect', () => {
    it('should return the singular form when count is 1', () => {
      const result = InflectionMaster.inflect('hats', 1);
      expect(result).toBe('hat');
    });

    it('should return the plural form when count is greater than 1', () => {
      const result = InflectionMaster.inflect('hat', 2);
      expect(result).toBe('hats');
    });

    it('should return the same form when count is a fraction and the word is uncountable', () => {
      const result = InflectionMaster.inflect('information', 1.5);
      expect(result).toBe('information');
    });

    it('should return the original string if count is NaN', () => {
      const result = InflectionMaster.inflect('hat', NaN);
      expect(result).toBe('hat');
    });
  });
});
