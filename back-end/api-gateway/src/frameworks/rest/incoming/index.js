const { ApolloServer } = require('apollo-server-express');
const resolvers = require('../../graphql/resolvers');
const schema = require('../../graphql/schema');
const outcomingREST = require('../outcoming');
const AuthController = require('../../../controller/AuthController');

module.exports = (app) => {

  /* 
   *  AUTH Middleware
   *
   */
  app.use(async (req, res, next) => {
    
    if (
      req.originalUrl.startsWith('/graphql') ||
      req.originalUrl.startsWith('/api') 
    ) {
      
      // GraphQL POST without Authorization
      // if (
      //   req.originalUrl.startsWith('/graphql') &&
      //   req.method == 'POST' &&
      //   !await AuthController.check(req.headers.authorization) 
      // )
      //   return res.status(403).send({ message: '403 Forbidden' });

      next();
    
    } else {

      // NOT LOGGED
      return res.status(403).send({ message: '403 Forbidden' });
    }
    
  });

  /* 
   *  Apollo-Server GraphQL Middleware
   *
   */
  const server = new ApolloServer({
      typeDefs: schema,
      resolvers: resolvers(),
  });
  server.applyMiddleware({ app, path: '/graphql' });
    
  /* 
   *  FB-API
   *
   */
  app.get('/api/facebook-api/', async (req, res) => {
  
    const result =  await outcomingREST.facebookApi.getAds(req.query);
    res.send(result);
  });
  
  /* 
   *  GO-BATCH
   *
   */
  app.get('/api/batch-scheduler/', async (req, res) => {
  
    const requestDTO = {};
    const result = await outcomingREST.batchJob.getAllForBatch(requestDTO);
    res.send(result);
  });
  
};