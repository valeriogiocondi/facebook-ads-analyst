const IBatchJobExecuted = require('../../../application/contracts/IBatchJobExecuted');
const ModelBatchJobExecuted = require('../../../entities/sequelize/BatchJobExecutedModel');
const BatchJobExecutedResponseBO = require('../../../entities/response/bo/BatchJobExecutedResponseBO');
const ModelBatchJob = require('../../../entities/sequelize/BatchJobModel');

class BatchJobExecutedPersistence extends IBatchJobExecuted {

    /* 
     *  Get all BatchJobExecuted
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
            
            // fk - BATCH_JOB_DAT
            ModelBatchJob.hasMany(ModelBatchJobExecuted, { foreignKey: 'batch_job_id' });
            ModelBatchJobExecuted.belongsTo(ModelBatchJob, { foreignKey: 'batch_job_id' });
            
            ModelBatchJobExecuted
                .findAll({
                    include: [
                        { model: ModelBatchJob },
                    ],
                    ...criteria,
                }).then((result) => {
                    
                    let boList = result.map((item) => {

                        return new BatchJobExecutedResponseBO(item);
                    });
                    resolve(boList);

                }).catch((err) => {
                
                    console.error(err);
                    reject(err);
                }
            );
        });  
    };

    /* 
     *  Get Count BatchJobExecuted
     *
     */
    async getCount() {
        
        return new Promise((resolve, reject) => {
       
            ModelBatchJobExecuted.count().then((result) => {

                resolve(result);
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });
    };

    /* 
     *  Get BatchJobExecuted by $id
     *
     */
    async getById(requestBO) {
    
        return new Promise((resolve, reject) => {

            let criteria = {
                where: { id: requestBO.id },
            };
            
            // fk - BATCH_JOB_DAT
            ModelBatchJob.hasMany(ModelBatchJobExecuted, { foreignKey: 'batch_job_id' });
            ModelBatchJobExecuted.belongsTo(ModelBatchJob, { foreignKey: 'batch_job_id' });
            
            ModelBatchJobExecuted
                .findOne({
                    include: [
                        { model: ModelBatchJob },
                    ],
                    ...criteria,
                }).then((result) => {
                    
                    resolve(new BatchJobExecutedResponseBO(result));

                }).catch((err) => {
                
                    console.error(err);
                    reject(result);
                }
            );
        });
    };


    /* 
     *  Get BatchJobExecuted by $batch_job_id
     *
     */
    async getByBatchJobId(requestBO) {
        
        return new Promise((resolve, reject) => {

            let criteria = {
                where: { batch_job_id: requestBO.batch_job_id },
            };
            
            // fk - BATCH_JOB_DAT
            ModelBatchJob.hasMany(ModelBatchJobExecuted, { foreignKey: 'batch_job_id' });
            ModelBatchJobExecuted.belongsTo(ModelBatchJob, { foreignKey: 'batch_job_id' });
            
            ModelBatchJobExecuted
                .findAll({
                    include: [
                        { model: ModelBatchJob },
                    ],
                    ...criteria,
                }).then((result) => {
                    
                    let boList = result.map((item) => {
                        
                        return new BatchJobExecutedResponseBO(item);
                    });
                    resolve(boList);

                }).catch((err) => {
                
                    console.error(err);
                    reject(result);
                }
            );
        });
    };

    /* 
     *  Get ADS by all single BatchJobExecuted
     */
    async getAdsByJobExecuted(requestBO) {
        
        return new Promise((resolve, reject) => {

            let criteria = { 
                where: { batch_job_id: requestBO.batch_job_id }
            };

            ModelBatchJobExecuted.findAll(criteria).then((result) => {

                    let boList = result.map((item) => {

                        return new BatchJobExecutedResponseBO(item);
                    });
                    resolve(boList);

                }).catch((err) => {
                
                    console.error(err);
                    reject(result);
                }
            );
        });
    };

    /* 
     *  Insert new job executed
     *
     */
    async insert(requestBO) {
        
        return new Promise((resolve, reject) => {

            ModelBatchJobExecuted.create(requestBO).then((result) => {

                resolve(new BatchJobExecutedResponseBO(result));
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });
    };

};

module.exports = new BatchJobExecutedPersistence();