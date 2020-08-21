const NeDB = require('nedb')
const path = require('path')

exports.Tables = class DynamicService  {


  async find(params) {
   console.log("Params :",params)
   if (this.getService(params.query.tableDb,params.query.tableName)) {
     if (String(params.query.tableName).indexOf('?') != -1) {
      let tableName = String(params.query.tableName).split('?')[0];
      let paramsVals = String(params.query.tableName).split('?')[1];
      console.log("Search =",Object.fromEntries(new URLSearchParams(paramsVals)))
      //const { query } = this.filterQuery(paramsVals);
      return   this.getService(params.query.tableDb,tableName).find({ query: Object.fromEntries(new URLSearchParams(paramsVals)) } );

     } else {
      return   this.getService(params.query.tableDb,params.query.tableName).find(params.query.query);
     }

   } else {
     throw new errors.BadRequest('Not Found', { message: 'Model not found' });
   }

 }

  async get(id, params) {
   console.log("Service params :",params);
   return   this.getService(params.query.tableDb,params.query.tableName).get(id, params.query.params);
 }

 async  create(data, params) {
   if (this.getService(params.query.tableDb,params.query.tableName)) {
     console.log("create table");

     return  this.getService(params.query.tableDb,params.query.tableName).create(data, params.query.params);
   } else {
     throw new errors.BadRequest('Not Found', { message: 'Model not found' });
   }
 }

 async  update(id, data, params) {
   return  this.getService(params.query.tableDb,paramsquery.tableName).update(id, data, params.query.params);
 }

 async  patch(id, data, params) {
   return   this.getService(params.query.tableDb,params.query.tableName).patch(id, data, params.query.params);
 }

 async  remove(id, params) {
   return   this.getService(params.query.tableDb,params.query.tableName).remove(id, params.query.params);
 }


 getService(db,name) {



   console.log("Type Table :",db);
   console.log("Table name :",name);

   if (String(name).indexOf('?') != -1) {
     name = String(name).split('?')[0];
   }


     if (!this.app.service(`${name}`)) {
       if (db == 'nedb') {
         const {
           Service
         } = require("feathers-nedb");

         console.log('Service NEDB table :',name);

         this.app.use(
           `/${name}`,
           new Service({
             Model: new NeDB({
               filename: `./db-data/${name}`,//path.resolve(process.cwd() + "/db-data/" + name),
               autoload: true,
             }),
             paginate: false,
             multi: true,
           })
         );

       } else if ( db == 'mongodb') {

         const {
           Service
         } = require("feathers-mongodb");
         //const MongoClient = require("mongodb").MongoClient;
         console.log('Service MongoDB table :',name);
         console.log("MongoDB cnx : ",this.prj_mongodb_cnx);
         console.log("MongoDB database : ",this.prj_mongodb_name);
         //const dbClient = require('mongo-lazy-connect')(this.prj_mongodb_cnx);
         var modelClient = require('mongo-lazy-connect')(this.prj_mongodb_cnx).collection(name);
         //MongoClient.connect(this.prj_mongodb_cnx).then((client) => {
         this.app.use(
               `/${name}`,
               new Service({
                 Model: modelClient,
                 paginate: false,
                 multi: true
               })
         );
             //this.app.service(`${name}`));
         //});



       } else {
         const {
           Service
         } = require("feathers-nedb");
         console.log('Service NEDB table :',name);
         //let obj = new Object();


         this.app.use(
           `/${name}`,
           new Service({
             Model: new NeDB({
               filename: `./db-sys-data/${name}`,//path.resolve(process.cwd() + "/db-sys-data/" + name),
               autoload: true,
             }),
             paginate: false,
           })
         );
         this.app.service(`${name}`);
       }
     }

   return this.app.service(`${name}`);



 }


 setup(app, path) {
   this.app = app;
   this.path = path;
   this.prj_mongodb_cnx = app.get('mongodb_cnx');
   this.prj_mongodb_name = app.get('mongodb_name');
   this.params = app.params;
 }

}
