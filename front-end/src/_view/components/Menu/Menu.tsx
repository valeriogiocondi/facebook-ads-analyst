import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// REDUX - STORE
import reduxStore from '../../../_model/redux/redux-store';

// REDUX - ACTION_CREATORS
import reduxAction from '../../../_model/redux/actions';

// CONFIG
import { configTheme } from '../../../config';

// STYLE
import './Menu.less';


const MenuComponent: FunctionComponent = () => {
	
	const getTheme = (): string => { 
		
		const theme = localStorage.getItem('theme') ?? configTheme.DEFAULT_THEME;

		reduxStore.dispatch( reduxAction.storeTheme(theme) );
		localStorage.setItem('theme', theme);
		return theme;
	};

	const toggleTheme = () => { 

		const currentValue = reduxStore.getState().themeReducer.value;
		const nextValue = (currentValue === "dark") ? "light" : "dark";
		
		setThemeClass(nextValue);
		reduxStore.dispatch( reduxAction.storeTheme(nextValue) );
		localStorage.setItem('theme', nextValue);
	};

	const [themeClass, setThemeClass] = useState<string>(getTheme());

	return (
		<div className={ themeClass }>
			<div id="menu">
				<div className="container text-right">
					<ul className="list">
						<li key={1}>
							<Link to="/">Home</Link>
						</li>
						<li key={2}>
							<Link to="/batch-job-list">Batch</Link>
						</li>
						<li key={3}>
							<Link to="/batch-job-executed-list">Jobs Executed</Link>
						</li>
						<li key={4}>
							<Link to="/logout">Logout</Link>
						</li>
						<li key={5}>
							<ToggleButtonComponent toggleTheme={ toggleTheme } />
						</li>
					</ul>
					<div className="clearfix"></div>
				</div>
			</div>
			<div className="clearfix"></div>
		</div>
	);
};

type ToggleButtonProps = { 
	toggleTheme: Function
};
const ToggleButtonComponent: FunctionComponent<ToggleButtonProps> = (props: ToggleButtonProps) => {
	
	return (
		<button 
			id="toggle-button"
			className="right" 
			onClick={ () => props.toggleTheme() } 
		>
			<ul className="transition-03">
				<li> <div> Light </div> </li>
				<li> <div> Dark </div> </li>
			</ul>
		</button>
	);
};

export default MenuComponent;