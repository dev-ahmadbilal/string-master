import { EntropyMaster } from '../src/entropy-master';

describe('EntropyMaster', () => {
  describe('calculateEntropy', () => {
    it('should calculate the entropy of a string', () => {
      const entropy = EntropyMaster.calculateEntropy('password123');
      expect(entropy).toBeCloseTo(3.2776, 4);
    });

    it('should handle an empty string', () => {
      const entropy = EntropyMaster.calculateEntropy('');
      expect(entropy).toBe(0); // Entropy of an empty string should be zero
    });

    it('should handle a single character string', () => {
      const entropy = EntropyMaster.calculateEntropy('a');
      expect(entropy).toBe(0); // Entropy of a single character string should be zero
    });

    it('should handle a string with repeating characters', () => {
      const entropy = EntropyMaster.calculateEntropy('aaaaaa');
      expect(entropy).toBe(0); // Entropy of a string with repeating characters should be 0
    });
  });

  describe('getStrength', () => {
    it('should return "Strong" for a string with high entropy', () => {
      const strength = EntropyMaster.getStrength('A1b2C3d4E5');
      expect(strength).toBe('Strong');
    });

    it('should return "Moderate" for a string with moderate entropy', () => {
      const strength = EntropyMaster.getStrength('password123');
      expect(strength).toBe('Moderate');
    });

    it('should return "Weak" for a string with low entropy', () => {
      const strength = EntropyMaster.getStrength('aaaaaa');
      expect(strength).toBe('Weak');
    });

    it('should handle an empty string and return "Weak"', () => {
      const strength = EntropyMaster.getStrength('');
      expect(strength).toBe('Weak');
    });
  });
});
