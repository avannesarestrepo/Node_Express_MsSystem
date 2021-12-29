const { MongoClient , ObjectId} = require("mongodb");

const MONGO_URI = 'mongodb+srv://angier:root@cluster0-4nyrf.mongodb.net/mssystem?retryWrites=true&w=majority';

class MongoLib{
    constructor(){
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = "mssystem";
    }

    connect(){
        if(!MongoLib.connection){
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if(err){
                        reject(err);
                        console.log(err);
                    }

                    console.log("Conexión Exitosa a Mongo");
                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return MongoLib.connection;
    }

    getAll(collection, query){
        return this.connect().then(db => {
            return db
                .collection(collection)
                .find(query)
                .toArray();
        });
    }

    get(collection, id){
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
        });
    }

    create(collection, data){
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    update(collection, id, data){
        return this.connect().then(db => {
            return db
                .collection(collection)
                .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true} );
        }).then(result => result.upsertedId || id);
    }

    delete(collection, id){
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => id);
    }

    /*getFindCodigo(collection, UserId ){
        //console.log(codigoUsuario);
        return this.connect().then(db => {
            const consulta = null;
            try {
                console.log(db.collection(collection).findOne({'codigoUsuario':UserId}));
                //db.collection(collection).findOne({'codigoUsuario':codigoUsuario });
            } catch (error) {
                console.log(error);
            }

            return consulta;
        });
    }*/
}
    
module.exports = MongoLib;