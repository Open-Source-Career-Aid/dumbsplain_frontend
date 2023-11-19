
// const Bannedwords = require("../../public/flagged_words");
// console.log(Bannedwords);
import Bannedwords from "../../public/flagged_words.json";
// create a boolean function that checks if bannedword isa subset of string using regex
function checkUserName(username){
    // parse the json file
    let bannedList = Bannedwords["banned_words"];
    // loops through the list of banned words and checks if the username contains any of the banned words using regex
    for (let i = 0; i < bannedList.length; i++) {
        let bannedWord = bannedList[i];
        let regex = new RegExp(bannedWord, "gi");
        if (username.match(regex)) {
            return true;
        }
    }
    return false;
}
console.log(checkUserName("18992"));