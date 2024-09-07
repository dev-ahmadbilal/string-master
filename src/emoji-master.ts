/**
 * EmojiMaster handles emoji-related operations, like detecting emojis, counting them, or replacing them with text.
 */
export class EmojiMaster {
  /**
   * Detects and returns all emojis in a given text.
   * @param text - The text to search for emojis.
   * @returns An array of detected emojis.
   * @example
   * const emojis = EmojiMaster.findEmojis('Hello 👋 World 🌍!');
   * console.log(emojis); // Output: ['👋', '🌍']
   */
  static findEmojis(text: string): string[] {
    const emojiPattern =
      /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}|\u{1FB00}-\u{1FBFF}]/gu;
    return text.match(emojiPattern) || [];
  }

  /**
   * Counts the number of emojis in a given text.
   * @param text - The text to analyze.
   * @returns The count of emojis.
   * @example
   * const emojiCount = EmojiMaster.countEmojis('Hello 👋 World 🌍!');
   * console.log(emojiCount); // Output: 2
   */
  static countEmojis(text: string): number {
    return EmojiMaster.findEmojis(text).length;
  }

  /**
   * Replaces all emojis in a text with a specified placeholder.
   * @param text - The text to modify.
   * @param placeholder - The placeholder to replace emojis with. Default is '[emoji]'.
   * @returns The modified text with emojis replaced.
   * @example
   * const modifiedText = EmojiMaster.replaceEmojis('Hello 👋 World 🌍!', '[emoji]');
   * console.log(modifiedText); // Output: 'Hello [emoji] World [emoji]!'
   */
  static replaceEmojis(text: string, placeholder: string = '[emoji]'): string {
    return text.replace(
      /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}|\u{1FB00}-\u{1FBFF}]/gu,
      placeholder,
    );
  }

  /**
   * Converts a given text to include emojis from a list, replacing certain words with emojis.
   * @param text - The text to modify.
   * @param replacements - A map of words to their corresponding emojis.
   * @returns The modified text with words replaced by emojis.
   * @example
   * const replacements = { 'happy': '😊', 'sad': '😢' };
   * const modifiedText = EmojiMaster.replaceWordsWithEmojis('I am very happy and a bit sad.', replacements);
   * console.log(modifiedText); // Output: 'I am very 😊 and a bit 😢.'
   */
  static replaceWordsWithEmojis(text: string, replacements: Record<string, string>): string {
    let modifiedText = text;
    for (const [word, emoji] of Object.entries(replacements)) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      modifiedText = modifiedText.replace(regex, emoji);
    }
    return modifiedText;
  }

  /**
   * Extracts all emoji sequences from a text, preserving their order.
   * @param text - The text to search within.
   * @returns An array of emoji sequences.
   * @example
   * const sequences = EmojiMaster.extractEmojiSequences('Hello 👋 World 🌍! 🎉');
   * console.log(sequences); // Output: ['👋', '🌍', '🎉']
   */
  static extractEmojiSequences(text: string): string[] {
    const emojiPattern =
      /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}|\u{1FB00}-\u{1FBFF}]/gu;
    return text.match(emojiPattern) || [];
  }

  /**
   * Determines if a string contains any emojis.
   * @param text - The text to check.
   * @returns True if the text contains emojis, false otherwise.
   * @example
   * const hasEmojis = EmojiMaster.containsEmojis('Hello 👋 World!');
   * console.log(hasEmojis); // Output: true
   */
  static containsEmojis(text: string): boolean {
    return EmojiMaster.findEmojis(text).length > 0;
  }
}
