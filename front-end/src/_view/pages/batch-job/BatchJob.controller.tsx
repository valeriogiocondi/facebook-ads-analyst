import React from 'react';

// MODEL
import BatchJobType from "../../../_model/types/BatchJobType";

// SERVICE
import GraphqlService from "../../../services/graphql.service"
import ReduxService from '../../../services/redux.service';

// GRAPHQL
import selectNewQueryGraphQL from '../../../_model/relay/query/BatchJobSelectNewQuery';
import selectEditQueryGraphQL from '../../../_model/relay/query/BatchJobSelectEditQuery';
import insertQueryGraphQL from '../../../_model/relay/mutation/BatchJobInsertMutation';
import editQueryGraphQL from '../../../_model/relay/mutation/BatchJobEditQuery';


const init = (isNew: boolean, id: string): any => isNew ? ReduxService.action('GET_BATCH_JOB_PARAMS') : ReduxService.action('GET_BATCH_JOB', { id: id });

const saveTask = (isNew: boolean, batchJob: BatchJobType, cb: Function) => {
		
    const graphlQuery = (isNew) ? insertQueryGraphQL : editQueryGraphQL;
    /* 
     * 	TODO	
     *	request DTO
     *
     */
    const params = {
        id: 					batchJob.id,
        pageId: 				batchJob.pageSocial.id,
        pageInternalId: 		batchJob.pageSocial.internalId,
        publisherPlatformId: 	batchJob.pageSocial.publisherPlatform.idPublisherPlatform,
        adActiveStatus: 		batchJob.adActiveStatus,
        adReachedCountries: 	batchJob.adReachedCountries,
        adType: 				batchJob.adType,
        impressionCondition: 	batchJob.impressionCondition,
        searchTerms: 			batchJob.searchTerms,
        time: 					batchJob.time,
    };

    // TODO
    // Saga 
    GraphqlService.fetch(graphlQuery, params, cb);
};

export default {
    init: init,
    saveTask: saveTask,
};
