const jwtManager = () => {
    let _token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    let isRefreshing = null;
    let refreshEndpoint = process.env.REACT_APP_API_ENTRYPOINT + '/refresh_token';
    let refreshTimeOutId;

    const setRefreshTokenEndpoint = endpoint => refreshEndpoint = endpoint;

    const getExpirationDate = (jwtToken) => {
        if (!jwtToken) {
            return null;
        }

        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
        // multiply by 1000 to convert seconds into milliseconds
        return (jwt && jwt.exp) ? jwt.exp * 1000 : null;
    };

    // This countdown feature is used to renew the JWT before it's no longer valid
    // in a way that is transparent to the user.
    const refreshToken = () => {
        const delay = getExpirationDate(_token.token) - Date.now()
        const maxDelay = Math.pow(2,31)-1;

        refreshTimeOutId = window.setTimeout(
            getRefreshedToken,
            delay > maxDelay ? maxDelay : delay
        ); // Validity period of the token in seconds, minus 5 seconds
    };

    const abordRefreshToken = () => {
        if (refreshTimeOutId) {
            window.clearTimeout(refreshTimeOutId);
        }
    };

    const waitForTokenRefresh = async () => {
        if (!isRefreshing) {
            return Promise.resolve();
        }
        return isRefreshing.then(() => {
            isRefreshing = null;
            return true
        });
    }

    // The method make a call to the refresh-token endpoint
    // If there is a valid cookie, the endpoint will set a fresh jwt in memory.
    const getRefreshedToken = async () => {
        if (!_token) return null
        const request = new Request(refreshEndpoint, {
            method: 'POST',
            body: JSON.stringify({refreshToken: _token.refreshToken}),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        isRefreshing = fetch(request)
            .then((response) => {
                if (response.status !== 200) {
                    ereaseToken();
                    global.console.log(
                        'Token renewal failure'
                    );
                    return { token: null };
                }
                return response.json();
            })
            .then((token) => {
                if (token && token.token) {
                    setToken(token);
                    return true;
                }
                ereaseToken();
                return false;
            });

        return isRefreshing;
    };

    const getToken = () => {
        return _token && _token.token
    };

    const setToken = (token) => {
        localStorage.setItem('auth', JSON.stringify(token));
        _token = token;
        window.location.reload();
        refreshToken();
        return true;
    };

    const ereaseToken = () => {
        window.localStorage.removeItem('auth')
        _token = null;
        abordRefreshToken();
        return true;
    }

    if (_token && getExpirationDate(_token.token) - Date.now() > 0) {
        refreshToken()
    }

    return {
        ereaseToken,
        getRefreshedToken,
        getToken,
        setRefreshTokenEndpoint,
        setToken,
        waitForTokenRefresh,
    }
};

export default jwtManager();