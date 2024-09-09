import { CasingMaster } from '../src/case-master';

describe('CasingMaster', () => {
  test('should convert to camelCase', () => {
    expect(CasingMaster.toCamelCase('hello world')).toBe('helloWorld');
    expect(CasingMaster.toCamelCase('Hello world')).toBe('helloWorld');
  });

  test('should convert to snake_case', () => {
    expect(CasingMaster.toSnakeCase('hello world')).toBe('hello_world');
    expect(CasingMaster.toSnakeCase('Hello world')).toBe('hello_world');
  });

  test('should convert to PascalCase', () => {
    expect(CasingMaster.toPascalCase('hello world')).toBe('HelloWorld');
    expect(CasingMaster.toPascalCase('Hello world')).toBe('HelloWorld');
  });

  test('should convert to kebab-case', () => {
    expect(CasingMaster.toKebabCase('hello world')).toBe('hello-world');
    expect(CasingMaster.toKebabCase('Hello world')).toBe('hello-world');
  });

  test('should convert to SCREAMING_SNAKE_CASE', () => {
    expect(CasingMaster.toScreamingSnakeCase('hello world')).toBe('HELLO_WORLD');
    expect(CasingMaster.toScreamingSnakeCase('Hello world')).toBe('HELLO_WORLD');
  });

  test('should convert to Sentence case', () => {
    expect(CasingMaster.toSentenceCase('hello world')).toBe('Hello world');
    expect(CasingMaster.toSentenceCase('HELLO WORLD')).toBe('Hello world');
  });

  test('should convert to Title Case', () => {
    expect(CasingMaster.toTitleCase('hello world')).toBe('Hello World');
    expect(CasingMaster.toTitleCase('HELLO WORLD')).toBe('Hello World');
  });

  test('should smartly convert case formats', () => {
    expect(CasingMaster.smartCaseConvert('hello world', 'camel')).toBe('helloWorld');
    expect(CasingMaster.smartCaseConvert('hello world', 'snake')).toBe('hello_world');
    expect(CasingMaster.smartCaseConvert('hello world', 'pascal')).toBe('HelloWorld');
    expect(CasingMaster.smartCaseConvert('hello world', 'kebab')).toBe('hello-world');
    expect(CasingMaster.smartCaseConvert('hello world', 'screaming-snake')).toBe('HELLO_WORLD');
    expect(CasingMaster.smartCaseConvert('hello world', 'sentence')).toBe('Hello world');
    expect(CasingMaster.smartCaseConvert('hello world', 'title')).toBe('Hello World');
  });
});
