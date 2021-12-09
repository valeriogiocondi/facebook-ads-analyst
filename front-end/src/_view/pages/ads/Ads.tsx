import React, { FunctionComponent, useEffect, useState } from 'react';

// REACT-ROUTER
import { Redirect } from 'react-router-dom';

// MODEL
import FacebookAds from '../../../_model/types/facebook-ads-objects/facebook-ads-class';
// import HttpResponse from '../../../_model/types/http-response';
// import { DemographicDistributionType, DemographicDistributionPersonType, DemographicDistributionPersonDataType } from '../../../_model/types/facebook-ads-objects/demographic-distribution-type';

// CONTROLLER
import controller from './Ads.controller';

// REDUX
import reduxStore from '../../../_model/redux/redux-store';

// UTILS
import { utilities } from '../../../utils';
import moment from 'moment'; 

// STYLE
import './Ads.less';
import { KeyboardBackspace } from '@material-ui/icons';


type AdsProps = {
	match: any,
}; 
const Ads: FunctionComponent<AdsProps> = (props: AdsProps) => {

	const [redirect, setRedirect] = useState<string>('');
	const [ads, setAds] = useState<FacebookAds>();
	
	const Template = utilities.getTemplate;

	useEffect(() => {
		
		// login check
		!utilities.isAuth(true) ?? setRedirect('login');

		// TODO - redux automation
		reduxStore.subscribe((x) => {
			setAds(x?.adsReducer?.data?.adsById);
		});
		
		controller.init(props.match.params.id);
	} , []);
	
	const renderRedirect = (): JSX.Element => {

		const router = {};
		router['login'] = '/login'

		return redirect ? <Redirect to={{pathname: router[redirect]}} /> : <></>
	};
	
	return (
		<Template type="page-detail" title="Ads">
			{ renderRedirect() }
			<div id="ads" className="main">
				<div className="container">
					<header>
						<a href="/">
							<KeyboardBackspace />
						</a>
					</header>
					<section>
						<div className="row">
							<div 
								id="photo"
								className="col"
							>
								<p className="text-not-available">
									NOT AVAILABLE
									<a href={ads.adSnapshotUrl} target="_blank">Snapshot URL</a>
								</p>
							</div>
							<div className="col-8">
								<header className="title">
									<span className="label"> TITLE </span>
									<h1> {ads.adCreativeLinkTitle} </h1>
								</header>
								<section>
									<div className="description">
										<span className="label"> DESCRIPTION </span>
										<p className="text-justify"> {ads.adCreativeBody} </p>
									</div>
								</section>
								<section>
									<section>
										<div className="field platform">
											<div className="label">
												PLATFORM
											</div>
											<div className="value">
												{ads.publisherPlatforms}
											</div>
										</div>
								</section>
									<section>
										<div className="field">
											<div className="label">
												PAGE NAME
											</div>
											<div className="">
												<a
													className="link" 
													href={"https://www.facebook.com/profile.php?id="+ads.pageId} 
													target="_blank"
												>
													{ads.pageName}
												</a>
											</div>
										</div>
										<div className="field">
											<div className="label">
												FUNDING ENTITY
											</div>
											<div className="">
												{ads.fundingEntity}
											</div>
										</div>
									</section>
									<section>
										<div className="field">
											<div className="label">
												CREATION TIME
											</div>
											<div className="">
												{ moment(ads.adCreationTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY - hh:mm")}
											</div>
										</div>
										<div className="field">
											<div className="label">
												DELIVERY START_TIME
											</div>
											<div className="">
												{ moment(ads.adDeliveryStartTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY - hh:mm")}
											</div>
										</div>
									</section>
									<section>
										<div className="field">
											<div className="label">
												ID ADS
											</div>
											<div className="">
												<a 
													className="link no-bold"
													href={"https://www.facebook.com/ads/archive/render_ad/?"+ads.id}
													target="_blank"
												>
													#{ads.id}
												</a>
											</div>
										</div>
									</section>
									<section>
										<div className="field">
											<div className="label">
												LINK CAPTION
											</div>
											<div className="">
												<a 
													className="link"
													href={ads.adCreativeLinkCaption}
													target="_blank"
												>
													{ads.adCreativeLinkCaption}
												</a>
											</div>
										</div>
										<div className="field">
											<div className="label">
												LINK DESCRIPTION
											</div>
											<div className="">
												{ads.adCreativeLinkDescription}
											</div>
										</div>
										<div className="field">
											<div className="label">
												LINK TITLE
											</div>
											<div className="">
												{ads.adCreativeLinkTitle}
											</div>
										</div>
									</section>
									<section>
										<div className="field font-weight-700">
											<div className="label">
												BUDGET RANGE
											</div>
											<div className="value">
												{ads.spend.lowerBound} - {ads.spend.upperBound} {ads.currency}
											</div>
										</div>
									</section>
									<section>
										<div className="field font-weight-700">
											<div className="label">
												IMPRESSIONS
											</div>
											<div className="value">
												{ads.impressions.lowerBound} - {ads.impressions.upperBound}
											</div>
										</div>
									</section>
								</section>
							</div>
						</div>
					</section>
					<section className="distribuzione-demografica">
						{/* 
						<BarChart 
							demographicDistributionWoman={ads.demographicDistribution.female}
							demographicDistributionMan={ads.demographicDistribution.male}
						/>
						*/}
					</section>
					<section>
							<div>
								- {JSON.stringify(ads.regionDistribution)}
							</div>
					</section>
				</div>
			</div>
		</Template>
	);
}; 

export default Ads;
