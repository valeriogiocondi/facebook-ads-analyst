import React, { FunctionComponent } from 'react';

// SERVICES
import MessageQueue from '../../../services/messageQueue.service'

// STYLE
import './Loader.less';


type LoaderProps = {
}

const Loader: FunctionComponent<LoaderProps> = (props: LoaderProps) => {
	
  const [visible, setVisible] = React.useState<boolean>(false);
	
	MessageQueue.subscribe('OPEN_LOADER', (msg: string, data: Function) => setVisible(true) );
	MessageQueue.subscribe('CLOSE_LOADER', (msg: string, data: Function) => setVisible(false) );

	return (
		<>
			<div id="loader" className={`${ visible ? 'visible' : '' }`}>
				<div>
					<span className="label">LOADING...</span>
				</div>
			</div>
		</>
	);
};

export default Loader;