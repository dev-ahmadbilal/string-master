import { ManipulationMaster } from '../src/manipulation-master';

describe('ManipulationMaster', () => {
  describe('between', () => {
    it('should extract the substring between two markers', () => {
      expect(ManipulationMaster.between('Hello [World]!', '[', ']')).toBe('World');
      expect(ManipulationMaster.between('No markers here', '[', ']')).toBe('');
    });
  });

  describe('chompLeft', () => {
    it('should remove the prefix from the string', () => {
      expect(ManipulationMaster.chompLeft('HelloWorld', 'Hello')).toBe('World');
      expect(ManipulationMaster.chompLeft('HelloWorld', 'World')).toBe('HelloWorld');
    });
  });

  describe('chompRight', () => {
    it('should remove the suffix from the string', () => {
      expect(ManipulationMaster.chompRight('HelloWorld', 'World')).toBe('Hello');
      expect(ManipulationMaster.chompRight('HelloWorld', 'Hello')).toBe('HelloWorld');
    });
  });

  describe('removeNonAlphaNumeric', () => {
    it('should remove all non-alphanumeric characters', () => {
      expect(ManipulationMaster.removeNonAlphaNumeric('Hello, World! 123')).toBe('HelloWorld123');
      expect(ManipulationMaster.removeNonAlphaNumeric('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('should truncate the string and add ellipsis if necessary', () => {
      expect(ManipulationMaster.truncate('This is a long string', 10)).toBe('This is a...');
      expect(ManipulationMaster.truncate('Short', 10)).toBe('Short');
    });
  });

  describe('replaceAll', () => {
    it('should replace all occurrences of a target string', () => {
      expect(ManipulationMaster.replaceAll('foo bar foo', 'foo', 'baz')).toBe('baz bar baz');
      expect(ManipulationMaster.replaceAll('no replacement needed', 'foo', 'bar')).toBe('no replacement needed');
    });
  });

  describe('reverse', () => {
    it('should reverse the string', () => {
      expect(ManipulationMaster.reverse('abc')).toBe('cba');
      expect(ManipulationMaster.reverse('')).toBe('');
    });
  });

  describe('getLeft', () => {
    it('should extract the first or last N characters', () => {
      expect(ManipulationMaster.getLeft('HelloWorld', 5)).toBe('Hello');
      expect(ManipulationMaster.getLeft('HelloWorld', -5)).toBe('World');
      expect(ManipulationMaster.getLeft('HelloWorld', 0)).toBe('');
    });
  });

  describe('getRight', () => {
    it('should extract the last or first N characters', () => {
      expect(ManipulationMaster.getRight('HelloWorld', 5)).toBe('World');
      expect(ManipulationMaster.getRight('HelloWorld', -5)).toBe('Hello');
      expect(ManipulationMaster.getRight('HelloWorld', 0)).toBe('');
    });
  });

  describe('removeAll', () => {
    it('should remove all specified characters', () => {
      expect(ManipulationMaster.removeAll('Hello World', ' ', 'l')).toBe('HeoWord');
      expect(ManipulationMaster.removeAll('Remove these chars', 'e', 's')).toBe('Rmov th char');
    });
  });

  describe('lines', () => {
    it('should convert text into an array of lines', () => {
      expect(ManipulationMaster.lines('Hello\r\nWorld\r\n!')).toEqual(['Hello', 'World', '!']);
      expect(ManipulationMaster.lines('No newline characters')).toEqual(['No newline characters']);
    });
  });

  describe('stripPunctuation', () => {
    it('should remove punctuation from the string', () => {
      expect(ManipulationMaster.stripPunctuation('Hello, world!')).toBe('Hello world');
      expect(ManipulationMaster.stripPunctuation('No punctuation')).toBe('No punctuation');
    });
  });

  describe('ensureLeft', () => {
    it('should ensure the string starts with the specified prefix', () => {
      expect(ManipulationMaster.ensureLeft('world', 'hello ')).toBe('hello world');
      expect(ManipulationMaster.ensureLeft('hello world', 'hello ')).toBe('hello world');
    });
  });

  describe('ensureRight', () => {
    it('should ensure the string ends with the specified suffix', () => {
      expect(ManipulationMaster.ensureRight('hello', ' world')).toBe('hello world');
      expect(ManipulationMaster.ensureRight('hello world', ' world')).toBe('hello world');
    });
  });

  describe('latinise', () => {
    it('should convert non-Latin characters to their Latin equivalents', () => {
      expect(ManipulationMaster.latinise('Olá, mundo!')).toBe('Ola, mundo!');
      expect(ManipulationMaster.latinise('你好，世界！')).toBe('你好，世界！'); // Assuming Latin_Map doesn't include Chinese characters
    });
  });

  describe('ordinalize', () => {
    it('should add correct ordinal suffix to numbers', () => {
      expect(ManipulationMaster.ordinalize('the 1 pitch')).toBe('the 1st pitch');
      expect(ManipulationMaster.ordinalize('the 22 winner')).toBe('the 22nd winner');
      expect(ManipulationMaster.ordinalize('the 33 event')).toBe('the 33rd event');
    });

    it('should add "th" for numbers ending in 11, 12, or 13', () => {
      expect(ManipulationMaster.ordinalize('the 11 place')).toBe('the 11th place');
      expect(ManipulationMaster.ordinalize('the 12 edition')).toBe('the 12th edition');
      expect(ManipulationMaster.ordinalize('the 13 story')).toBe('the 13th story');
    });

    it('should correctly handle multiple numbers in a string', () => {
      expect(ManipulationMaster.ordinalize('the 1 and 22 champions')).toBe('the 1st and 22nd champions');
      expect(ManipulationMaster.ordinalize('he finished 11 and 33 in the races')).toBe(
        'he finished 11th and 33rd in the races',
      );
    });

    it('should not modify non-numeric words', () => {
      expect(ManipulationMaster.ordinalize('no numbers here')).toBe('no numbers here');
    });
  });
});
