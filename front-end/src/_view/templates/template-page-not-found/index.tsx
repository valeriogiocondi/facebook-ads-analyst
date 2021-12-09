import React, { FunctionComponent, useState } from 'react';

import Menu from '../../components/Menu/Menu';

// REDUX - STORE
import reduxStore from '../../../_model/redux/redux-store';

// STYLE
import './template-page-not-found.less';
import { 
  History as HistoryIcon, 
  Home as HomeIcon, 
  KeyboardBackspace as KeyboardBackspaceIcon,
  Schedule as ScheduleIcon, 
  Undo as UndoIcon 
} 
from '@material-ui/icons';


type Props = {
  title: string,
  children?: React.ReactNode | React.ReactNode[]
};

const Template: FunctionComponent<Props> = (props: Props) => {

  const [themeClass, setThemeClass] = useState<any>(reduxStore.getState().themeReducer.value);
  
  reduxStore.subscribe((newState: any) => {
    setThemeClass(newState.themeReducer.value);
  });

  return (
    <div id="main-article" className={ themeClass }>
      <div id="template-page-not-found">
        <header>
          <Menu />
        </header>
        <article>
          <div className="container">
            404 - PAGE NOT FOUND
          </div>
        </article>
      </div>
    </div>
  );
};

export default Template;
