const { authenticate } = require('@feathersjs/authentication').hooks

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

const createModelCtx  = async context => {
  const { data ,app , params, id, path, method, type , result } = context;
  //const { data ,app , params} = context;

  console.log("Params Create Database :",context.params);
  console.log("Services data :", context.data);

    const dbFind = await  app.service('databases').find({
      query: {
        dbName: context.params.query.modelName
      }
    });
  console.log("Database Table :",dbFind);

    if (dbFind.length == 0) {
      app.service('databases').create({
        dbType: context.params.query.modelDb,
        dbName: context.params.query.modelName,
        createAt: new Date()
      });
    }



  return context
};


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createModelCtx],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
