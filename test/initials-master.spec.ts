import { InitialsMaster } from '../src/initials-master';

describe('InitialsMaster', () => {
  describe('extractInitials', () => {
    it('should extract initials correctly from a full name', () => {
      expect(InitialsMaster.extractInitials('John Doe')).toBe('JD');
      expect(InitialsMaster.extractInitials('Alice Bob')).toBe('AB');
      expect(InitialsMaster.extractInitials('')).toBe('');
    });

    it('extractInitials - single name', () => {
      expect(InitialsMaster.extractInitials('John Doe')).toBe('JD');
    });

    it('extractInitials - multiple names', () => {
      expect(InitialsMaster.extractInitials(['John Doe', 'Jane Smith'])).toEqual(['JD', 'JS']);
    });

    it('extractInitials - with length', () => {
      expect(InitialsMaster.extractInitials('John Doe', { length: 3 })).toBe('JDo');
    });
  });

  describe('addInitialsTo', () => {
    it('addInitialsTo - single name', () => {
      expect(InitialsMaster.addInitialsTo('John Doe')).toBe('John Doe (JD)');
    });

    it('addInitialsTo - multiple names', () => {
      expect(InitialsMaster.addInitialsTo(['John Doe', 'Jane Smith'])).toEqual(['John Doe (JD)', 'Jane Smith (JS)']);
    });

    it('addInitialsTo - with custom length', () => {
      expect(InitialsMaster.addInitialsTo('John Doe', { length: 3 })).toBe('John Doe (JDo)');
    });

    it('addInitialsTo - with predefined initials', () => {
      expect(InitialsMaster.addInitialsTo('John Doe', { existing: { 'John Doe': 'JDoe' } })).toBe('John Doe (JDoe)');
    });
  });

  describe('parse', () => {
    it('parse - single name with email', () => {
      expect(InitialsMaster.parse('John Doe <john.doe@example.com>')).toEqual({
        name: 'John Doe',
        initials: 'JD',
        email: 'john.doe@example.com',
      });
    });

    it('parse - multiple names', () => {
      expect(InitialsMaster.parse(['John Doe <john.doe@example.com>', 'Jane Smith'])).toEqual([
        { name: 'John Doe', initials: 'JD', email: 'john.doe@example.com' },
        { name: 'Jane Smith', initials: 'JS' },
      ]);
    });

    it('parse - name without email', () => {
      expect(InitialsMaster.parse('John Doe')).toEqual({
        name: 'John Doe',
        initials: 'JD',
      });
    });
  });

  describe('generateAcronym', () => {
    it('should generate an acronym from a phrase', () => {
      expect(InitialsMaster.generateAcronym('As Soon As Possible')).toBe('ASAP');
      expect(InitialsMaster.generateAcronym('For Your Information')).toBe('FYI');
      expect(InitialsMaster.generateAcronym('')).toBe('');
    });
  });

  describe('getFirstLetterOfEachWord', () => {
    it('should get the first letter of each word in a text', () => {
      expect(InitialsMaster.getFirstLetterOfEachWord('Hello World Example')).toBe('HWE');
      expect(InitialsMaster.getFirstLetterOfEachWord('A B C')).toBe('ABC');
      expect(InitialsMaster.getFirstLetterOfEachWord('')).toBe('');
    });
  });

  describe('createInitialsFromPhrase', () => {
    it('should create initials from a phrase with optional exclusion of specific words', () => {
      expect(InitialsMaster.createInitialsFromPhrase('The Quick Brown Fox')).toBe('TQBF');
      expect(InitialsMaster.createInitialsFromPhrase('The Quick Brown Fox', ['the', 'of'])).toBe('QBF');
      expect(InitialsMaster.createInitialsFromPhrase('')).toBe('');
    });
  });

  describe('abbreviateName', () => {
    it('should abbreviate a full name correctly', () => {
      expect(InitialsMaster.abbreviateName('John Michael Smith')).toBe('J.M.S.');
      expect(InitialsMaster.abbreviateName('Alice Bob')).toBe('A.B.');
      expect(InitialsMaster.abbreviateName('SingleName')).toBe('SingleName');
    });
  });

  describe('generateCustomAcronym', () => {
    it('should generate a custom acronym from a phrase with optional exclusion of specific words', () => {
      expect(InitialsMaster.generateCustomAcronym('For Your Information')).toBe('FYI');
      expect(InitialsMaster.generateCustomAcronym('For Your Information', ['for', 'your'])).toBe('I');
      expect(InitialsMaster.generateCustomAcronym('')).toBe('');
    });
  });
});
