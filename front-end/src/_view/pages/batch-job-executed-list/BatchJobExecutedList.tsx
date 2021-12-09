import React, { FunctionComponent, useEffect, useState } from 'react';

// REACT-ROUTER
import { Link, Redirect } from 'react-router-dom';

// MODEL
import BatchJobExecutedType from '../../../_model/types/BatchJobExecutedType';

// CONTROLLER
import controller from './BatchJobExecutedList.controller';

// REDUX
import reduxStore from '../../../_model/redux/redux-store';

// UTILS
import { utilities } from '../../../utils';

// COMPONENTS
import TableList from  '../../components/TableList/TableList';

// STYLE
import './BatchJobExecutedList.less';


const BatchJobsExecutedList: FunctionComponent = () => {

	const [redirect, setRedirect] = useState<string>('')
	const [batchJobExecutedList, setBatchJobExecutedList] = useState<BatchJobExecutedType[]>()
	const [batchJobExecutedCount, setBatchJobExecutedCount] = useState<number>(0)
	
	const Template = utilities.getTemplate;

	useEffect(() => {
		
		// login check
		!utilities.isAuth(true) ?? setRedirect('login');

		// TODO - redux automation
		reduxStore.subscribe((x) => {
			setBatchJobExecutedList(x?.batchJobExecutedListReducer?.data?.getBatchJobExecutedList?.batchJobExecutedList);
			setBatchJobExecutedCount(x?.batchJobExecutedListReducer?.data?.getBatchJobExecutedList?.batchJobExecutedCount);
		});

		controller.init();
	}, []);

	const renderRedirect = (): JSX.Element => {

		const router = {};
		router['login'] = '/login'

		return redirect ? <Redirect to={{pathname: router[redirect]}} /> : <></>
	};

	const changePageHandler: Function = (page: number, limit: number) => controller.changePagination(page, limit);

	return (
		<Template type="page-list" title="Batch Job Executed List">
			{ renderRedirect() }
			<section id="batch-job-executed-list">
				<TableList 
					data={ controller.serializeData(batchJobExecutedList) }
					totalElement={ batchJobExecutedCount }
					numElementPage={ 10 }
					changePageHandler={ changePageHandler }
				/>
			</section>
		</Template>
	);
};

export default BatchJobsExecutedList;
