import React from 'react';

// SERVICE
import ReduxService from '../../../services/redux.service';

// UTILS
// import { exportCSV, socialUtils } from "../../../utils";


const init = (id: string, internalId: string): any => ReduxService.action('GET_PAGE', { pageID: id, pageInternalID: internalId });

const getCSV = (): void => alert("Function not implemented");

const changePagination = (page: number, limit: number, cb: Function) => {

    // Ads
};

export default {
    getCSV: getCSV,
    changePagination: changePagination,
    init: init,
};
