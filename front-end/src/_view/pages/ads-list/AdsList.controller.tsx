import React from 'react';

// MODEL
import { AdsType } from "../../../_model/types/AdsType";

// SERVICE
import ReduxService from '../../../services/redux.service';

// UTILS
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../../utils/const";
import { exportCSV, socialUtils } from "../../../utils";
import moment from 'moment';


const init = (): any => ReduxService.action('GET_ADS_LIST', { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT });

const serializeData = (list: AdsType[]): any => {

    const getCSV = (id: number, pageSocialInternalId: string) => {
        
		alert("Add this function!");

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
    
    const data: any[] = list?.map((item: AdsType) => {
	
        if (!item) return {};
        
        const timeExecuted = moment(item.created, "YYYY-MM-DDTHH:mm:ss a");

        return {
        };
    });

    return {
        "header": ["ID", "Name", "Ads", "Time", "Keywords", ""],
        "content": data
    };
};

const changePagination = (page: number, limit: number, cb: Function) => {

    ReduxService.action('GET_ADS_LIST', { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT });
};

export default {
    serializeData: serializeData,
    changePagination: changePagination,
    init: init,
};
