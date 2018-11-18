const {
    SHA256
} = require('crypto-js');


const jwt = require('jsonwebtoken');






// var message = "ME in hell"
// var me = "ME"
// hash = SHA256(message).toString();
// hash1 = SHA256(me).toString();
// console.log("Hashed message is :", hash);
// console.log("Hashed message is :", hash1);

var data = {
    id: 4
}
var encoded = jwt.sign(data, "Mayank").toString();
console.log("Encoded value is:", encoded);

var decoded = jwt.verify(encoded, "Mayank");
console.log("decode is :", decoded);


// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somecode').toString()
// }
// token.data.id = 9;
// var resultHash = SHA256(JSON.stringify(data) + 'somecode').toString()


// if (resultHash === token.hash) {
//     console.log("Both are equal")

// } else {
//     console.log("Do not trust They are different");
// }