import React from 'react';

// MODEL
import BatchJobExecutedType from "../../../_model/types/BatchJobExecutedType";

// SERVICE
import ReduxService from '../../../services/redux.service';

// UTILS
import { socialUtils } from "../../../utils";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../../utils/const";
import moment from 'moment';


const init = (): any => ReduxService.action('GET_BATCH_JOB_EXECUTED_LIST', { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT });

const serializeData = (list: BatchJobExecutedType[]): any => {

    const getCSV = (id: number, pageSocialInternalId: string) => {
        
		alert("Add this function!")


        // const params = {
        //     pageInternalId: pageSocialInternalId,
        // };
    
        // GraphqlService.fetch(AdsBySocialPageIdSelectQueryGraphQL, params)
        //     .then((data: any) => {

        //         switch (data.exportCsvAdsBySocialPageId.code) {

        //             case 200: {

        //                 exportCSV("ads-list-" + pageSocialInternalId + ".csv", data.exportCsvAdsBySocialPageId.payload);
        //                 break;
        //             }
        //             case 404: {

        //                 alert("Non sono presenti Ads per questa pagina");
        //                 break;
        //             }
        //             default: {

        //                 break;
        //             }
        //         }

        // });
    };
    
    const data: any[] = list?.map((item: BatchJobExecutedType) => {
	
        if (!item) return {};
        
        const timeExecuted = moment(item.created, "YYYY-MM-DDTHH:mm:ss a");

        return {
            "id": 				item.id,
            "name": 			<>
                                    <div className="foreground">
                                        { item.batchJob.pageSocial.name }
                                    </div>
                                    <div className="background internal-id">
                                        { socialUtils.getLinkSocialPlatform(item.batchJob.pageSocial.publisherPlatform.idPublisherPlatform, item.batchJob.pageSocial.internalId) }
                                    </div>
                                </>,
            "numAds": 			<>{ item.numAds }</>, 
            "keywords": 		<>{ (item.byBatch) ? "Batch" : "Manual" }</>, 
            "time": 			<>
                                    <div>{ timeExecuted.format("HH:mm") }</div>
                                    <div className="background">{ timeExecuted.format("DD/MM/YYYY") }</div>
                                </>, 
            "export-csv-view": 			<>
                                    <button 
                                        className="btn export-csv"
                                        onClick={() => getCSV(0, "123")}
                                    >
                                        Export CSV
                                    </button>
                                    <a 
                                        className="button view-details"
                                        href={`/batch-job-executed/${item.id}`}
                                    >
                                        View Job
                                    </a>
                                </>, 
        };
    });

    return {
        "header": ["ID", "Name", "Ads", "Time", "Keywords", ""],
        "content": data
    };
};

	
const changePagination = (page: number, limit: number): void => {

    ReduxService.action('GET_BATCH_JOB_EXECUTED_LIST', { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT })
};


export default {
    init: init,
    serializeData: serializeData,
    changePagination: changePagination,
};
