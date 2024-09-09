import { EmojiMaster } from '../src/emoji-master';

describe('EmojiMaster', () => {
  describe('findEmojis', () => {
    it('should find all emojis in a text', () => {
      const result = EmojiMaster.findEmojis('Hello 👋 World 🌍!');
      expect(result).toEqual(['👋', '🌍']);
    });

    it('should return an empty array when no emojis are found', () => {
      const result = EmojiMaster.findEmojis('Hello World!');
      expect(result).toEqual([]);
    });

    it('should handle a text with no emojis gracefully', () => {
      const result = EmojiMaster.findEmojis('');
      expect(result).toEqual([]);
    });
  });

  describe('countEmojis', () => {
    it('should count the number of emojis in a text', () => {
      const result = EmojiMaster.countEmojis('Hello 👋 World 🌍!');
      expect(result).toBe(2);
    });

    it('should return 0 when no emojis are found', () => {
      const result = EmojiMaster.countEmojis('Hello World!');
      expect(result).toBe(0);
    });

    it('should handle a text with no emojis gracefully', () => {
      const result = EmojiMaster.countEmojis('');
      expect(result).toBe(0);
    });
  });

  describe('replaceEmojis', () => {
    it('should replace all emojis with the specified placeholder', () => {
      const result = EmojiMaster.replaceEmojis('Hello 👋 World 🌍!', '[emoji]');
      expect(result).toBe('Hello [emoji] World [emoji]!');
    });

    it('should replace all emojis with the default placeholder', () => {
      const result = EmojiMaster.replaceEmojis('Hello 👋 World 🌍!');
      expect(result).toBe('Hello [emoji] World [emoji]!');
    });

    it('should handle a text with no emojis gracefully', () => {
      const result = EmojiMaster.replaceEmojis('Hello World!');
      expect(result).toBe('Hello World!');
    });
  });

  describe('replaceWordsWithEmojis', () => {
    it('should replace specified words with emojis', () => {
      const replacements = { happy: '😊', sad: '😢' };
      const result = EmojiMaster.replaceWordsWithEmojis('I am very happy and a bit sad.', replacements);
      expect(result).toBe('I am very 😊 and a bit 😢.');
    });

    it('should handle text with no replacements', () => {
      const replacements = { happy: '😊' };
      const result = EmojiMaster.replaceWordsWithEmojis('I am neutral.', replacements);
      expect(result).toBe('I am neutral.');
    });

    it('should handle empty text gracefully', () => {
      const replacements = { happy: '😊' };
      const result = EmojiMaster.replaceWordsWithEmojis('', replacements);
      expect(result).toBe('');
    });
  });

  describe('extractEmojiSequences', () => {
    it('should extract all emoji sequences from a text', () => {
      const result = EmojiMaster.extractEmojiSequences('Hello 👋 World 🌍! 🎉');
      expect(result).toEqual(['👋', '🌍', '🎉']);
    });

    it('should return an empty array when no emojis are found', () => {
      const result = EmojiMaster.extractEmojiSequences('Hello World!');
      expect(result).toEqual([]);
    });

    it('should handle a text with no emojis gracefully', () => {
      const result = EmojiMaster.extractEmojiSequences('');
      expect(result).toEqual([]);
    });
  });

  describe('containsEmojis', () => {
    it('should return true if the text contains emojis', () => {
      const result = EmojiMaster.containsEmojis('Hello 👋 World!');
      expect(result).toBe(true);
    });

    it('should return false if the text does not contain emojis', () => {
      const result = EmojiMaster.containsEmojis('Hello World!');
      expect(result).toBe(false);
    });

    it('should handle a text with no emojis gracefully', () => {
      const result = EmojiMaster.containsEmojis('');
      expect(result).toBe(false);
    });
  });
});
