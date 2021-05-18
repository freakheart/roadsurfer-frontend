import React from "react";
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../logo.svg';

const ConfigurationMenu = React.forwardRef(({ onClick }, ref) => (
    <MenuItemLink
        ref={ref}
        to="/configuration"
        primaryText="Configuration"
        leftIcon={<SettingsIcon />}
        onClick={onClick}
    />
));

const styles = {
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    logoWrap: {
        position: 'relative',
        // top: '5px'
    },
    logo: {
        width: "120px"
    },
    logoSubtext: {
        fontSize: '10px',
        fontWeight: 'bold',
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: '-8px'
    }
};

const CustomUserMenu = props => (
    <UserMenu {...props}>
        <ConfigurationMenu />
    </UserMenu>
);

const CustomAppBar = withStyles(styles)(({ classes, ...props }) => (
    <AppBar {...props} userMenu={<CustomUserMenu />} >
        <div className={classes.logoWrap}>
            <span className={classes.logoSubtext}>Dashboard</span>
        </div>

        <span className={classes.spacer} />
    </AppBar>
));

export default CustomAppBar;