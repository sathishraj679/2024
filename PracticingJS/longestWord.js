function findLongestWord(sentence){
    // initially decalre empty variable for word and longest word
    let word = "";
    let longestWord="";
    for (let i=0;i<sentence.length;i++){
        if(sentence[i] !== " "){
            word+=sentence[i];
        }else{
            if(word.length>longestWord.length){
                longestWord=word;
            }word="";//to reassign the word to empty for every spaces we encounter
        }
        // if the sentence last word is the longest and it doesnt end without space we use this if condition
    }if(word.length>longestWord.length){
        longestWord=word;
    }return longestWord;
}
let sentence ="The quick brown fox jumped over the lazy dog";
console.log(findLongestWord(sentence));