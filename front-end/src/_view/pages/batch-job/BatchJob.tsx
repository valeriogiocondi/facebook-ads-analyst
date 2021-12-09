import React, { FunctionComponent, useEffect, useState } from 'react';

// REACT-ROUTER
import { Link, Redirect } from 'react-router-dom';

// MODEL
import BatchJobType from '../../../_model/types/BatchJobType';
import { AdsType } from '../../../_model/types/AdsType';

// CONTROLLER
import controller from './BatchJob.controller';

// REDUX
import reduxStore from '../../../_model/redux/redux-store';

// UTILS
import { utilities } from '../../../utils';

// COMPONENTS
import AdsListTable from '../../components/AdsListTable/AdsListTable';

// STYLE
import './BatchJob.less';
import BatchJobController from './BatchJob.controller';


type BatchJobProps = {
	match: any
}; 
const BatchJob: FunctionComponent<BatchJobProps> = (props: BatchJobProps) => {

	const [redirect, setRedirect] = useState<string>('');
	const [batchJob, setBatchJob] = useState<BatchJobType>();
	// TODO
	// create a type
	const [publisherPlatformList, setPublisherPlatformList] = useState<any>(null);
	const [activeStatusList, setActiveStatusList] = useState<any>(null);
	const [reachedCountriesList, setReachedCountriesList] = useState<any>(null);
	const [typeList, setTypeList] = useState<any>(null);
	const [impressionConditionList, setImpressionConditionList] = useState<any>(null);

	const [numAds, setNumAds] = useState<number>(0);
	const [adsList, setAdsList] = useState<AdsType>();
	
	const Template = utilities.getTemplate;
	const isBatchJobNew: boolean = props?.match?.params?.type === "new";

	useEffect(() => {
		
		// login check
		!utilities.isAuth(true) ?? setRedirect('login');

		// TODO - redux automation
		reduxStore.subscribe((x) => {
			setBatchJob(x?.batchJobReducer?.batchJob);
			setAdsList(x?.batchJobParamsReducer?.getBatchJobById?.adsList);
			setNumAds(x?.batchJobParamsReducer?.getBatchJobById?.adsList?.length);
		
			setPublisherPlatformList(x?.batchJobParamsReducer?.getPublisherPlatformList?.publisherPlatformList);
			setActiveStatusList(x?.batchJobParamsReducer?.getActiveStatusList?.activeStatusList);
			setReachedCountriesList(x?.batchJobParamsReducer?.getReachedCountriesList?.reachedCountriesList);
			setTypeList(x?.batchJobParamsReducer?.getTypeList?.typeList);
			setImpressionConditionList(x?.batchJobParamsReducer?.getImpressionConditionList?.impressionConditionList);
		});

		controller.init(isBatchJobNew, props?.match?.params?.id);
	} , []);
	
	const renderRedirect = (): JSX.Element => {

		const router = {};
		router['login'] = '/login';
		router['batch-job-list'] = '/batch-job-list';

		return redirect ? <Redirect to={{pathname: router[redirect]}} /> : <></>;
	};

	const saveTask = () => BatchJobController.saveTask(isBatchJobNew, batchJob, () => setRedirect('batch-job-list'));
	
	const send = (event): boolean => {

		event.preventDefault();

		const check = (value: number, message: string): boolean => {

			// TODO
			// Insert popup
			if (!value && value !== 0) {
				alert(message);
				return false;
			}
			return true;
		};

		if (!check(batchJob.pageSocial.publisherPlatform.idPublisherPlatform, "Please, select publisher_platofrm"))
			return false;

		if (!check(batchJob.adActiveStatus, "Please, select ad_active_status"))
			return false;

		if (!check(batchJob.adReachedCountries, "Please, select ad_reached_countries"))
			return false;
		
		if (!check(batchJob.adType, "Please, select ad_type"))
			return false;
		
		if (!check(batchJob.impressionCondition, "Please, select impression_condition"))
			return false;

		// if (!time) {
		// 	alert("Please, select time");
		// 	return false;
		// }

		saveTask();
		return true;
	}

	return (
		<Template type="page-detail" title="Batch Job">
			{ renderRedirect() }
			<div id="batch-scheduler-new-task">
				153080620724
				<section>
					<form className="form" onSubmit={(e) => send(e)}>
						<section>
							<div className="row">
								<div className="col-4 text-center field page-id">
									<div className="label">search_page_ids</div>
									<div className="text-center input-text">
										<input 
											type="text" 
											value={ batchJob?.pageSocial?.internalId }  
											onChange={(e) => setBatchJob({...batchJob, pageSocial: {...batchJob?.pageSocial, internalId: e.target.value} }) }
										/>
									</div>
								</div>
								<div className="col-4 text-center field page-name">
									<div className="label">page_name</div>
									<div className="text-center input-text">
										<input 
											type="text" 
											value={ batchJob?.pageSocial?.name } 
											readOnly
										/>
									</div>
								</div>
								<div className="col-4 text-center field">
									{/* 
										*	publisher_platform
										*	enum {FACEBOOK, INSTAGRAM, AUDIENCE_NETWORK, MESSENGER, WHATSAPP}
										*
										* 	Search for ads based on whether they appear on a particular platform such as Instagram or Facebook. 
										*	You can provide one platform or a comma separated list of platforms.
										*
									*/}
									<div className="label">publisher_platform</div>
									<div className="select">
										<select 
											// onChange={(e) => this.onChangeSelect("publisher-platform", e.target.value)}
											onChange={
												(e) => setBatchJob({
													...batchJob, 
													pageSocial: {
														...batchJob?.pageSocial, 
														publisherPlatform: {
															...batchJob?.pageSocial?.publisherPlatform,
															idPublisherPlatform: +e.target.value
														}
													}
												}) 
											}
										>
											<option value="" selected>--</option>
											{ 
												publisherPlatformList?.map((item) => { 	
	
													if (!isBatchJobNew && item.idPublisherPlatform == batchJob?.pageSocial?.publisherPlatform.idPublisherPlatform)
														return <option value={item.idPublisherPlatform} selected>{item.valuePublisherPlatform}</option>; 
														
													return <option value={item.idPublisherPlatform}>{item.valuePublisherPlatform}</option>; 
												})
											}
										</select>
									</div>
								</div>
							</div>
						</section>
						<section className="row">
							<div className="col field">
								{/* 
									*	ad_active_status
									*	enum {ACTIVE, ALL, INACTIVE}
									*
									* 	Search for ads based on the status. 
									* 	Defaults to ACTIVE for all ads that are eligible for delivery. 
									* 	Set INACTIVE for ads ineligible for delivery, and ALL for both types.
									*
								*/}
								<div className="label">ad_active_status</div>
								<div className="select">
									<select onChange={ (e) => { setBatchJob({ ...batchJob, adActiveStatus: +e.target.value }) } } >
										<option value="" selected>--</option>
										{
											activeStatusList?.map((item) => { 

												if (item.idActiveStatus == batchJob?.adActiveStatus)
													return <option value={item.idActiveStatus} selected>{item.valueActiveStatus}</option>; 
													
												return <option value={item.idActiveStatus}>{item.valueActiveStatus}</option>; 
											})
										}
									</select>
								</div>
							</div>
							<div className="col field">
								{/* 
									*	ad_reached_countries
									*	array<enum {BR, GB, US}>
									*
									*	Facebook delivered the ads in these countries. Provided as ISO country codes.
									* 
									* 	MANDATORY
									*
								*/}
								<div className="label">ad_reached_countries</div>
								<div className="select">
									<select onChange={ (e) => { setBatchJob({ ...batchJob, adReachedCountries: +e.target.value }) } } >
										<option value="" selected>--</option>
										{
											reachedCountriesList?.map((item) => { 

												if (item.idReachedCountries == batchJob?.adReachedCountries)
													return <option value={item.idReachedCountries} selected>{item.valueReachedCountries}</option>; 

												return <option value={item.idReachedCountries}>{item.valueReachedCountries}</option>; 
											})
										}
									</select>
								</div>
							</div>
							<div className="col field">
								{/* 
									*	ad_type
									*	enum {ALL, EMPLOYMENT_ADS, HOUSING_ADS, POLITICAL_AND_ISSUE_ADS, UNCATEGORIZED_ADS}
									*
									* 	Default value: "POLITICAL_AND_ISSUE_ADS"
									* 	The type of ad. We label either all returned ads as political or issue ads, 
									* 	or label ads for news related to politics or issues of political importance. 
									* 	See Facebook Ads Help Center, About ads related to politics or issues of national importance. 
									* 	We currently only support POLITICAL_AND_ISSUE_ADS.
									*
								*/}
								<div className="label">ad_type</div>
								<div className="select">
									<select onChange={ (e) => { setBatchJob({ ...batchJob, adType: +e.target.value }) } }
									>
										<option value="" selected>--</option>
									{
										typeList?.map((item) => { 

											if (item.idType == batchJob?.adType)
												return <option value={item.idType} selected>{item.valueType}</option>; 

											return <option value={item.idType}>{item.valueType}</option>; 
										})
									}
									</select>
								</div>
							</div>
							
							<div className="col field">
								{/* 
									* 	impression_condition
									* 	enum {
									* 		 HAS_IMPRESSIONS_LIFETIME, 
									* 		 HAS_IMPRESSIONS_YESTERDAY, 
									* 		 HAS_IMPRESSIONS_LAST_7_DAYS, 
									* 		 HAS_IMPRESSIONS_LAST_30_DAYS, 
									* 		 HAS_IMPRESSIONS_LAST_90_DAYS
									* 	}
									*
								*/}
								<div className="label">impression_condition</div>
								<div className="select">
									<select onChange={ (e) => { setBatchJob({ ...batchJob, impressionCondition: +e.target.value }) } } >
										<option value="" selected>--</option>
									{
										impressionConditionList?.map((item) => { 

											if (item.idImpressionCondition == batchJob?.impressionCondition)
												return <option value={item.idImpressionCondition} selected>{item.valueImpressionCondition}</option>; 

											return <option value={item.idImpressionCondition}>{item.valueImpressionCondition}</option>; 
										})
									}
									</select>
								</div>
							</div>
						</section>
						{/* 
						<section className="time text-center">
							<div className="field">
									* 	time
									* 	string
									* 
								<div className="label">time</div>
								<div className="select">
									<select onChange={(e) => this.onChangeSelect("time", e.target.value)}>
										<option value="" selected>--</option>
										{
											Object.values(TimeSchedulerEnu.map((item) => { 

												if (item === this.state.time)
													return <option value={item} selected>{item}</option>; 

												return <option value={item}>{item}</option>; 
											})
										}
									</select>
								</div>
							</div>
						</section>
						*/}
						<section className="search-terms">
							<div className="text-center field">
								{/* 
									* 	search_terms
									* 	string
									* 	
									* 	Default value: ""
									* 	The terms to search for in your query. 
									* 	We treat a blank space as a logical AND and search 
									* 	for both terms and no other operators. 
									* 	The limit of your string is 100 characters or less.
									* 
								*/}
								<div className="label">search_terms</div>
								<div className="text-center input-text width-100x">
									<input 
										type="text"
										className="text-center"
										placeholder="es1, es2, ..., esN"
										value={ batchJob?.searchTerms }
										// onChange={(e) => this.onChangeInputText("search-terms", e.target.value)}
										onChange={ (e) => { setBatchJob({ ...batchJob, searchTerms: e.target.value }) } }
									/>
								</div>
							</div>
						</section>
						<section className="text-center send">
							<input type="submit" value="SAVE" />
						</section>
					</form>
				</section>
				{
					() => {
						if (!isBatchJobNew) {
							return (
								<section>
									<AdsListTable adsList={ batchJob?.adsList } />
								</section>
							);
						}
					}
				}
			</div>
		</Template>
	);
};

export default BatchJob;
