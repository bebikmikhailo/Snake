const parseJWT = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

export const getUsernameFromJWT = () => {
    const token = localStorage.getItem("token");
    const parsedJWT = parseJWT(token);
    return parsedJWT.userName;
}

export const checkAuth = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    if (isTokenExpired(token))  {
        localStorage.removeItem("token");
        return false;
    }

    return true;
}

export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const { exp } = JSON.parse(jsonPayload);

        const currentTime = Math.floor(Date.now() / 1000);

        return exp < currentTime;
    } catch (error) {
        console.error("Error during token check:", error);
        return true;
    }
}