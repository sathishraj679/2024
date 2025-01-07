function reverseString(inputString){
    let reversedString = "";
    for (let i=inputString.length-1;i>=0;i--){
        reversedString += inputString[i];
    } return reversedString;
}

    
     let newString = reverseString("racecar");
    console.log(newString);
   
//otherwise we can use array reverse method to reverse the array