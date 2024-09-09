import { TemplateMaster } from '../src/template-master';

describe('TemplateMaster', () => {
  describe('fill', () => {
    it('should fill template with provided values', () => {
      expect(TemplateMaster.fill('Hello, {name}!', { name: 'John' })).toBe('Hello, John!');
      expect(TemplateMaster.fill('Your balance is {balance}.', { balance: 1000 })).toBe('Your balance is 1000.');
      expect(TemplateMaster.fill('Welcome, {firstName} {lastName}!', { firstName: 'John', lastName: 'Doe' })).toBe(
        'Welcome, John Doe!',
      );
    });

    it('should leave placeholders if keys are not found in values', () => {
      expect(TemplateMaster.fill('Hello, {name}!', {})).toBe('Hello, {name}!');
      expect(TemplateMaster.fill('Your balance is {balance}.', {})).toBe('Your balance is {balance}.');
      expect(TemplateMaster.fill('Welcome, {firstName} {lastName}!', { firstName: 'John' })).toBe(
        'Welcome, John {lastName}!',
      );
    });
  });

  describe('fillWithDelimiter', () => {
    it('should fill template with custom delimiters', () => {
      expect(TemplateMaster.fillWithDelimiter('Hello, [name]!', { name: 'John' }, ['[', ']'])).toBe('Hello, John!');
      expect(TemplateMaster.fillWithDelimiter('Your balance is <<balance>>.', { balance: 1000 }, ['<<', '>>'])).toBe(
        'Your balance is 1000.',
      );
    });

    it('should leave placeholders if keys are not found in values', () => {
      expect(TemplateMaster.fillWithDelimiter('Hello, [name]!', {}, ['[', ']'])).toBe('Hello, [name]!');
      expect(TemplateMaster.fillWithDelimiter('Your balance is <<balance>>.', {}, ['<<', '>>'])).toBe(
        'Your balance is <<balance>>.',
      );
    });

    it('should default to curly braces if no delimiter is provided', () => {
      expect(TemplateMaster.fillWithDelimiter('Hello, {name}!', { name: 'John' })).toBe('Hello, John!');
    });
  });

  describe('escape', () => {
    it('should escape special characters to prevent injection attacks', () => {
      expect(TemplateMaster.escape('Hello, {name}! <script>alert("XSS")</script>')).toBe(
        'Hello, {name}! &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;',
      );
      expect(TemplateMaster.escape('Quotes " and \' should be escaped.')).toBe(
        'Quotes &quot; and &#39; should be escaped.',
      );
    });

    it('should leave non-special characters unchanged', () => {
      expect(TemplateMaster.escape('No special characters here')).toBe('No special characters here');
    });
  });

  describe('toFunction', () => {
    it('should convert template to a function that fills values', () => {
      const templateFunc = TemplateMaster.toFunction('Hello, {name}!');
      expect(templateFunc({ name: 'John' })).toBe('Hello, John!');

      const anotherTemplateFunc = TemplateMaster.toFunction('Your balance is {balance}.');
      expect(anotherTemplateFunc({ balance: 1000 })).toBe('Your balance is 1000.');
    });

    it('should handle missing keys with template function', () => {
      const templateFunc = TemplateMaster.toFunction('Hello, {name}!');
      expect(templateFunc({})).toBe('Hello, {name}!');

      const anotherTemplateFunc = TemplateMaster.toFunction('Your balance is {balance}.');
      expect(anotherTemplateFunc({})).toBe('Your balance is {balance}.');
    });
  });
});
