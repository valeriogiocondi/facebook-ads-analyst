module.exports = class AdsCountResponseBO {

    constructor(params) {
    
        this.page_id = params.page_id;
        this.batch_job_id = params.batch_job_id;
        this.batch_job_executed_id = params.batch_job_executed_id;
        this.count = params.count;
    }
};