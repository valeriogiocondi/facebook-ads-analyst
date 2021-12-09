import React, { FunctionComponent, useState } from 'react';

import Menu from '../../components/Menu/Menu';

// REDUX - STORE
import reduxStore from '../../../_model/redux/redux-store';

// STYLE
import './template-page-details.less';
import { KeyboardBackspace as KeyboardBackspaceIcon } from '@material-ui/icons';


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
      <div id="template-page-details">
        <header>
          <Menu />
        </header>
        <article>
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
        </article>
      </div>
    </div>
  );
};

export default Template;
