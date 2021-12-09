module.exports = class AdsCountRequestDTO {

    constructor(params) {
        
        this.pageIdList  = params.pageIdList;
        this.batchJobIdList  = params.batchJobIdList;
        this.batchJobExecutedIdList  = params.batchJobExecutedIdList;
    }
};