import React, { FunctionComponent, useEffect, useState } from 'react';

// REACT-ROUTER
import { Redirect } from 'react-router-dom';

// MODEL
import PageSocialType from '../../../_model/types/PageSocialType';
import { AdsType } from '../../../_model/types/AdsType';

// CONTROLLER
import controller from './PageSocial.controller';

// REDUX
import reduxStore from '../../../_model/redux/redux-store';

// UTILS
import { socialUtils, utilities } from '../../../utils';

// COMPONENTS
import AdsListTable from '../../components/AdsListTable/AdsListTable';

// STYLE
import './PageSocial.less';


type PageSocialProps = {
	match: any
}; 
const PageSocial: FunctionComponent<PageSocialProps> = (props: PageSocialProps) => {

	const [redirect, setRedirect] = useState<string>('');
	const [pageSocial, setPageSocial] = useState<PageSocialType>();
	const [adsList, setAdsList] = useState<AdsType[]>();
	
	const Template = utilities.getTemplate;

	useEffect(() => {
		
		// login check
		!utilities.isAuth(true) ?? setRedirect('login');

		// TODO - redux automation
		reduxStore.subscribe((x) => {
			setPageSocial(x?.pageReducer?.getPageSocial?.pageSocial);
			setAdsList(x?.pageReducer?.getPageSocial?.adsList);
		});

		controller.init(props.match.params.id, props.match.params.internalID);
		// controller.init(props.match.params.id, (data) => {

		// 	setPageSocial(data?.getPageSocial?.pageSocial);
		// 	setAdsList(data?.getPageSocial?.adsList);
		// });
	} , []);
	
	const renderRedirect = (): JSX.Element => {

		const router = {};
		router['login'] = '/login'

		return redirect ? <Redirect to={{pathname: router[redirect]}} /> : <></>
	};

	const hrefSocial = pageSocial ? socialUtils.getLinkSocialPlatform(pageSocial?.publisherPlatform.idPublisherPlatform, pageSocial?.internalId) : '';

	return (
		<Template type="page-detail" title="Page Social">
			{ renderRedirect() }
			<div id="page-social">
				<header>
					{/* <div>{ pageSocial?.internalId }</div> */}
					<div>
						<div className="label">Name: </div>
						<div className="value">{ pageSocial?.name }</div>
					</div>
					<div>
						<div className="label">Social Platform: </div>
						<div className="value">{ pageSocial?.publisherPlatform.valuePublisherPlatform }</div>
					</div>
					<div>
						<div className="label">Total Ads: </div>
						<div className="value">{ pageSocial?.numAds ?? 0 }</div>
					</div>
					<div>
						<a className="link" href={ hrefSocial } target="_blank">
							View on { pageSocial?.publisherPlatform.valuePublisherPlatform }
						</a>
					</div>
				</header>
				<section>
					<AdsListTable adsList={ adsList } />
				</section>
			</div>
		</Template>
	);
}; 

export default PageSocial;
