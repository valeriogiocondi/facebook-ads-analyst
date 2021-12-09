const IBatchJob = require('../../../application/contracts/IBatchJob');
const ModelBatchJob = require('../../../entities/sequelize/BatchJobModel');
const BatchJobResponseBO = require('../../../entities/response/bo/BatchJobResponseBO');

class BatchJob extends IBatchJob {

    /* 
     *  Get all BatchJob
     *
     */
    async getAll(requestBO) {

        return new Promise((resolve, reject) => {

            let criteria = { 
                limit: 10, 
                offset: 0,
                order: [['id', 'DESC']],
            };
            
            if (requestBO.limit && requestBO.page)
                criteria = {
                    ...criteria,
                    limit: requestBO.limit, 
                    offset: requestBO.limit * (requestBO.page-1), 
                };
                        
            ModelBatchJob.findAll(criteria).then((result) => {

                let boList = result.map((item) => {

                    return new BatchJobResponseBO(item);
                });
                resolve(boList);
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });  
    };

    /* 
     *  Get Count BatchJob
     *
     */
    async getCount() {
        
        return new Promise((resolve, reject) => {
            
            ModelBatchJob.count().then((result) => {

                resolve(result);
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });
    };

    /* 
     *  Get BatchJob by id
     *
     */
    async getById(requestBO) {

        return new Promise((resolve, reject) => {

            let criteria = { 
                where: {
                    id: requestBO.id
                },
            };

            ModelBatchJob.findOne(criteria).then((result) => {

                if (result)
                    resolve(new BatchJobResponseBO(result));
                    
                resolve({});
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });  
        });  
    };

    /* 
     *  Insert new BatchJob
     *
     */
    async insert(requestBO) {

        return new Promise((resolve, reject) => {

            ModelBatchJob.create(requestBO).then((result) => {

                resolve(result);
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });  
        });  
    };

    /* 
     *  Edit BatchJob
     *
     */
    async edit(requestBO) {
    
        return new Promise((resolve, reject) => {

            let criteria = {
                returning: true,
                where: {
                    id: requestBO.id
                }
            };

            ModelBatchJob.update(requestBO, criteria).then((result) => {

                // if (result[1])
                resolve(requestBO);
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });                 
        });
    };

    /* 
     *  Delete job
     *
     */
    async delete(requestBO) {

        // TODO - maybe
        // Use a flag to hide this job, instead to delete

        return new Promise((resolve, reject) => {

            let criteria = {
                where: {
                    id: requestBO.id
                }
            };

            ModelBatchJob.destroy(criteria).then((result) => {

                resolve(result);
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });                 
        });
    };
};

module.exports = new BatchJob();