import jwt_decode from 'jwt-decode';

const authenticateUser = (authCookie, path) => {
    console.info('checking for auth cookies');

    let userInfo = {
        authenticated: false
    };

    const tokenInfo = getTokenFromCookie(authCookie) || getTokenFromPath(path);

    if (tokenInfo.email) {
        userInfo.authenticated = true;
        userInfo.email = tokenInfo.email;
    }

    return userInfo;
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
        const token = path.replace('/#', '');

        tokenInfo = jwt_decode(token);

        document.cookie = `microp-auth=${token};SameSite=Strict`;
    }

    return tokenInfo;
};

export {
    authenticateUser
}