import React, { FunctionComponent } from 'react';

// MODEL
import DialogTypeEnum from './DialogType.enum';

// SERVICES
import MessageQueue from '../../../services/messageQueue.service'

// COMPONENTS
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// STYLE
import './Dialog.less';


type DialogProps = {
	title:    	string
	message:  	string
	type: 	  	keyof typeof DialogTypeEnum
}

let agreeCallback: Function;
const DialogComponent: FunctionComponent<DialogProps> = (props: DialogProps) => {
	
  const [visible, setVisible] = React.useState<boolean>(false);
	
	MessageQueue.subscribe('DIALOG_CALLBACK', (msg: string, data: Function) => {
		
		agreeCallback = data;
		setVisible(true);
	});

	const handleClose = () => setVisible(false);
	const handleDisagree = () => handleClose();
	const handleAgree = () => { handleClose(); agreeCallback(); };
	
	return (
		<>
			<Dialog
				open={visible}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{ props.title }</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">{ props.message }</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={ handleDisagree }> Annulla </Button>
					<Button onClick={ handleAgree } autoFocus> Conferma </Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DialogComponent;