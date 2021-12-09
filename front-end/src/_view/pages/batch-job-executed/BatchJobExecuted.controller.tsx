import React from 'react';

// MODEL
// import BatchJobExecutedType from "../../../_model/types/BatchJobExecutedType";

// SERVICE
import RelayService from "../../../services/relay.service"
import ReduxService from '../../../services/redux.service';

// GRAPHQL
import BatchJobExecutedSelectQueryGraphQL from '../../../_model/relay/query/BatchJobExecutedSelectQuery';
// import AdsBySocialPageIdSelectQueryGraphQL from '../../../_model/relay/query/AdsBySocialPageIdSelectQuery';

// // MISCELLANEOUS
// import { exportCSV, socialUtils } from "../../../utils";


const init = (id: number): any => ReduxService.action('GET_BATCH_JOB_EXECUTED', { id: id });

const changePagination = (page: number, limit: number, cb: Function) => {

    // Ads
};

export default {
    changePagination: changePagination,
    init: init,
};
