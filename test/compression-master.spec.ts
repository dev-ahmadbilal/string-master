import { CompressionMaster } from '../src/compression-master';

describe('CompressionMaster', () => {
  test('should compress and decompress strings correctly', () => {
    const originalString = 'Hello, world!';
    const compressed = CompressionMaster.compress(originalString);
    const decompressed = CompressionMaster.decompress(compressed);

    expect(decompressed).toBe(originalString);
  });

  test('should handle empty strings', () => {
    const originalString = '';
    const compressed = CompressionMaster.compress(originalString);
    const decompressed = CompressionMaster.decompress(compressed);

    expect(decompressed).toBe(originalString);
  });

  test('should handle strings with special characters', () => {
    const originalString = 'Special characters: !@#$%^&*()_+[]{}|;:",.<>?/';
    const compressed = CompressionMaster.compress(originalString);
    const decompressed = CompressionMaster.decompress(compressed);

    expect(decompressed).toBe(originalString);
  });

  test('should handle large strings', () => {
    const originalString = 'A'.repeat(10000); // Large string of 10,000 characters
    const compressed = CompressionMaster.compress(originalString);
    const decompressed = CompressionMaster.decompress(compressed);

    expect(decompressed).toBe(originalString);
  });
});
