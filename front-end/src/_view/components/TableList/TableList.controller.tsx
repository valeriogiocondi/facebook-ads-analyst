import React, { FunctionComponent } from 'react';

// MODEL
import TableListType from '../../../_model/types/TableList.type';

// UTILS
import utilities from  '../../../utils/utilities';

// STYLE
import './TableList.less';

// COMPONENTS
import Pagination from  '../Pagination/Pagination';


const getEmptyTableMessage = () => {

	return (
		<>
			EMPTY TABLE
		</>
	);
}

const getContent = (props: TableListType) => {

	return (
		<>
			<div className="custom-table">
				<section>
					<table>
						<thead>
							<tr key="custom-table-header">
								{ props.data["header"].map((item, i) => <th key={"td-col-" + (i+1)}>{ item }</th>) }
							</tr>
						</thead>
						<tbody>
							{
								props.data["content"]
									.slice(0, props.numElementPage)
									.map((item, i) => <tr key={"item-" + (i+1)}>{ Object.values(item).map((value, i) => <td key={"td-col-" + (i+1)}>{ value }</td>) }</tr>)
							}
						</tbody>
					</table>
				</section>
				<footer>
					<Pagination 
						numElementPage={ props.numElementPage }
						totalElement={ props.totalElement }
						changePageHandler={ props.changePageHandler }
					/>
				</footer>
			</div>
		</>
	);
}

const getTable = (x: TableListType) => (!x || utilities.isVoid(x.data.content)) ? getEmptyTableMessage() : getContent(x);

export default {
	getTable: getTable,
};
