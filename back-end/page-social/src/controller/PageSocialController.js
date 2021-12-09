const RabbitMQ_layer = require('../frameworks/rabbitMQ');
const exportCSV = require('../utils/export-csv');
const PageSocialUseCase = require('../application/use_cases/PageSocialUseCase');
const PageSocialRequestDTOMapper = require('../entities/request/mappers/PageSocialRequestDTOMapper');
const PageSocialResponseDTOMapper = require('../entities/response/mappers/PageSocialResponseDTOMapper');

class PageSocialController {
    
    async getAll(requestDTO) {

        let requestBO = PageSocialRequestDTOMapper.toBO(requestDTO);

        return PageSocialUseCase.getAll(requestBO).then(async (responseBO) => {

            let pageSocialResponse = PageSocialResponseDTOMapper.toDTO(responseBO);

            // RabbitMQ - get countAds
            let requestCountAds = pageSocialResponse.map(pageSocial => pageSocial.internalId);
            
            // TODO
            // put validation on requestCountAds.length || separate function is better
            let responseCountAds = await RabbitMQ_layer.joinWith("ads.count.by-page-id", { body: { pageIdList: requestCountAds } } );

            // mapping result
            pageSocialResponse = pageSocialResponse.map((pageSocial) => {

                pageSocial.numAds = responseCountAds.payload.find((res) => {
                    
                    return (res.pageId === pageSocial.internalId)
                }).count;
                
                return pageSocial;
            });
            
            return pageSocialResponse;

        }).catch((err) => {
            
            console.error('Error occurred in PageSocialController.getAll(): \n\n');
            throw err;
        });
    }

    async getCount() {

        return PageSocialUseCase.getCount().then((response) => {

            return response;

        }).catch((err) => {
            
            console.error('Error occurred in PageSocialController.getAll(): \n\n');
            throw err;
        });
    }

    async getById(requestDTO) {
        
        let requestBO = PageSocialRequestDTOMapper.toBO(requestDTO);

        return PageSocialUseCase.getById(requestBO).then((responseBO) => {
            
            return PageSocialResponseDTOMapper.toDTO(responseBO);

        }, (err) => {
            
            throw new Error('Error occurred in PageSocialController.getById(): ' + JSON.stringify(err));
        });
    }

    async getByPageId(requestDTO) {
        
        let requestBO = PageSocialRequestDTOMapper.toBO(requestDTO);

        return PageSocialUseCase.getByPageId(requestBO).then((responseBO) => {
            
            return PageSocialResponseDTOMapper.toDTO(responseBO);

        }, (err) => {
            
            throw new Error('Error occurred in PageSocialController.getByPageId(): ' + JSON.stringify(err));
        });
    }

    async getAdsBySocialPageId(requestDTO) {

        try {
            let responseMessage = await RabbitMQ_layer.joinWith("ads.by-page-id", { body: requestDTO } );
            return responseMessage.payload;
            
        } catch (err) {
            
            console.error(err);
        } 
    }

    async insert(requestDTO) {

        let requestBO = PageSocialRequestDTOMapper.toBO(requestDTO);

        return PageSocialUseCase.insert(requestBO).then((responseBO) => {
            
            return PageSocialResponseDTOMapper.toDTO(responseBO);

        }, (err) => {
            
            throw new Error('Error occurred in PageSocialController.insert(): ' + JSON.stringify(err));
        });
    }
    
    async edit(requestDTO) {

        let requestBO = PageSocialRequestDTOMapper.toBO(requestDTO);

        return PageSocialUseCase.edit(requestDTO, requestBO).then((responseBO) => {
            
            return PageSocialResponseDTOMapper.toDTO(responseBO);

        }, (err) => {
            
            throw new Error('Error occurred in PageSocialController.editTask(): ' + JSON.stringify(err));
        });
    }

    async delete(requestDTO) {

        return PageSocialUseCase.delete(requestDTO).then((responseBO) => {
            
            return PageSocialResponseDTOMapper.toDTO(responseBO);

        }, (err) => {
            
            throw new Error('Error occurred in PageSocialController.deleteTask(): ' + JSON.stringify(err));
        });
    }

    async adsExportCSV(requestDTO) {
        
        try {
            
            let responseMessage = await RabbitMQ_layer.joinWith("ads.by-page-id", { body: requestDTO } );
            return exportCSV(responseMessage.payload);

        } catch (err) {
            
            console.error(err);
        }
        
        return null;
    }
};

module.exports = new PageSocialController();