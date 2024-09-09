# String Master

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

`String Master` is a powerful JavaScript/TypeScript library designed to simplify a wide range of string operations and manipulations. With a comprehensive set of utility classes, it provides tools for transforming text, converting between formats, compressing data, encoding and decoding strings, sanitizing input, searching efficiently, and analyzing content. Each utility class is designed to address specific needs, making `String Master` an all-in-one solution for developers handling string data.

## Table of Contents

- [Installation](#1-installation)
- [Usage](#2-usage)
  - [CasingMaster](#1-CasingMaster): Convert strings to various cases, like Camel Case, Snake Case, and more.
  - [ConversionMaster](#2-ConversionMaster): Convert strings between different types, such as hexadecimal, integers, or float.
  - [CompressionMaster](#3-compressionmaster): Compress and decompress strings.
  - [EmojiMaster](#4-emojimaster): Manipulate, find, or replace emojis in strings.
  - [EntropyMaster](#5-entropymaster): Calculate the entropy of a string for cryptographic analysis.
  - [FrequencyMaster](#6-frequencymaster): Analyze the frequency of characters or words in strings.
  - [InflectionMaster](#7-inflectionmaster): Handle pluralization and singularization of words.
  - [InitialsMaster](#8-initialsmaster): Extract initials from names or phrases.
  - [ManipulationMaster](#9-ManipulationMaster): Reverse, shuffle, or manipulate strings in various ways.
  - [MaskingMaster](#10-maskingmaster): Mask sensitive parts of strings, like credit card numbers or emails.
  - [ObfuscationMaster](#11-obfuscationmaster): Obfuscate and deobfuscate strings for privacy or security.
  - [SanitizationMaster](#12-SanitizationMaster): Sanitize strings by removing unwanted characters or formatting.
  - [SearchMaster](#13-searchmaster): Search within strings using fuzzy search, proximity search, and more.
  - [SimilarityMaster](#14-similaritymaster): Calculate similarity between strings using various algorithms.
  - [SlugMaster](#15-slugmaster): Convert strings to URL-friendly slugs.
  - [TemplateMaster](#16-templatemaster): Perform string interpolation and templating.
  - [TrimmingMaster](#17-TrimmingMaster): Trim whitespace or specific characters from strings.
  - [ValidationMaster](#18-validationmaster): Validate strings against various rules, like email or URL formats.
- [Contributing](#3-contributing)
- [License](#4-license)
- [Contact](#5-contact)

## 1. Installation

To install the `string-master` package, use npm or yarn:

```bash
npm install string-master
# or
yarn add string-master
```
## 2. Usage
### 1. CasingMaster
The CasingMaster class provides methods to convert strings to various cases, such as Camel Case, Snake Case, Pascal Case, and more.
```ts
import { CasingMaster } from 'string-master';

console.log(CasingMaster.toCamelCase('hello world')); // 'helloWorld'
console.log(CasingMaster.toSnakeCase('hello world')); // 'hello_world'
console.log(CasingMaster.toPascalCase('hello world')); // 'HelloWorld'
console.log(CasingMaster.toKebabCase('hello world')); // 'hello-world'
console.log(CasingMaster.toScreamingSnakeCase('hello world')); // 'HELLO_WORLD'
console.log(CasingMaster.toSentenceCase('HELLO WORLD')); // 'Hello world'
console.log(CasingMaster.toTitleCase('hello world')); // 'Hello World'
console.log(CasingMaster.smartCaseConvert('hello world', 'pascal')); // 'HelloWorld'
console.log(CasingMaster.smartCaseConvert('hello world', 'kebab')); // 'hello-world'
console.log(CasingMaster.smartCaseConvert('HELLO WORLD', 'sentence')); // 'Hello world'
```

### 2. ConversionMaster
The ConversionMaster class provides methods to convert strings to different types, such as from a string to hexadecimal, integer, or binary.
```ts
import { ConversionMaster } from 'string-master';

console.log(ConversionMaster.toBoolean('yes')); // true
console.log(ConversionMaster.toBoolean('on')); // true
console.log(ConversionMaster.toBoolean('0')); // false
console.log(ConversionMaster.toBoolean('true')); // true

console.log(ConversionMaster.toFloat('123.456', 2)); // 123.46
console.log(ConversionMaster.toFloat('123.456')); // 123.456

console.log(ConversionMaster.toInt('42')); // 42
console.log(ConversionMaster.toInt('0x1A')); // 26 (hexadecimal)

console.log(ConversionMaster.toJson('{"name": "John"}')); // { name: 'John' }
console.log(ConversionMaster.fromJson({ name: 'John' })); // '{"name":"John"}'

console.log(ConversionMaster.toBase64('Hello World!')); // 'SGVsbG8gV29ybGQh'
console.log(ConversionMaster.fromBase64('SGVsbG8gV29ybGQh')); // 'Hello World!'

console.log(ConversionMaster.toHex('Hello')); // '48656c6c6f'
console.log(ConversionMaster.fromHex('48656c6c6f')); // 'Hello'
```

### 3. CompressionMaster
The CompressionMaster class handles string compression and decompression.
```ts
import { CompressionMaster } from 'string-master';

const compressed = CompressionMaster.compress('Hello, world!');
console.log(compressed); // Compressed string (e.g., "〶惶̀Ў㦀☄∀")

const decompressed = CompressionMaster.decompress(compressed);
console.log(decompressed); // 'Hello, world!'
```

### 4. EmojiMaster
The EmojiMaster class helps find, replace, or manipulate emojis in strings.
```ts
import { EmojiMaster } from 'string-master';

console.log(EmojiMaster.findEmojis('Hello 👋 World 🌍!')); // ['👋', '🌍']
console.log(EmojiMaster.countEmojis('Hello 👋 World 🌍!')); // 2
console.log(EmojiMaster.containsEmojis('Hello 👋 World!')); // true
console.log(EmojiMaster.extractEmojiSequences('Hello 👋 World 🌍! 🎉')); // ['👋', '🌍', '🎉']
console.log(EmojiMaster.replaceEmojis('Hello 👋 World 🌍!', '[emoji]')); // 'Hello [emoji] World [emoji]!'
const replacements = { happy: '😊', sad: '😢' };
const modifiedTextWithEmojis = EmojiMaster.replaceWordsWithEmojis('I am very happy and a bit sad.', replacements);
console.log(modifiedTextWithEmojis); // 'I am very 😊 and a bit 😢.'
```

### 5. EntropyMaster
The EntropyMaster class calculates the entropy of a string, useful for cryptography or information theory.
```ts
import { EntropyMaster } from 'string-master';

console.log(EntropyMaster.calculateEntropy('password123')); // 3.27
console.log(EntropyMaster.getStrength('password123')); // 'Moderate'
```

### 6. FrequencyMaster
The FrequencyMaster class analyzes the frequency of characters or words in a string.
```ts
import { FrequencyMaster } from 'string-master';

const text = 'hello world hello';

console.log(FrequencyMaster.countWordFrequency(text)); // { hello: 2, world: 1 }
console.log(FrequencyMaster.countCharacterFrequency(text)); // { h: 1, e: 1, l: 2, o: 2, w: 1, r: 1, d: 1 }
console.log(FrequencyMaster.findMostFrequentWords(text, 1)); // [{ word: "hello", count: 2 }]
console.log(FrequencyMaster.findLeastFrequentWords(text, 1)); // [{ word: "world", count: 1 }]
console.log(FrequencyMaster.getTopNCharacters(text, 2)); // [{ character: "l", count: 5 }, { character: "o", count: 3 }]
```
### 7. InflectionMaster
The InflectionMaster class handles pluralization and singularization of words.

Examples:
```ts
import { InflectionMaster } from 'string-master';

// Pluralize
const pluralPerson = InflectionMaster.pluralize('person');
console.log(pluralPerson); // 'people'

const pluralOctopus = InflectionMaster.pluralize('octopus');
console.log(pluralOctopus); // 'octopuses'

const pluralHat = InflectionMaster.pluralize('Hat');
console.log(pluralHat); // 'Hats'

// Singularize
const singularPeople = InflectionMaster.singularize('people');
console.log(singularPeople); // 'person'

const singularOctopuses = InflectionMaster.singularize('octopuses');
console.log(singularOctopuses); // 'octopus'

const singularHats = InflectionMaster.singularize('Hats');
console.log(singularHats); // 'Hat'

// Inflect based on count
const inflectPerson1 = InflectionMaster.inflect('people', 1);
console.log(inflectPerson1); // 'person'

const inflectOctopuses1 = InflectionMaster.inflect('octopuses', 1);
console.log(inflectOctopuses1); // 'octopus'

const inflectHats1 = InflectionMaster.inflect('Hats', 1);
console.log(inflectHats1); // 'Hat'

const inflectGuys1 = InflectionMaster.inflect('guys', 1);
console.log(inflectGuys1); // 'guy'

const inflectInches15 = InflectionMaster.inflect('inches', 1.5);
console.log(inflectInches15); // 'inches'

const inflectPerson2 = InflectionMaster.inflect('person', 2);
console.log(inflectPerson2); // 'people'

const inflectOctopus2 = InflectionMaster.inflect('octopus', 2);
console.log(inflectOctopus2); // 'octopuses'

const inflectHat2 = InflectionMaster.inflect('Hat', 2);
console.log(inflectHat2); // 'Hats'
```

### 8. InitialsMaster
The InitialsMaster class extracts initials from a string.

Examples:
```ts
import { InitialsMaster } from 'string-master';

// Extract initials for a single name
const initials1 = InitialsMaster.extractInitials('John Doe');
console.log(initials1); // 'JD'

// Extract initials for multiple names
const initials2 = InitialsMaster.extractInitials(['John Doe', 'Jane Smith']);
console.log(initials2); // ['JD', 'JS']

// Extract initials with a length of 3
const initials3 = InitialsMaster.extractInitials('John Doe', { length: 3 });
console.log(initials3); // 'JDo'

// Add initials to a single name
const nameWithInitials1 = InitialsMaster.addInitialsTo('John Doe');
console.log(nameWithInitials1); // 'John Doe (JD)'

// Add initials to multiple names
const namesWithInitials2 = InitialsMaster.addInitialsTo(['John Doe', 'Jane Smith']);
console.log(namesWithInitials2);
// ['John Doe (JD)', 'Jane Smith (JS)']

// Add initials with custom length
const nameWithInitials3 = InitialsMaster.addInitialsTo('John Doe', { length: 3 });
console.log(nameWithInitials3); // 'John Doe (JDo)'

// Add initials with predefined initials for names
const nameWithInitials4 = InitialsMaster.addInitialsTo('John Doe', { existing: { 'John Doe': 'JDoe' } });
console.log(nameWithInitials4); // 'John Doe (JDoe)'

// Parse name without email
const parsedName1 = InitialsMaster.parse('John Doe');
console.log(parsedName1); // { name: 'John Doe', initials: 'JD' }

// Parse a single name
const parsedName2 = InitialsMaster.parse('John Doe <john.doe@example.com>');
console.log(parsedName2);
// { name: 'John Doe', initials: 'JD', email: 'john.doe@example.com' }

// Parse multiple names
const parsedNames3 = InitialsMaster.parse(['John Doe <john.doe@example.com>', 'Jane Smith']);
console.log(parsedNames3);
// [
//   { name: 'John Doe', initials: 'JD', email: 'john.doe@example.com' },
//   { name: 'Jane Smith', initials: 'JS' }
// ]

// Create initials from a phrase, excluding certain words
const initialsPhrase = InitialsMaster.createInitialsFromPhrase('The Quick Brown Fox', ['the', 'of']);
console.log(initialsPhrase); // 'QBF'

// Abbreviate a full name
const abbreviatedName = InitialsMaster.abbreviateName('John Michael Smith');
console.log(abbreviatedName); // 'J.M.S.'

// Generate an acronym from a phrase
const acronymASAP = InitialsMaster.generateAcronym('As Soon As Possible');
console.log(acronymASAP); // 'ASAP'

// Get the first letter of each word in a text
const firstLetters = InitialsMaster.getFirstLetterOfEachWord('Hello World Example');
console.log(firstLetters); // 'HWE'

// Generate a custom acronym from a phrase, excluding certain words
const customAcronym = InitialsMaster.generateCustomAcronym('For Your Information', ['for', 'your']);
console.log(customAcronym); // 'I'

```

### 9. ManipulationMaster
The ManipulationMaster class provides methods to perform various manipulations on strings, like reversing or shuffling.

Examples:

```ts
import { ManipulationMaster } from 'string-master';

// Extract the string between two substrings
const betweenResult = ManipulationMaster.between('Hello [World]!', '[', ']');
console.log(betweenResult); // 'World'

// Remove a specific prefix from the start of the string
const chompLeftResult = ManipulationMaster.chompLeft('HelloWorld', 'Hello');
console.log(chompLeftResult); // 'World'

// Remove a specific suffix from the end of the string
const chompRightResult = ManipulationMaster.chompRight('HelloWorld', 'World');
console.log(chompRightResult); // 'Hello'

// Remove all characters except for letters and numbers
const removeNonAlphaNumericResult = ManipulationMaster.removeNonAlphaNumeric('Hello, World! 123');
console.log(removeNonAlphaNumericResult); // 'HelloWorld123'

// Truncate the string to a specified length and add an ellipsis if necessary
const truncateResult = ManipulationMaster.truncate('This is a long string', 10);
console.log(truncateResult); // 'This is a...'

// Replace all occurrences of a target string with another string
const replaceAllResult = ManipulationMaster.replaceAll('foo bar foo', 'foo', 'baz');
console.log(replaceAllResult); // 'baz bar baz'

// Reverse the string
const reverseResult = ManipulationMaster.reverse('abc');
console.log(reverseResult); // 'cba'

// Extract the first N characters, or the last N characters if N is negative
const getLeftResult = ManipulationMaster.getLeft('HelloWorld', 5);
console.log(getLeftResult); // 'Hello'
const getRightResult = ManipulationMaster.getRight('HelloWorld', -5);
console.log(getRightResult); // 'World'

// Remove all occurrences of specified characters
const removeAllResult = ManipulationMaster.removeAll('Hello World', ' ', 'l');
console.log(removeAllResult); // 'HeoWord'

// Convert a string into an array of lines, normalizing newlines
const linesResult = ManipulationMaster.lines('Hello\r\nWorld\r\n!');
console.log(linesResult); // ['Hello', 'World', '!']

// Remove punctuation from the string
const stripPunctuationResult = ManipulationMaster.stripPunctuation('Hello, world!');
console.log(stripPunctuationResult); // 'Hello world'

// Ensure that the string starts with the specified prefix
const ensureLeftResult = ManipulationMaster.ensureLeft('world', 'hello ');
console.log(ensureLeftResult); // 'hello world'

// Ensure that the string ends with the specified suffix
const ensureRightResult = ManipulationMaster.ensureRight('hello', ' world');
console.log(ensureRightResult); // 'hello world'

// Convert non-Latin characters to their Latin equivalents
const latiniseResult = ManipulationMaster.latinise('Olá, mundo!');
console.log(latiniseResult); // 'Ola, mundo!'

// Add ordinal suffixes to numbers in a string
const ordinalizeResult = ManipulationMaster.ordinalize('the 1 pitch and 22 jumps');
console.log(ordinalizeResult); // 'the 1st pitch and 22nd jumps'
```

### 10. MaskingMaster
The MaskingMaster class masks parts of a string, such as credit card numbers or emails.

Examples:
```ts
import { MaskingMaster } from 'string-master';

// Mask all but the last 4 digits of a credit card number
const maskedCreditCard = MaskingMaster.maskCreditCard('1234567812345678');
console.log(maskedCreditCard); // '************5678'

// Mask an email address, revealing only the first letter of the username and the domain
const maskedEmail = MaskingMaster.maskEmail('john.doe@example.com');
console.log(maskedEmail); // 'j*******@example.com'

// Mask a Social Security Number (SSN), revealing only the last 4 digits
const maskedSSN = MaskingMaster.maskSSN('123-45-6789');
console.log(maskedSSN); // '***-**-6789'

// Mask a generic string by replacing characters with a specified masking character
const maskedString = MaskingMaster.maskString('SensitiveData', 2, 2);
console.log(maskedString); // 'Se********ta'
```
### 11. ObfuscationMaster
The ObfuscationMaster class obfuscates and deobfuscates strings for privacy or security purposes.

Examples:

```ts
import { ObfuscationMaster } from 'string-master';

// Example of obfuscating text with a shift of 3
const obfuscated = ObfuscationMaster.obfuscate('Hello World', 3);
console.log(obfuscated); // "Khoor#Zruog"

// Example of deobfuscating the text with the same shift of 3
const deobfuscated = ObfuscationMaster.deobfuscate('Khoor#Zruog', 3);
console.log(deobfuscated); // "Hello World"

// Example of XOR-based obfuscation with a single-character key
const obfuscatedXOR = ObfuscationMaster.obfuscateXOR('Hello World', 'K');
console.log(obfuscatedXOR); // .''$k$9'/

// Example of deobfuscating XOR-obfuscated text with the same key
const original = ObfuscationMaster.deobfuscateXOR(obfuscatedXOR, 'K');
console.log(original); // "Hello World"
```
### 12. SanitizationMaster
The SanitizationMaster class provides methods to sanitize strings, removing unwanted characters or formatting.

Examples:

```ts
import { SanitizationMaster } from 'string-master';

// Example of escaping HTML characters
const escapedHtml = SanitizationMaster.escapeHtml('<div>Hello & welcome!</div>');
console.log(escapedHtml); // "&lt;div&gt;Hello &amp; welcome!&lt;/div&gt;"

// Example of removing control characters
const cleanedString = SanitizationMaster.removeControlCharacters('Hello\u0001World\u0002');
console.log(cleanedString); // "HelloWorld"

// Example of sanitizing a string for safe display (escaping HTML + removing control characters)
const sanitizedString = SanitizationMaster.sanitizeForDisplay('<div>Hello\u0001World</div>');
console.log(sanitizedString); // "&lt;div&gt;HelloWorld&lt;/div&gt;"
```

### 13. SearchMaster
The SearchMaster class provides methods for searching within strings, including fuzzy search and proximity search.

Examples:

```ts
import { SearchMaster } from 'string-master';

// Example: Finding the first occurrence of a substring
const firstIndex = SearchMaster.indexOf('Hello, world!', 'world');
console.log(firstIndex); // 7

// Example: Finding the last occurrence of a substring
const lastIndex = SearchMaster.lastIndexOf('Hello, world! world!', 'world');
console.log(lastIndex); // 14

// Example: Finding the nth occurrence of a substring
const nthIndex = SearchMaster.nthIndexOf('abcabcabc', 'abc', 2);
console.log(nthIndex); // 3

// Example: Matching all occurrences of a pattern
const matches = SearchMaster.matchAll('Hello 123, world 456!', /\d+/g);
console.log(matches); // ['123', '456']

// Example: Finding the first match with a regular expression
const firstMatch = SearchMaster.findFirst('Hello 123 world', /\d+/);
console.log(firstMatch); // '123'

// Example: Performing a fuzzy search
const fuzzyResults = SearchMaster.fuzzySearch('Hello, wrld!', 'world', 1);
console.log(fuzzyResults); // ['wrld']

// Example: Proximity search
const proximity = SearchMaster.proximitySearch('The quick brown fox jumps over the lazy dog', 'fox', 'dog', 5);
console.log(proximity); // true

// Example: Highlighting a substring
const highlighted = SearchMaster.highlight('Hello, world!', 'world');
console.log(highlighted); // 'Hello, <mark>world</mark>!'

```
### 14. SimilarityMaster
The SimilarityMaster class calculates the similarity between two strings using various algorithms like Jaccard, Levenshtein, and Jaro-Winkler.

Examples:

```ts
import { SimilarityMaster } from 'string-master';


// Example of checking similarity with a threshold of 0.8
const sm = new SimilarityMaster(['apple', 'banana', 'grape']);
const hasSimilar = sm.hasSimilarString('apples', 0.8);
console.log(hasSimilar); // true

// Example of getting similarity scores using the Dice coefficient
const scores = sm.getSimilarStrings('apple', 'dice');
console.log(scores);
// [
//   { element: 'apple', similarity: 1.0 },
//   { element: 'banana', similarity: 0 },
//   { element: 'grape', similarity: 0.25 }
// ]

// Example of calculating dice similarity between two strings
const dicsScore = SimilarityMaster.calculateSimilarity('hello', 'hallo', 'dice');
console.log(dicsScore); // 0.5

// Example of calculating Levenshtein similarity between two strings
const levenshteinScore = SimilarityMaster.calculateSimilarity('hello', 'hallo', 'levenshtein');
console.log(levenshteinScore); // 0.8

// Example of calculating jaro-winkler similarity between two strings
const jaroWinklerScore = SimilarityMaster.calculateSimilarity('hello', 'hallo', 'jaro-winkler');
console.log(jaroWinklerScore); // 0.88

// Example of calculating jaccard similarity between two strings
const jaccardScore = SimilarityMaster.calculateSimilarity('hello', 'hallo', 'jaccard');
console.log(jaccardScore); // 0.33

// Example of comparing multiple strings using the Jaccard index
const comparison = SimilarityMaster.compareMultipleStrings('apple', ['apples', 'banana', 'grape'], 'jaccard');
console.log(comparison.bestMatch); // { target: 'apples', rating: 0.8 }
console.log(comparison.bestMatchIndex); // 0
```

### 15. SlugMaster
The SlugMaster class converts strings to URL-friendly slugs.

Examples:

```ts
import { SlugMaster } from 'string-master';

// Example of converting a string to a URL-friendly slug
const slug1 = SlugMaster.slugify('Hello World!');
console.log(slug1); // "hello-world"

const slug2 = SlugMaster.slugify('JavaScript Mastery');
console.log(slug2); // "javascript-mastery"

// Example of converting a string to a slug with custom separator and case sensitivity
const slugWithOptions1 = SlugMaster.slugifyWithOptions('Hello World!', { separator: '_', lowercase: false });
console.log(slugWithOptions1); // "Hello_World"

// Example of setting custom rules for slugification
SlugMaster.setCustomRules([{ rule: /and/g, replacement: 'n' }]);
const slugWithRules = SlugMaster.slugify('Rock and Roll');
console.log(slugWithRules); // "rock-n-roll"
```

### 16. TemplateMaster
The TemplateMaster class allows for simple templating and string interpolation.

Examples:

```ts
import { TemplateMaster } from 'string-master';

// Example of filling a template string with provided values
const result1 = TemplateMaster.fill('Hello, {name}!', { name: 'John' });
console.log(result1); // "Hello, John!"

// Example of filling a template string with custom delimiters
const result2 = TemplateMaster.fillWithDelimiter('Hello, [name]!', { name: 'John' }, ['[', ']']);
console.log(result2); // "Hello, John!"

// Example of escaping special characters in a template string
const result3 = TemplateMaster.escape('Hello, {name}! <script>alert("XSS")</script>');
console.log(result3); // "Hello, {name}! &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"

// Example of converting a template string to a function
const templateFunc = TemplateMaster.toFunction('Hello, {name}!');
const result4 = templateFunc({ name: 'John' });
console.log(result4); // "Hello, John!"
```

### 17. TrimmingMaster
The TrimmingMaster class provides various methods for trimming whitespace or characters from strings.

Examples:

```ts
import { TrimmingMaster } from 'string-master';

// Example of trimming specified characters from the start of the string
const result1 = TrimmingMaster.trimStart('   Hello', ' ');
console.log(result1); // 'Hello'

// Example of trimming specified characters from the end of the string
const result2 = TrimmingMaster.trimEnd('Hello   ', ' ');
console.log(result2); // 'Hello'

// Example of collapsing multiple spaces into a single space
const result3 = TrimmingMaster.collapseWhitespace('Hello   World! ');
console.log(result3); // 'Hello World!'
```

### 18. ValidationMaster
The ValidationMaster class validates strings against different rules, such as email or URL formats.

Examples:
```ts
import { ValidationMaster } from 'string-master';

// Example of checking if a string contains only alphabetic characters
console.log(ValidationMaster.isAlpha('abc')); // true
console.log(ValidationMaster.isAlpha('abc123')); // false

// Example of checking if a string contains only alphanumeric characters
console.log(ValidationMaster.isAlphaNumeric('abc123')); // true
console.log(ValidationMaster.isAlphaNumeric('abc!123')); // false

// Example of checking if a string is empty or contains only whitespace
console.log(ValidationMaster.isEmpty('')); // true
console.log(ValidationMaster.isEmpty('   ')); // true
console.log(ValidationMaster.isEmpty('abc')); // false

// Example of checking if a string is in lowercase
console.log(ValidationMaster.isLower('abc')); // true
console.log(ValidationMaster.isLower('Abc')); // false

// Example of checking if a string contains only numeric characters
console.log(ValidationMaster.isNumeric('123')); // true
console.log(ValidationMaster.isNumeric('123a')); // false

// Example of checking if a string is in uppercase
console.log(ValidationMaster.isUpper('ABC')); // true
console.log(ValidationMaster.isUpper('Abc')); // false

// Example of checking if a string starts with a given substring
console.log(ValidationMaster.startsWith('Hello, world!', 'Hello')); // true

// Example of checking if a string ends with any of the specified suffixes
console.log(ValidationMaster.endsWith('hello', 'lo', 'world')); // true
console.log(ValidationMaster.endsWith('hello', 'hi')); // false

// Example of comparing two strings, ignoring case
console.log(ValidationMaster.equalsIgnoreCase('Hello', 'hello')); // true

// Example of checking if a string contains the specified substring
console.log(ValidationMaster.contains('hello world', 'world')); // true

// Example of checking if two strings are anagrams of each other
console.log(ValidationMaster.isAnagram('listen', 'silent')); // true

// Example of checking if a string is a palindrome
console.log(ValidationMaster.isPalindrome('A man, a plan, a canal, Panama')); // true
```

## 3. Contributing
I welcome contributions from the community to help improve the library. Please follow the [guidelines](CONTRIBUTING.md) below to get started.
## 4. License

String Master is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## 5. Contact

If you have any questions, suggestions, or would like to collaborate, please feel free to reach out:

- **Email:** [ahmadbilal.3491@gmail.com](mailto:ahmadbilal.3491@gmail.com)
- **LinkedIn:** [Ahmad Bilal](https://www.linkedin.com/in/ahmad-bilal-920637165)

I look forward to hearing from you!

[build-img]:https://github.com/dev-ahmadbilal/string-master/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/dev-ahmadbilal/string-master/actions/workflows/release.yml
[npm-img]:https://img.shields.io/npm/v/string-master
[npm-url]:https://www.npmjs.com/package/string-master
[issues-img]:https://img.shields.io/github/issues/dev-ahmadbilal/string-master
[issues-url]:https://github.com/dev-ahmadbilal/string-master/issues
[codecov-img]:https://codecov.io/gh/dev-ahmadbilal/string-master/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/dev-ahmadbilal/string-master
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
