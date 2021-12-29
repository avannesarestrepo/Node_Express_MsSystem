const MongoLib = require("../lib/mongo");

class UserXProjectService{
    constructor(){
        this.collection = "users";
        this.mongoDB = new MongoLib();
    }

    async getUser(UserId){
        const users = await this.mongoDB.get(this.collection, UserId);
        return users || {};
    }
}

module.exports = UserXProjectService;