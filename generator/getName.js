/**
 * User: sfuentes
 * Date: 26.11.12
 * Time: 19:47
 */

var randomName = {
    vowels : new Array(
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["a", 7], ["e", 7], ["i", 7], ["o", 7], ["u", 7],
        ["ae", 7], ["ai", 7], ["ao", 7], ["au", 7], ["aa", 7],
        ["ea", 7], ["eo", 7], ["eu", 7], ["ee", 7],
        ["ia", 7], ["io", 7], ["iu", 7], ["ii", 7],
        ["oa", 7], ["oe", 7], ["oi", 7], ["ou", 7], ["oo", 7],
        ["eau", 7],
        ["'", 4],
        ["y", 7 ]

    ),
    consonants : new Array(
        ["b", 7], ["c", 7], ["d", 7], ["f", 7], ["g", 7], ["h", 7],
        ["j", 7], ["k", 7], ["-", 7], ["l", 7], ["m", 7], ["n", 7], ["p", 7],
        ["qu", 6], ["r", 7], ["s", 7], ["t", 7], ["v", 7], ["w", 7],
        ["x", 7], ["y", 7], ["z", 7], ["_", 7],
// Blends, sorted by second character:
        ["sc", 7],
        ["ch", 7], ["gh", 7], ["ph", 7], ["sh", 7], ["th", 7], ["wh", 6],
        ["ck", 5], ["nk", 5], ["rk", 5], ["sk", 7], ["wk", 2], ["sl", 6],
        ["cl", 6], ["fl", 6], ["gl", 6], ["kl", 6], ["ll", 6], ["pl", 6],
        ["br", 6], ["cr", 6], ["dr", 6], ["fr", 6], ["gr", 6], ["kr", 6],
        ["pr", 6], ["sr", 6], ["tr", 6], ["sch", 6],
        ["ss", 5], ["s", 5],
        ["st", 7], ["str", 6],
// Repeat some entries to make them more common.
        ["b", 7], ["c", 7], ["d", 7], ["f", 7], ["g", 7], ["h", 7],
        ["j", 7], ["k", 7], ["l", 7], ["m", 7], ["n", 7], ["p", 7],
        ["r", 7], ["s", 7], ["t", 7], ["v", 7], ["w", 7], ["`", 7],
        ["b", 7], ["c", 7], ["d", 7], ["f", 7], ["g", 7], ["h", 7],
        ["j", 7], ["k", 7], ["l", 7], ["m", 7], ["n", 7], ["p", 7],
        ["r", 7], ["s", 7], ["t", 7], ["v", 7], ["w", 7], ["´", 7],
        ["br", 6], ["dr", 6], ["fr", 6], ["gr", 6], ["kr", 6]
    ),


// Return a random value between minvalue and maxvalue, inclusive,
// with equal probability.

    rolladice : function (minvalue, maxvalue) {
        var result;
        while (1) {
            result = Math.floor(Math.random() * (maxvalue - minvalue + 1) + minvalue);
            if ((result >= minvalue) && (result <= maxvalue)) {
                return result;
            }
        }
    },

// Create a random name.  It must have at least between minsyl and maxsyl
// number of syllables (inclusive).

    getRandomName : function (minsyl, maxsyl) {
        var data = "";
        var genname = "";         // this accumulates the generated name.
        var leng = this.rolladice(minsyl, maxsyl); // Compute number of syllables in the name
        var isvowel = this.rolladice(0, 1); // randomly start with vowel or consonant
        for (var i = 1; i <= leng; i++) { // syllable #. Start is 1 (not 0)
            do {
                if (isvowel) {
                    data = this.vowels[this.rolladice(0, this.vowels.length - 1)];
                } else {
                    data = this.consonants[this.rolladice(0, this.consonants.length - 1)];
                }
                if (i == 1) { // first syllable.
                    if (data[1] & 2) {
                        break;
                    }
                } else if (i == leng) { // last syllable.
                    if (data[1] & 1) {
                        break;
                    }
                } else { // middle syllable.
                    if (data[1] & 4) {
                        break;
                    }
                }
            } while (1)
            genname += data[0];
            isvowel = 1 - isvowel; // Alternate between vowels and consonants.
        }
// Initial caps:
        genname = (genname.slice(0, 1)).toUpperCase() + genname.slice(1);
        return genname;
    }
}
module.exports = randomName;