import React from 'react';

// MODEL
import PageSocialType from "../../../_model/types/PageSocialType";

// SERVICE
import GraphqlService from "../../../services/graphql.service"
import ReduxService from '../../../services/redux.service';
import MessageQueue from '../../../services/messageQueue.service'

// GRAPHQL
import AdsBySocialPageIdSelectQueryGraphQL from '../../../_model/relay/query/AdsBySocialPageIdSelectQuery';

// UTILS
import { exportCSV, socialUtils } from "../../../utils";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../../utils/const";


let openDialog: Function;

const init = (): any => ReduxService.action('GET_PAGE_LIST', { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT });

const serializeData = (list: PageSocialType[]): any => {

    const getCSV = (pageSocialInternalId: string) => {

        const fetchCSV: Function = () => { 

            const params = {
                pageInternalId: pageSocialInternalId,
            };

            GraphqlService
                .fetch(AdsBySocialPageIdSelectQueryGraphQL, params, (data: any) => {
    
                    switch (data.exportCsvAdsBySocialPageId.code) {
    
                        case 200: {
    
                            exportCSV("ads-list-" + pageSocialInternalId + ".csv", data.exportCsvAdsBySocialPageId.payload);
                            break;
                        }
                        case 404: {
    
                            alert("Non sono presenti Ads per questa pagina");
                            break;
                        }
                        default: {
    
                            break;
                        }
                    }
            });
        };

        MessageQueue.publish('DIALOG_CALLBACK', fetchCSV);
    };
    
    const data: any[] = list?.map((item: PageSocialType) => {

        if (!item) return [{}];

        return {
            "id": 					item.name,
            "name": 				<div className="text-center">{ item.numAds }</div>, 
            "publisherPlatform":	
                                    <div>
                                        <div>
                                            <a 
                                                className="link"
                                                href={ socialUtils.getLinkSocialPlatform(item.publisherPlatform.idPublisherPlatform, item.internalId) }
                                                target="_blank"
                                            >
                                                View on social
                                            </a>
                                        </div>
                                        <div className="background">{ item.publisherPlatform.valuePublisherPlatform }</div> 
                                    </div>, 
            "view": 				<div>
                                        <div>Last update</div>
                                        <div className="background">08/01/2021</div>
                                    </div>, 
            "exportCSV": 			
                                    <div style={{ textAlign: "right" }}>
                                        <button 
                                            className="btn export-csv"
                                            onClick={() => getCSV(item.internalId)}
                                        >
                                            Export CSV
                                        </button>
                                        <a 
                                            className="button view-details"
                                            href={`page-social/${item.id}/${item.internalId}`}
                                        >
                                            View
                                        </a>
                                    </div>,
        };
    });

    return {
        "header": ["Name", "Ads", "", "", ""],
        "content": data
    };
};

const changePagination = (page: number, limit: number): void => {

    ReduxService.action('GET_PAGE_LIST', { page: page, limit: limit });
};

export default {
    serializeData: serializeData,
    changePagination: changePagination,
    init: init,
};
