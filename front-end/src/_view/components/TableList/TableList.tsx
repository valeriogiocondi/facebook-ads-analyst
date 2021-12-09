import React, { FunctionComponent } from 'react';

// MODEL
import TableListType from '../../../_model/types/TableList.type';

// CONTROLLER
import controller from './TableList.controller';

// STYLE
import './TableList.less';


const TableListComponent: FunctionComponent<TableListType> = (props: TableListType) => controller.getTable(props);

export default TableListComponent;