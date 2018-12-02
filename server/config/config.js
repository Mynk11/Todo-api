var env = process.env.NODE_ENV || 'development';

/* if (env === 'development') {
    process.env, PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if (env === 'test') {
    process.env, PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
} */

if (env == "development" || env == "test") {
    var config = require('./config.json');
    var envConfig = config[env];
    console.log("Env is :", envConfig);
    console.log("Config is :", Object.keys(envConfig));
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });

}
//To set unset environment variables
//heroku config:set NAME=Mayank
// heroku config:get NAME=Mayank
//heroku config:unset NAME
//heroku config:set JWT_SECRET=ncvmnzcvnmvn
/*   <!--MOngo DB Connection String-->  
mongodb://todoapp:mayank11@ds159273.mlab.com:59273/todoapp
*/
/* format=mongodb://
username=todoapp:
password:mayank11
address:ds159273.mlab.com
portno:59273
DB_name:todoapp */
//heroku restart