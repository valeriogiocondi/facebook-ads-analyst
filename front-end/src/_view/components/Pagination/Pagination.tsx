import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';

// STYLE
import './Pagination.less';


type PaginationProps = {
	numElementPage:     number,
	totalElement:       number,
	changePageHandler:  Function,
};
const PAGE_DEFAULT: number = 1;

const PaginationComponent: FunctionComponent<PaginationProps> = (props: PaginationProps) => {
	
    const [currentPage, setCurrentPage] = useState<number>(PAGE_DEFAULT);
	
    const getPaginationList = (): number[] => {

        if (props.totalElement < props.numElementPage) 
            return [1];
        
        const listLength: number = (props.totalElement / props.numElementPage) + ((props.totalElement % props.numElementPage !== 0) ? 1 : 0);
        
        return Array.from({ length: (listLength) }, (_, idx) => ++idx)
    }

    const clickHandler = (page: number): void => {

        if (page !== currentPage) {

            props.changePageHandler(page, props.numElementPage);
            setCurrentPage(page);
        }
    };

	return (
        <div className="custom-pagination text-right">
            <ul className="list-inline"> { 
                getPaginationList().map((item) => { 
                    
                    return (
                        <li 
                            key={ item }
                            className={ (item === currentPage) ? "list-inline-item current-page" : "list-inline-item" }
                            onClick = {() => clickHandler(item) }
                        >
                            { item } 
                        </li>
                    );
                }) 
            } 
            </ul> 
        </div>
	);
};

export default PaginationComponent;