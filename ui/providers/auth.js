import jwt_decode from 'jwt-decode';

const authenticateUser = (authCookie, path) => {
    try {
        console.info('checking for auth cookies');

        let userInfo = {
            authenticated: false
        };

        console.info(`authCookie: ${authCookie}`);
        console.info(`path: ${path}`);

        const tokenInfo = getTokenFromCookie(authCookie) || getTokenFromPath(path);

        if (tokenInfo.email) {
            userInfo.authenticated = true;
            userInfo.email = tokenInfo.email;
        }

        return userInfo;
    } catch (e) {
        console.error(e);
    }
}

const getTokenFromCookie = (authCookie) => {
    let tokenInfo = null;

    if (authCookie) {
        tokenInfo = jwt_decode(authCookie);
    }

    return tokenInfo;
}

const getTokenFromPath = (path) => {
    let tokenInfo = {};

    if (path && path != '/') {
        let token = path.replace('/#id_token=', '')
                        .replace('/?token=', '');

        console.info(`\n\nmodifed token: ${token}`);
        if (token !== '/') {
            tokenInfo = jwt_decode(token);

            document.cookie = `microp-auth=${token};SameSite=Strict`;

            const location = window.location;
            const uri = `${location.origin}/?token=${token}`;
            console.info(uri);

            document.location = uri;
        }
    }

    return tokenInfo;
};

export {
    authenticateUser
}