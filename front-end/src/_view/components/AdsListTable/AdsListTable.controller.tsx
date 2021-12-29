import React, { FunctionComponent } from 'react';

// MODEL
import { AdsSpendType, AdsType } from '../../../_model/types/AdsType';

// SERVICE
import GraphqlService from "../../../services/graphql.service"

// GRAPHQL
import PageSocialListSelectMutationGraphQL from '../../../_model/relay/mutation/PageSocialListSelectMutation';

// UTILS
import moment from 'moment'; 


const serializeData = (list: AdsType[]): any => {

	let data: any[] = [];

	data = list?.map((item: AdsType) => {

		if (!item) return {};

		const getAdsSpend = (x: AdsSpendType): string => (x.lowerBound && x.upperBound) ? x.lowerBound+" - "+x.upperBound : "--";
		
		return {
			"id": 			<>
								<div className="publisher-platforms">
									{ item.publisherPlatforms.reduce((tot: string, curr: string) => tot = ", "+curr ) }
								</div>
								<div className="background">{ item.id }</div>
							</>,
			"spend": 		<div className="text-center">{ getAdsSpend(item.spend) }</div>, 
			"title": 		<>
								<div className="ads-title">
									{ item.adCreativeLinkTitle }
								</div>
								<div>
									<a 
										href={ item.adSnapshotUrl }
										target="_blank"
									> 
										Snapshot URL
									</a>
								</div>
							</>,
			"createdTime": 	<>
								<div className="foreground">Created time</div>
								<div className="background created-time">
									{ moment(item.adCreationTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
								</div>
							</>, 
			"startTime": 	<>
								<div className="foreground">Start time</div>
								<div className="background start-time">
									{ moment(item.adDeliveryStartTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
								</div>
							</>, 
			"viewAds": 		<>
								<a className="button view-details" href={`/ads/${item.id}`}> View Ads </a>
							</>,
		};
	});

	return {
		"header": ["ID", "Spend", "Title", "", "", ""],
		"content": data
	};
};

const changePagination = (page: number, limit: number, cb: Function) => {

    const params = { page: page, limit: limit };
    GraphqlService.fetch(PageSocialListSelectMutationGraphQL, params, (data: any) => cb(data));
};


export default {
    serializeData: serializeData,
    changePagination: changePagination,
};
