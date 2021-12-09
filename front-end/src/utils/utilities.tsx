// import { ReactElement } from "react";
import React, { FunctionComponent, ReactElement, useState } from 'react';

import LoginService from "../services/login.service";

// Template
import TemplatePageList from '../_view/templates/template-page-list';
import TemplatePageDetails from '../_view/templates/template-page-details';
import TemplatePageNoteFound from '../_view/templates/template-page-not-found';


const isVoid = (x: any): boolean => (!x || x.length === 0 || Object.keys(x).length === 0) ? true : false;

const isAuth = (isPrivate: boolean): boolean => isPrivate ? LoginService.isAuth() : true;

type templateProps = {
    type: string,
    title: string,
    children?: React.ReactNode | React.ReactNode[]
  };
const getTemplate = (props: templateProps) => {
	
    switch (props.type) {

      case "page-list": {
          return TemplatePageList(props);
      }
      case "page-detail": {
          return TemplatePageDetails(props);
      }
    }

    return TemplatePageNoteFound(props);
}

export default {
    isVoid: isVoid,
    isAuth: isAuth,
    getTemplate: getTemplate,
};