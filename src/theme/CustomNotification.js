import React from "react";
import { Notification } from 'react-admin';

const CustomNotification = props => <Notification {...props} autoHideDuration={5000} />;

export default CustomNotification;