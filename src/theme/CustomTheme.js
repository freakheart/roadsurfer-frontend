import { createMuiTheme } from '@material-ui/core/styles';

export const CustomTheme = createMuiTheme({
    sidebar: {
        width: 250, // The default value is 240
        closedWidth: 50, // The default value is 55
    },
    palette: {
        //type: 'dark',
        primary: {
            main: '#005ea8',
        },
        secondary: {
            main: '#084085',
        },
        error: {
            main: '#f44336'
        },
        warning: {
            main: '#ff9800'
        },
        info: {
            main: '#2196f3'
        },
        success: {
            main: '#4caf50'
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        fontSize: 14,
        useNextVariants: true,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});