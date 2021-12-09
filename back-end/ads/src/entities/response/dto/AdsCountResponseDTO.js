module.exports = class AdsCountResponseDTO {

    constructor(params) {
        
        this.pageId = params.pageId;
        this.batchJobId = params.batchJobId;
        this.batchJobExecutedId = params.batchJobExecutedId;
        this.count = params.count;
    }
};