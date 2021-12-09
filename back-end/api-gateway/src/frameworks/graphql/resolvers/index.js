const outcomingREST = require('../../rest/outcoming');
const AuthController = require('../../../controller/AuthController');

/* 
 * TO SEE SCHEMA
 *  -> express-server/src/frameworks/graphql/resolvers/index.js
 *
 *  TO SEE QUERY (RELAY)
 *  -> react-client/src/_model/relay/query/*.ts
 * 
 */

module.exports = () => {

    return {
        
        Query: {
            
            /* 
            *  LOGIN
            */
            async loginAuth(parent, args, context, info) {

                return AuthController.login(args);
            },
            async loginVerify(parent, args, context, info) {

                return AuthController.verify(args);
            },
            async logout(parent, args, context, info) {

                return AuthController.logout(args);
            },

            /* 
            *  ADS
            */
            async adsList() {

                let response = await outcomingREST.ads.getAll(args.params);
                return {'token': args.authToken, 'adsList': response};
            },
            async adsById(parent, args, context, info) {

                return await outcomingREST.ads.getById(args.params);
            },

            async exportCsvAdsBySocialPageId(parent, args, context, info) {

                let response = await outcomingREST.pageSocial.getAdsBySocialPageIdExportCSV(args);
                return {'token': args.authToken, 'code': response.code, 'payload': response.payload };
            },

            async exportCsvAdsByBatchJobId(parent, args, context, info) {

                let response = await outcomingREST.batchJob.getCsvAdsByBatch(args);
                return {'token': args.authToken, 'code': response.code, 'payload': response.payload };
            },

            /* 
            *  FACEBOOK-API
            */
            async getActiveStatusList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getActiveStatusList();
                return {'token': args.authToken, 'activeStatusList': response};
            },
            async getReachedCountriesList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getReachedCountriesList();
                return {'token': args.authToken, 'reachedCountriesList': response};
            },
            async getTypeList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getTypeList();
                return {'token': args.authToken, 'typeList': response};
            },
            async getImpressionConditionList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getImpressionConditionList();
                return {'token': args.authToken, 'impressionConditionList': response};
            },
            async getPublisherPlatformList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getPublisherPlatformList();
                return {'token': args.authToken, 'publisherPlatformList': response};
            },

            /* 
            *  BATCH JOB
            */
            async getBatchJobList(parent, args, context, info) {

                return {
                    'token': args.authToken, 
                    'batchJobCount': await outcomingREST.batchJob.getCount(),
                    'batchJobList': await outcomingREST.batchJob.getAll(args)
                };
            },
            async getBatchJobById(parent, args, context, info) {

                return {
                    'token': args.authToken, 
                    'batchJob': await outcomingREST.batchJob.getById(args), 
                    'adsList': await outcomingREST.batchJob.getAdsByBatchJobId(args),
                };
            },
            async getBatchJobExecutedList(parent, args, context, info) {
                
                return {
                    'token': args.authToken, 
                    'batchJobExecutedCount': await outcomingREST.batchJobExecuted.getCount(), 
                    'batchJobExecutedList': await outcomingREST.batchJobExecuted.getAll(args)
                };
            },
            async getBatchJobExecutedById(parent, args, context, info) {

                return {
                    'token': args.authToken, 
                    'batchJobExecuted': await outcomingREST.batchJobExecuted.getById(args), 
                    'adsList': await outcomingREST.batchJobExecuted.getAdsByJobExecutedId(args),
                };
            },
            
            /* 
            *  PAGE SOCIAL 
            */
            async getPageSocialList(parent, args, context, info) {

               return {
                    'token': args.authToken, 
                    'pageSocialCount': await outcomingREST.pageSocial.getCount(),
                    'pageSocialList': await outcomingREST.pageSocial.getAll(args)
                };
            },
            async getPageSocial(parent, args, context, info) {

                let pageSocial = await outcomingREST.pageSocial.getById(args);
                // TODO
                // Load async with mutation
                let adsList = await outcomingREST.pageSocial.getAdsBySocialPageId(args);
                return {'token': args.authToken, 'pageSocial': pageSocial, 'adsList': adsList};
            },
        },

        Mutation: {
            /* 
            *  Get list paginated
            */
           async getPageSocialList(parent, args, context, info) {
               return {
                    'token': args.authToken, 
                    'pageSocialCount': await outcomingREST.pageSocial.getCount(),
                    'pageSocialList': await outcomingREST.pageSocial.getAll(args)
                };
            },
            async getBatchJobList(parent, args, context, info) {
                
               return {
                    'token': args.authToken, 
                    'batchJobCount': await outcomingREST.batchJob.getCount(),
                    'batchJobList': outcomingREST.batchJob.getAll(args.params)
                };
            },
            async getBatchJobExecutedList(parent, args, context, info) {
                
               return {
                    'token': args.authToken, 
                    'batchJobExecutedCount': await outcomingREST.batchJobExecuted.getCount(), 
                    'batchJobExecutedList': outcomingREST.batchJobExecuted.getAll(args.params)
                };
            },

            async insertBatchJob(parent, args, context, info) {  

                console.log(args.params)
                return await outcomingREST.batchJob.insert(args.params);
            },
            async editBatchJob(parent, args, context, info) {

                return await outcomingREST.batchJob.edit(args.params);
            },
            async deleteBatchJob(parent, args, context, info) {

                return await outcomingREST.batchJob.delete(args.params);
            },
        }
    }
};