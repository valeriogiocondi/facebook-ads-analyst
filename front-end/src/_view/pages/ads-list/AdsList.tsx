import React, { Fragment, FunctionComponent, FunctionComponentFactory, useEffect, useState } from 'react';

// ROUTER
import { Link, Redirect } from 'react-router-dom'

// MODEL
import { AdsType } from '../../../_model/types/AdsType';
// import FacebookAds from '../../../_model/types/facebook-ads-objects/facebook-ads-class';
// import HttpResponse from '../../../_model/types/http-response';

// CONTROLLER
import controller from './AdsList.controller';

// UTILS
import { utilities } from '../../../utils';

// GRAPHQL RELAY
import RelayRenderer from '../../relay/RelayRenderer';
import queryGraphQL from '../../../_model/relay/query/AdsListSelectQuery';

// REDUX
import reduxStore from '../../../_model/redux/redux-store';

// COMPONENTS
import TableList from  '../../components/TableList/TableList';

// STYLE
import './AdsList.less';


type AdsListProps = {
	match: any,
};

const AdsListComponent: FunctionComponent = (props: AdsListProps) => {

	const [redirect, setRedirect] = useState<string>('');
	const [adsList, setAdsList] = useState<AdsType[]>();
	const [adsCount, setAdsCount] = useState<number>(0);
	
	const Template = utilities.getTemplate;

	useEffect(() => {
		
		// login check
		!utilities.isAuth(true) ?? setRedirect('login');

		// TODO - redux automation
		reduxStore.subscribe((x) => {
			setAdsList(x?.adsListReducer?.data?.adsList);
			// TODO
			setAdsCount(0);
		});
		
		controller.init();
	}, []);
	
	const renderRedirect = (): JSX.Element => {

		const router = {};
		router['login'] = '/login'

		return redirect ? <Redirect to={{pathname: router[redirect]}} /> : <></>
	};

	const changePageHandler: Function = (page: number, limit: number) => {

		controller.changePagination(page, limit, data => {

			// setBatchJobExecutedList(data.batchJobExecutedList);
			// setBatchJobExecutedCount(data.batchJobExecutedCount);
		});
	};

	return (
		<Template type="page-list" title="Page List">
			{ renderRedirect() }
			<section id="page-social-list">
				<TableList 
					data={ controller.serializeData(adsList) }
					totalElement={ adsCount }
					numElementPage={ 10 }
					changePageHandler={ changePageHandler }
				/>
			</section>
		</Template>
	);
};

class AdsList extends React.PureComponent<AdsListProps, {}> {

	constructor(props: AdsListProps) {
    
		super(props);
		this.state = {};
    }

    componentDidMount() {

    }
        
	render() {
		
		return (
			<Fragment>
				<RelayRenderer
					query={ queryGraphQL }
					params={
						{
							limit: 10,
							page: 1,
						}
					} 
				>
					<AdsListContent body="" />
				</RelayRenderer>
			</Fragment>
		);
    }
}


type AdsListContentProps = {
	body: any
};

class AdsListContent extends React.PureComponent<AdsListContentProps, {}> {

	constructor(props: AdsListContentProps) {
    
		super(props);
		this.state = {};
    }

	render() {
		
		return (
			<Fragment>
				<div id="home" className="main">
					<div className="container">
						<header>
							<div>
								<h1>Home</h1>
							</div>
						</header>
						<section id="ads-list">
							<ul className="list">
								{ this.props.body.adsList.map(item => { return <AdsListItem ads={ item } /> }) }
							</ul>
						</section>
					</div>
				</div>
			</Fragment>
		);
    }
}


type AdsListItemProps = {
	ads: any
}

class AdsListItem extends React.PureComponent<AdsListItemProps, {}> {

	constructor(props: AdsListItemProps) {
    
		super(props);
		this.state = {}
    }
	
	/* 
	 *	TODO
	 *	Use MomentJS
	 *	
	 */
	setDateFormat(milliseconds: string): string {

		let date = new Date(null);
		date.setMilliseconds(parseInt(milliseconds));

		console.log(date.toISOString().substr(0, 10));

		let dateStr = date.toISOString().substr(0, 10).split('-');
		let timeStr = date.toISOString().substr(11, 16).split(':');
		
		return	dateStr[2] + "/" +
			 	dateStr[1] + "/" +
				 dateStr[0] 
				 + " - " +
			 	timeStr[0] + ":" +
			 	timeStr[1]
		;	
	}

	render() {
		
		return (
			<Fragment>
				<li id={this.props.ads._id}>
					<Link 
						className="row no-underline"
						to={"/ads/" + this.props.ads._id}
					>
						<div className="col-3">
							<div className="row">
								<div className="d-inline-block">
									<div 
										className="profile-picture"
										style={{backgroundImage: "url('./images/icons/facebook.png')"}}
									></div>
								</div>
								<div className="d-inline-block">
									<div className="page-name"> {this.props.ads.pageName} </div>
									<div className="date"> {this.setDateFormat(this.props.ads.adCreationTime) }</div>
								</div>
							</div>
						</div>
						<div className="col-8">
							<div className="title"> {this.props.ads.adCreativeLinkTitle} </div>
							<div className="description"> {this.props.ads.adCreativeBody} </div>
						</div>
					</Link>
				</li>
			</Fragment>
		);
    }
}

export default AdsList;
// export default AdsListComponent;