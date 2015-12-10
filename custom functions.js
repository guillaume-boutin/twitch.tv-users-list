/* array.alphaSort() sorts an array alphabetically without distinction of
uppercase and lowercase letters, like array.sort() does. It also doesn't
affect the original array to which the function is applied. To sort the array,
use it this way:

sortedArray = array.alphaSort();
*/
Array.prototype.alphaSort = function() {
  var toBeSorted = [],
  capitalized = [],
  sorted = [],
  capIndex;
  for ( i=0; i<this.length; i++ ) {
    capitalized[i] = "";
    for ( j=0; j<this[i].length; j++ ) {
      if ( this[i][j] === this[i][j].toUpperCase() ) {
        capitalized[i] += "1";
      } else {
        capitalized[i] += "0";
      }
    }
    toBeSorted[i] = this[i].toLowerCase();
  }
  sorted = toBeSorted.concat().sort();
  for ( i=0; i<sorted.length; i++ ) {
    capIndex = toBeSorted.indexOf(sorted[i]);
    var word = sorted[i];
    for ( j=0; j<capitalized[capIndex].length; j++ ) {
      if ( capitalized[capIndex][j] === "1" ) {
        letter = word[j];
        letter = letter.toUpperCase();
        var subWord1 = word.substring(0, j);
        var subWord2 = word.substring(j, word.length);
        subWord2 = subWord2.replace(/^\w{1}/g, letter);
        word = subWord1 + subWord2;
      }
    }
    sorted[i] = word;
  }
  return sorted;
}
