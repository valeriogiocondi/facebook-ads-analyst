import React, { FunctionComponent, useEffect, useState } from 'react';

// REACT-ROUTER
import { Redirect } from 'react-router-dom';

// MODEL
import PageSocialType from '../../../_model/types/PageSocialType';

// CONTROLLER
import controller from './PageSocialList.controller';

// REDUX
import reduxStore from '../../../_model/redux/redux-store';

// UTILS
import { utilities } from '../../../utils';

// COMPONENTS
import TableList from  '../../components/TableList/TableList';

// STYLE
import './PageSocialList.less';



const NUM_ELEMENT_PAGE = 10;
const DEFAULT_PAGE_COUNT = 0;

const PageSocialList: FunctionComponent = () => {

	const [redirect, setRedirect] = useState<string>('');
	const [pageSocialList, setPageSocialList] = useState<PageSocialType[]>();
	const [pageSocialCount, setPageSocialCount] = useState<number>(DEFAULT_PAGE_COUNT);
	
	const Template = utilities.getTemplate;

	useEffect(() => {
		
		// login check
		!utilities.isAuth(true) ?? setRedirect('login');

		// TODO - redux automation
		reduxStore.subscribe((x) => {
			setPageSocialList(x?.pageListReducer?.data?.getPageSocialList?.pageSocialList);
			setPageSocialCount(x?.pageListReducer?.data?.getPageSocialList?.pageSocialCount);
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
		<Template type="page-list" title="Page List">
			{ renderRedirect() }
			<section id="page-social-list">
				<TableList 
					data={ controller.serializeData(pageSocialList) }
					totalElement={ pageSocialCount }
					numElementPage={ NUM_ELEMENT_PAGE }
					changePageHandler={ changePageHandler }
				/>
			</section>
		</Template>
	);
};

export default PageSocialList;
