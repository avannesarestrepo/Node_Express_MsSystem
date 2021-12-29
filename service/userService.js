const MongoLib = require("../lib/mongo");

class UserService{
    constructor(){
        this.collection = "users";
        this.mongoDB = new MongoLib();
    }

    async getUsers({ tags }){
        const query = tags && {$in: { tags }};
        const users = await this.mongoDB.getAll(this.collection, query);
        return users || [];
    }

    async getUser({ userId }){
        const user = await this.mongoDB.get(this.collection, userId);
        return user || {};
    }

    async createUser( { user }){
        const createdUser = await this.mongoDB.create(this.collection, user);
        return createdUser;
    }

    async updateUser( { userId, user} = { } ){
        const updateUser = await this.mongoDB.update(this.collection, userId, user);
        return updateUser;
    }

    async deleteUser({ userId }){
        const deleteUser = await this.mongoDB.delete(this.collection, userId);
        return deleteUser;
    }
}

module.exports = UserService;