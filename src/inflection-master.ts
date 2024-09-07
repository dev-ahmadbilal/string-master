import { Plural_Rules, Singular_Rules, Uncountable_Words } from './utils/inflection-consts';

export class InflectionMaster {
  /**
   * A helper method that applies rules based replacement to a String.
   * @param str String to modify and return based on the passed rules.
   * @param rules Regexp to match paired with String to use for replacement
   * @param skip Strings to skip if they match
   * @param override String to return as though this method succeeded (used to conform to APIs)
   * @returns Return passed String modified by passed rules.
   * @example
   *
   *     applyRules( 'cows', singular_rules ); // 'cow'
   */
  private static applyRules(str: string, rules: [RegExp, string?][], skip: string[]) {
    if (skip.includes(str.toLocaleLowerCase())) {
      return str;
    }

    for (const rule of rules) {
      if (str.match(rule[0])) {
        if (rule[1] !== undefined) {
          return str.replace(rule[0], rule[1]);
        }

        return str;
      }
    }

    return str;
  }

  /**
   * This function adds pluralization support to every String object.
   * @param str The subject string.
   * @param plural Overrides normal output with said String.(optional)
   * @returns Singular English language nouns are returned in plural form.
   * @example
   *
   *     const inflection = require( 'inflection' );
   *
   *     inflection.pluralize( 'person' ); // 'people'
   *     inflection.pluralize( 'octopus' ); // 'octopuses'
   *     inflection.pluralize( 'Hat' ); // 'Hats'
   */
  static pluralize(str: string) {
    return InflectionMaster.applyRules(str, Plural_Rules, Uncountable_Words);
  }

  /**
   * This function adds singularization support to every String object.
   * @param str The subject string.
   * @param singular Overrides normal output with said String.(optional)
   * @returns Plural English language nouns are returned in singular form.
   * @example
   *
   *     const inflection = require( 'inflection' );
   *
   *     inflection.singularize( 'people' ); // 'person'
   *     inflection.singularize( 'octopuses' ); // 'octopus'
   *     inflection.singularize( 'Hats' ); // 'Hat'
   */
  static singularize(str: string) {
    return InflectionMaster.applyRules(str, Singular_Rules, Uncountable_Words);
  }

  /**
   * This function will pluralize or singularlize a String appropriately based on a number value
   * @param str The subject string.
   * @param count The number to base pluralization off of.
   * @param singular Overrides normal output with said String.(optional)
   * @param plural Overrides normal output with said String.(optional)
   * @returns English language nouns are returned in the plural or singular form based on the count.
   * @example
   *
   *     const inflection = require( 'inflection' );
   *
   *     inflection.inflect( 'people' 1 ); // === 'person'
   *     inflection.inflect( 'octopuses' 1 ); // === 'octopus'
   *     inflection.inflect( 'Hats' 1 ); // === 'Hat'
   *     inflection.inflect( 'guys', 1 , 'person' ); // === 'person'
   *     inflection.inflect( 'inches', 1.5 ); // === 'inches'
   *     inflection.inflect( 'person', 2 ); // === 'people'
   *     inflection.inflect( 'octopus', 2 ); // === 'octopuses'
   *     inflection.inflect( 'Hat', 2 ); // === 'Hats'
   */
  static inflect(str: string, count: number) {
    if (isNaN(count)) return str;

    if (count === 1) {
      return InflectionMaster.applyRules(str, Singular_Rules, Uncountable_Words);
    } else {
      return InflectionMaster.applyRules(str, Plural_Rules, Uncountable_Words);
    }
  }
}
