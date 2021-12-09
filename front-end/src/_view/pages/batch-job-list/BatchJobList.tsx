import React, { FunctionComponent, useEffect, useState } from 'react';

// REACT-ROUTER
import { Link, Redirect } from 'react-router-dom';

// MODEL
import BatchJobType from '../../../_model/types/BatchJobType';

// CONTROLLER
import controller from './BatchJobList.controller';

// REDUX
import reduxStore from '../../../_model/redux/redux-store';

// UTILS
import { utilities } from '../../../utils';

// COMPONENTS
import TableList from  '../../components/TableList/TableList';

// STYLE
import './BatchJobList.less';


const BatchJobList: FunctionComponent = () => {

	const [redirect, setRedirect] = useState<string>('');
	const [batchJobList, setBatchJobList] = useState<BatchJobType[]>();
	const [batchJobCount, setBatchJobCount] = useState<number>(0);
	
	const Template = utilities.getTemplate;

	useEffect(() => {
		
		// login check
		!utilities.isAuth(true) ?? setRedirect('login');
		
		// TODO - redux automation
		reduxStore.subscribe((x) => {
			setBatchJobList(x?.batchJobListReducer?.data?.getBatchJobList?.batchJobList);
			setBatchJobCount(x?.batchJobListReducer?.data?.getBatchJobList?.pageSocialCount);
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
		<Template type="page-list" title="Batch Job List">
			{ renderRedirect() }
			<section id="batch-job-list">
				<header className="text-right">
					<Link to="/batch-job/new" className="button">+ NEW TASK</Link>
				</header>
				<section>
					<TableList 
						data={ controller.serializeData(batchJobList) }
						totalElement={ batchJobCount }
						numElementPage={ 10 }
						changePageHandler={ changePageHandler }
					/>
				</section>
			</section>
		</Template>
	);
};

export default BatchJobList;
