import React from 'react';

// SERVICE
import ReduxService from '../../../services/redux.service';

// UTILS
import { exportCSV, socialUtils } from "../../../utils";
import moment from 'moment';


const init = (id: string): any => ReduxService.action('GET_ADS', { id: id });

const getCSV = (): void => alert("Function not implemented");

export default {
    getCSV: getCSV,
    init: init,
};
