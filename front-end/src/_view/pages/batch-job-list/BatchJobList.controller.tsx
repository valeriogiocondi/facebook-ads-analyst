import React from 'react';

// MODEL
import BatchJobType from "../../../_model/types/BatchJobType";

// SERVICE
import RelayService from "../../../services/relay.service"
import ReduxService from '../../../services/redux.service';
import FacebookService from "../../../services/facebook.service"

// GRAPHQL
// import BatchJobListSelectMutationGraphQL from '../../../_model/relay/mutation/BatchJobListSelectMutation';
// import BatchJobListDeleteQueryGraphQL from '../../../_model/relay/mutation/BatchJobListDeleteQuery';
import AdsByBatchJobIdSelectQueryGraphQL from '../../../_model/relay/query/AdsByBatchJobIdSelectQuery';

// UTILS
import { exportCSV } from "../../../utils";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../../utils/const";


const init = (): any => ReduxService.action('GET_BATCH_JOB_LIST', { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT });

const serializeData = (list: BatchJobType[]): any => {
    
	const getCSV = (batchJobId: number, pageSocialInternalId: string) => {

		const params = {
			batchJobId: batchJobId,
		};

		RelayService.fetch(AdsByBatchJobIdSelectQueryGraphQL, params, (data: any) => {

				switch (data.exportCsvAdsByBatchJobId.code) {

                case 200: {

                    exportCSV("ads-list-" + pageSocialInternalId + "-by-batch-" + batchJobId + ".csv", data.exportCsvAdsByBatchJobId.payload);
                    break;
                }
                case 404: {

                    alert("Non sono presenti Ads per questo job");
                    break;
                }
                default: {

                    break;
                }
            }
        });
	}
    
	const fetchData = (job: any): void => {

		let data = {
			batch_job_id: 					job.id,
			page_social_id: 				job.pageSocial.id,
			search_page_ids: 				job.pageSocial.internalId,
			publisher_platforms: 		    job.pageSocial.publisherPlatform.idPublisherPlatform,
			ad_active_status: 			    job.adActiveStatus,
			ad_reached_countries: 	        job.adReachedCountries,
			ad_type: 						job.adType,
			impression_condition: 	        job.impressionCondition,
			search_terms: 					job.searchTerms,
			by_batch: 						0,
		};

        FacebookService.fetch(data)
            .then((result) => {

                // TODO
                // POPUP AVVENUTA CONFERMA
                
                alert(JSON.stringify(result));
                // this.setState({result: result});
		});
	}
    
    const data: any[] = list?.map((item: BatchJobType) => {

        if (!item) return [{}];

        return {
            "name-internalId": 	<>
                                    <div className="foreground">{ item.pageSocial.name }</div>
                                    <div className="background internal-id">{ item.pageSocial.internalId }</div>
                                </>,
            "internalId": 		<div className="num-ads text-center">
                                    { item.numAds }
                                </div>, 
            "time": 			<>
                                    <div>{ item.time }</div>
                                    <div className="background">Every day</div>
                                </>, 
            "keywords": 		<div className="search-keywords text-center">
                                    { (item.searchTerms) ? item.searchTerms : "--" }
                                </div>, 
            "button-getData": 	<div className="text-right">
                                    <button 
                                        className="btn export-csv"
                                        onClick={() => fetchData(item)}
                                    >
                                        GET DATA
                                    </button>
                                </div>, 
            "exportCSV": 		<div className="text-right">
                                    <button 
                                        className="btn export-csv"
                                        onClick={() => getCSV(item.id, item.pageSocial.internalId)}
                                    >
                                        Export CSV
                                    </button>
                                    <a 
                                        className="button view-details"
                                        href={`/batch-job/view/${item.id}`}
                                    >
                                        View / Edit
                                    </a>
                                </div>,
        };
    });

    return {
        "header": ["Name", "Ads", "Time", "Keywords", ""],
        "content": data
    };
};


// const deleteBatch = (id: number): void => {
		
//     if (window.confirm("Are you sure?")) {

//         /* 
//         * 	TODO	
//         *	request DTO
//         *
//         */
//         const data = { id: id };
        
// 		RelayService.fetch(BatchJobListDeleteQueryGraphQL, { params: data }, (data: any) => {

//             // TODO
//             // it's a SPA, get id and use data-binding
//             window.location.reload();
//         });
//     }
// };

	
const changePagination = (page: number, limit: number): void => {

    ReduxService.action('GET_BATCH_JOB_LIST', { page: page, limit: limit });
};


export default {
    init: init,
    serializeData: serializeData,
    changePagination: changePagination,
};
