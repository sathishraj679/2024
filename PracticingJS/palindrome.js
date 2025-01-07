function isPalindrome (str){
    let cleanStr ="";
    for (let i=0;i<str.length;i++){
        let char = str[i].toLowerCase();
        if ((char>= `a` && char<= `z`)||(char>= `0` &&char<= `9`)){
            cleanStr += char;
        }
    } let left = 0;
    let right = cleanStr.length-1;
    while (left<right){
        if (cleanStr[left]!==cleanStr[right]){
            return false;
        }left++;
        right--;
    } return true;
}

let input = "A man, A plan ,A canal, Panama";
let checkPalindrome = isPalindrome(input);
console.log(checkPalindrome);
