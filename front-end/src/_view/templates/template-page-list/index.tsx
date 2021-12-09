import React, { FunctionComponent, ReactElement, useState } from 'react';

import Menu from '../../components/Menu/Menu';

// REDUX - STORE
import reduxStore from '../../../_model/redux/redux-store';

// STYLE
import './template-page-list.less';
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

const Template: FunctionComponent<Props> = (props: Props): ReactElement => {

  const [themeClass, setThemeClass] = useState<any>(reduxStore.getState().themeReducer.value);
  
  reduxStore.subscribe((newState: any) => {
    setThemeClass(newState.themeReducer.value);
  });

  return (
    <div id="main-article" className={ themeClass }>
      <div id="template-page-list">
        <header>
          <Menu />
        </header>
        <article>
          <div className="container">
            <header>
              <a href="/">
                <KeyboardBackspaceIcon />
              </a>
              <h1 className="page-title">{ props.title }</h1>
            </header>
            <section className="template-container">
              { props.children }
            </section>
            <footer></footer>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Template;
