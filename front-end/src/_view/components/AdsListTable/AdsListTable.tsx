import React, { Fragment, FunctionComponent, useState } from 'react';

// MODEL
import { AdsType, AdsSpendType } from '../../../_model/types/AdsType';

// CONTROLLER
import controller from './AdsListTable.controller';

// UTILS
import moment from 'moment'; 

// COMPONENTS
import TableList from '../TableList/TableList';

// STYLE
import './AdsListTable.less';


type AdsListTableProps = {
	adsList: AdsType[]
}

const AdsListTableComponent: FunctionComponent<AdsListTableProps> = (props: AdsListTableProps) => {

	const [adsList, setAdsList] = useState<AdsType[]>();
	const [adsCount, setAdsCount] = useState<number>(0);

	const changePageHandler: Function = (page: number, limit: number) => {

		controller.changePagination(page, limit, data => {

			setAdsList(data.adsList);
			setAdsCount(data.adsCount);
		});
	};

	const getAdsSpend = (x: AdsSpendType): string => (x.lowerBound && x.upperBound) ? x.lowerBound+" - "+x.upperBound : "--";

	return (
		<div className="ads-list-component">
			<div className="custom-table">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th className="text-center">Spend</th>
							<th>Title</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							adsList?.map((item: AdsType, i: number) => {
								return (
									<tr
										key={`ads-${i+1}`}
									>
										<td>
											<div className="publisher-platforms">
												{ item.publisherPlatforms.reduce((tot: string, curr: string) => tot = ", "+curr ) }
											</div>
											<div className="background">{ item.id }</div>
										</td>
										<td className="text-center"> { getAdsSpend(item.spend) } </td>
										<td>
											<div className="ads-title">
												{ item.adCreativeLinkTitle }
											</div>
											<div>
												<a href={ item.adSnapshotUrl } target="_blank"> Snapshot URL </a>
											</div>
										</td>
										<td>
											<div className="foreground">Created time</div>
											<div className="background created-time">
												{ moment(item.adCreationTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
											</div>
										</td>
										<td>
											<div className="foreground">Start time</div>
											<div className="background start-time">
												{ moment(item.adDeliveryStartTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
											</div>
										</td>
										<td>
											<a className="button view-details" href={`/ads/${item.id}`}> View Ads </a>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			<TableList 
				 data={ controller.serializeData(adsList) }
				 totalElement={ adsCount }
				 numElementPage={ 10 }
				changePageHandler={ controller.changePagination }
			/>
		</div>
	);
};


// type AdsListTableState = {
// }
// class AdsListTable extends React.PureComponent<AdsListTableProps, AdsListTableState> {

// 	constructor(props: AdsListTableProps) {
    
// 		super(props);
// 		this.state = {
// 			batchJob: null,
// 		}
// 	}

// 	private serializeData = (): any => {

// 		let data: any[] = [];

// 		data = this.state.batchJobExecutedList?.map((item: BatchJobExecutedType) => {
	
// 			if (!item) return {};

// 			const getAdsSpend = (x: AdsSpendType): string => {
			
// 				return (x.lowerBound && x.upperBound) ? x.lowerBound+" - "+x.upperBound : "--";
// 			};
			
// 			return {
// 				"id": 								<>
// 														<div className="publisher-platforms">
// 															{ item.publisherPlatforms.reduce((tot: string, curr: string) => tot = ", "+curr ) }
// 														</div>
// 														<div className="background">{ item.id }</div>
// 													</>,
// 				"spend": 							<div className="text-center">{ getAdsSpend(item.spend) }</div>, 
// 				"title": 							<>
// 														<div className="ads-title">
// 															{ item.adCreativeLinkTitle }
// 														</div>
// 														<div>
// 															<a 
// 																href={ item.adSnapshotUrl }
// 																target="_blank"
// 															> 
// 																Snapshot URL
// 															</a>
// 														</div>
// 													</>, 
				
// 				"createdTime": 						<>
// 														<div className="foreground">Created time</div>
// 														<div className="background created-time">
// 															{ moment(item.adCreationTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
// 														</div>
// 													</>, 
// 				"startTime": 						<>
// 														<div className="foreground">Start time</div>
// 														<div className="background start-time">
// 															{ moment(item.adDeliveryStartTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
// 														</div>
// 													</>, 
// 				"viewAds": 							<>
// 														<a className="button view-details" href={`/ads/${item.id}`}> View Ads </a>
// 													</>,
// 			};
// 		});

// 		return {
// 			"header": ["ID", "Spend", "Title", "", "", ""],
// 			"content": data
// 		};
// 	}

// 	private changePagination = (page: number, limit: number) => {

// 		const list: AdsType[] = [];
// 		const args = { params: { page: page, limit: limit } };
		
// 		commitMutation(
// 			environment,
// 			{
// 				mutation: BatchJobExecutedListSelectMutationGraphQL,
// 				variables: { limit: 10, page: 1 },
// 				// variables: { params: data },
// 				onCompleted: (response) => {
					
// 					// TODO
// 					// Create a new type for Query and Mutation
// 					this.setState({ 
// 						batchJobExecutedCount: response.getBatchJobExecutedList.batchJobExecutedCount,
// 						batchJobExecutedList: response.getBatchJobExecutedList.batchJobExecutedList,
// 					});
// 				},
// 			},
// 		);
// 	};

// 	render() {

// 		const getAdsSpend = (x: AdsSpendType): string => {
			
// 			return (x.lowerBound && x.upperBound) ? x.lowerBound+" - "+x.upperBound : "--";
// 		};

// 		return (
// 			<div className="ads-list-component">
// 				<div className="custom-table">
// 					<table>
// 						<thead>
// 							<tr>
// 								<th>ID</th>
// 								<th className="text-center">Spend</th>
// 								<th>Title</th>
// 								<th></th>
// 								<th></th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							{
// 								this.props.adsList?.map((item: AdsType, i: number) => {
// 									return (
// 										<tr
// 											key={`ads-${i+1}`}
// 										>
// 											<td>
// 												<div className="publisher-platforms">
// 													{ item.publisherPlatforms.reduce((tot: string, curr: string) => tot = ", "+curr ) }
// 												</div>
// 												<div className="background">{ item.id }</div>
// 											</td>
// 											<td className="text-center">
// 												{ getAdsSpend(item.spend) }
// 											</td>
// 											<td>
// 												<div className="ads-title">
// 													{ item.adCreativeLinkTitle }
// 												</div>
// 												<div>
// 													<a 
// 														href={ item.adSnapshotUrl }
// 														target="_blank"
// 													> 
// 														Snapshot URL
// 													</a>
// 												</div>
// 											</td>
// 											<td>
// 												<div className="foreground">Created time</div>
// 												<div className="background created-time">
// 													{ moment(item.adCreationTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
// 												</div>
// 											</td>
// 											<td>
// 												<div className="foreground">Start time</div>
// 												<div className="background start-time">
// 													{ moment(item.adDeliveryStartTime, "YYYY-MM-DDTHH:mm:ss a").format("DD/MM/YYYY") }
// 												</div>
// 											</td>
// 											<td>
// 												<a 
// 													className="button view-details"
// 													href={`/ads/${item.id}`}
// 												>
// 													View Ads
// 												</a>
// 											</td>
// 										</tr>
// 									)
// 								})
// 							}
// 						</tbody>
// 					</table>
// 				</div>
				
// 				<TableList 
//  					data={ this.serializeData() }
//  					totalElement={ this.state.batchJobExecutedCount }
//  					numElementPage={ 10 }
// 					changePageHandler={ this.changePagination }
// 				/>
// 			</div>
// 		);
// 	}
// }

export default AdsListTableComponent;