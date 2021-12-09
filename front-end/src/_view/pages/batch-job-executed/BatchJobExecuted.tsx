import React, { FunctionComponent, useEffect, useState } from 'react';

// REACT-ROUTER
import { Link, Redirect } from 'react-router-dom';

// MODEL
import BatchJobExecutedType from '../../../_model/types/BatchJobExecutedType';

// CONTROLLER
import controller from './BatchJobExecuted.controller';

// REDUX
import reduxStore from '../../../_model/redux/redux-store';

// UTILS
import { socialUtils, utilities } from '../../../utils';
import moment from 'moment';

// COMPONENTS
import AdsListTable from '../../components/AdsListTable/AdsListTable';
import { AdsType } from '../../../_model/types/AdsType';

// STYLE
import { KeyboardBackspace } from '@material-ui/icons';
import './BatchJobExecuted.less';


type BatchJobExecutedProps = {
	match: any
}; 
const BatchJobExecuted: FunctionComponent<BatchJobExecutedProps> = (props: BatchJobExecutedProps) => {

	const [redirect, setRedirect] = useState<string>('');
	const [batchJobExecuted, setBatchJobExecuted] = useState<BatchJobExecutedType>();
	const [numAds, setNumAds] = useState<number>(0);
	const [adsList, setAdsList] = useState<AdsType[]>();


	const Template = utilities.getTemplate;

	useEffect(() => {
		
		// login check
		!utilities.isAuth(true) ?? setRedirect('login');

		// TODO - redux automation
		reduxStore.subscribe((x) => {
			// setBatchJobList(x?.batchJobListReducer?.data?.getBatchJobList?.batchJobList);
			// setBatchJobCount(x?.batchJobListReducer?.data?.getBatchJobList?.pageSocialCount);

			setBatchJobExecuted(x?.batchJobExecutdReducer?.data?.getBatchJobExecutedById?.batchJobExecuted);
			setNumAds(x?.batchJobExecutdReducer?.data?.getBatchJobExecutedById?.numAds);
			setAdsList(x?.batchJobExecutdReducer?.data?.getBatchJobExecutedById?.adsList);
		});
		
		controller.init(+props.match.params.id);
		// controller.init(+props.match.params.id, (data) => {

		// 	setBatchJobExecuted(data.getBatchJobExecutedById?.batchJobExecuted);
		// 	setNumAds(data.getBatchJobExecutedById?.numAds);
		// 	setAdsList(data.getBatchJobExecutedById?.adsList);
		// });
	}, []);

	const renderRedirect = (): JSX.Element => {

		const router = {};
		router['login'] = '/login'

		return redirect ? <Redirect to={{pathname: router[redirect]}} /> : <></>
	};

	const execTime = batchJobExecuted.timeExecuted ?? batchJobExecuted.created;
	const execType = (batchJobExecuted.byBatch) ?  "Batch" : "Manual";
	const hrefSocial = 
		socialUtils.getLinkSocialPlatform(
			batchJobExecuted.batchJob.pageSocial.publisherPlatform.idPublisherPlatform, 
			batchJobExecuted.batchJob.pageSocial.internalId
		);

	return (
		<Template type="page-detail" title="Page List" >
			{ (redirect ? <Redirect to={{pathname: "/login"}} /> : <></>)}
			{ renderRedirect() }
			<div id="batch-job-executed">
				<div className="container">
					<header>
						<Link to="/batch-job-executed-list/">
							<KeyboardBackspace />
						</Link>
						Batch Job Executed
					</header>
					<section>
						<header>
							<div className="id">#{ batchJobExecuted.id }</div>
							<div className="info">
								<div className="execution-info">
									<div>
										<div className="label">Exec Type:</div>
										<div className="value">{ execType }</div>
									</div>
									<div>
										<div className="label">Exec Time:</div>
										<div className="value">{ moment(execTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }</div>
									</div>
									<div>
										<div className="label">Num Ads:</div>
										<div className="value">{ batchJobExecuted.numAds ?? 0 }</div>
									</div>
								</div>
								<div className="page-info">
									<div>
										<div className="label">Page Social:</div>
										<div className="value">{ batchJobExecuted.batchJob.pageSocial.name }</div>
									</div>
									<div>
										<div className="label">Social Platform:</div>
										<div className="value">{ batchJobExecuted.batchJob.pageSocial.publisherPlatform.valuePublisherPlatform }</div>
									</div>
									<div>
										<div className="label">Tot Ads:</div>
										<div className="value">{ batchJobExecuted.batchJob.numAds ?? 0 }</div>
									</div>
								</div>
								<div className="batch-info">
									<div>
										<button className="link export-csv">Export CSV</button>
									</div>
									<div>
										<a className="link" href={`/batch-job/view/${batchJobExecuted.batchJob.id}`}>View Batch Job</a>
									</div>
									<div>
										<a className="link" href={ hrefSocial } target="_blank">
											View on { batchJobExecuted.batchJob.pageSocial.publisherPlatform.valuePublisherPlatform }
										</a>
									</div>
								</div>
							</div>
						</header>
						<section>
							<AdsListTable adsList={ batchJobExecuted.adsList } />
						</section>
					</section>
				</div>
			</div>
		</Template>
	);
};

export default BatchJobExecuted;
