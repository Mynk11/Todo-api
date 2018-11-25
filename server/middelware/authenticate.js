var {
    User
} = require('./../model/user');


var authenticate = (req, res, next) => {
    //console.log("requested header is ", req.headers['x-auth']);
    var token = req.headers['x-auth'];
    //console.log("token is from get:", token);

    User.findByToken(token).then((user) => {
        if (!user) {
            console.log("in ! user", user);
            return Promise.reject();
        }
        req.user = user;
        req.token = token
        next();
    }).catch((e) => {
        res.status(401).send("Not Authenticated");
        console.log("Error from users/me:", e);
    });
}

/* var login = (req, res, next) => {
    //console.log("requested header is ", req.headers['x-auth']);
    var password = req.body.password;
    var email = req.body.email;
    console.log("token is from LOgin:", password, email);

    User.findByToken(email, password).then((user) => {
        if (!user) {
            console.log("in ! user", user);

            throw new Error("User not found");
        }
        console.log("finded item by email ", user);
        next();

    }).catch((e) => {
        res.status(403).send("You need to sign up");
        console.log("Error from users/me:", e);
    });




} */



module.exports = {
    authenticate
}