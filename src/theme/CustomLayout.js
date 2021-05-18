import React from "react";
import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';
import CustomNotification from './CustomNotification';

export const CustomLayout = props => <Layout {...props}
    notification={CustomNotification}
    appBar={CustomAppBar}
/>;