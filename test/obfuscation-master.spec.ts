import { ObfuscationMaster } from '../src/obfuscation-master';

describe('ObfuscationMaster', () => {
  describe('obfuscate', () => {
    it('should obfuscate text by shifting char codes', () => {
      expect(ObfuscationMaster.obfuscate('Hello World', 3)).toBe('Khoor#Zruog');
      expect(ObfuscationMaster.obfuscate('Test', 1)).toBe('Uftu');
      expect(ObfuscationMaster.obfuscate('123', 2)).toBe('345');
    });
  });

  describe('deobfuscate', () => {
    it('should deobfuscate text by shifting char codes back', () => {
      expect(ObfuscationMaster.deobfuscate('Khoor#Zruog', 3)).toBe('Hello World');
      expect(ObfuscationMaster.deobfuscate('Uftu', 1)).toBe('Test');
      expect(ObfuscationMaster.deobfuscate('345', 2)).toBe('123');
    });
  });

  describe('obfuscateXOR', () => {
    it('should obfuscate text using XOR with the given key', () => {
      const obfuscated = ObfuscationMaster.obfuscateXOR('Hello World', 'K');
      expect(obfuscated).not.toBe('Hello World'); // Ensuring obfuscation happened
      expect(ObfuscationMaster.deobfuscateXOR(obfuscated, 'K')).toBe('Hello World');
    });
  });

  describe('deobfuscateXOR', () => {
    it('should deobfuscate XOR-based text using the same key', () => {
      const obfuscated = ObfuscationMaster.obfuscateXOR('Hello World', 'K');
      expect(ObfuscationMaster.deobfuscateXOR(obfuscated, 'K')).toBe('Hello World');
    });
  });
});
