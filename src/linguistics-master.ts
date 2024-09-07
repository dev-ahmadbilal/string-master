/**
 * LinguisticsMaster provides utilities related to the linguistic analysis of text, such as counting syllables, detecting language, or calculating the readability score.
 */
export class LinguisticsMaster {
  /**
   * This function adds ordinalize support to every String object.
   * @param str The subject string.
   * @returns Return all found numbers their sequence like '22nd'.
   * @example
   *
   *     const inflection = require( 'inflection' );
   *
   *     inflection.ordinalize( 'the 1 pitch' ); // 'the 1st pitch'
   */
  static ordinalize(str: string) {
    const strArr = str.split(' ');
    const j = strArr.length;

    for (let i = 0; i < j; i++) {
      const k = parseInt(strArr[i], 10);

      if (!isNaN(k)) {
        const ltd = strArr[i].substring(strArr[i].length - 2);
        const ld = strArr[i].substring(strArr[i].length - 1);
        let suf = 'th';

        if (ltd !== '11' && ltd !== '12' && ltd !== '13') {
          if (ld === '1') {
            suf = 'st';
          } else if (ld === '2') {
            suf = 'nd';
          } else if (ld === '3') {
            suf = 'rd';
          }
        }

        strArr[i] += suf;
      }
    }

    return strArr.join(' ');
  }
}
