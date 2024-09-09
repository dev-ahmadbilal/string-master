import { SanitizationMaster } from '../src/sanitization-master';

describe('SanitizationMaster', () => {
  describe('escapeHtml', () => {
    it('should escape HTML characters', () => {
      expect(SanitizationMaster.escapeHtml('<div>Hello & welcome!</div>')).toBe(
        '&lt;div&gt;Hello &amp; welcome!&lt;/div&gt;',
      );
      expect(SanitizationMaster.escapeHtml('"Double Quotes" & \'Single Quotes\'')).toBe(
        '&quot;Double Quotes&quot; &amp; &#39;Single Quotes&#39;',
      );
      expect(SanitizationMaster.escapeHtml('& < > " \'')).toBe('&amp; &lt; &gt; &quot; &#39;');
    });
  });

  describe('removeControlCharacters', () => {
    it('should remove control characters', () => {
      expect(SanitizationMaster.removeControlCharacters('Hello\u0001World\u0002')).toBe('HelloWorld');
      expect(SanitizationMaster.removeControlCharacters('Test\u0007String\u001F')).toBe('TestString');
      expect(SanitizationMaster.removeControlCharacters('NoControlCharsHere')).toBe('NoControlCharsHere');
    });
  });

  describe('sanitizeForDisplay', () => {
    it('should escape HTML characters and remove control characters', () => {
      expect(SanitizationMaster.sanitizeForDisplay('<div>Hello\u0001World</div>')).toBe(
        '&lt;div&gt;HelloWorld&lt;/div&gt;',
      );
      expect(SanitizationMaster.sanitizeForDisplay('This & That\u0003')).toBe('This &amp; That');
      expect(SanitizationMaster.sanitizeForDisplay('Mixed & < Tags\u001F')).toBe('Mixed &amp; &lt; Tags');
    });
  });
});
